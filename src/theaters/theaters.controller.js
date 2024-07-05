const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;
  const data = await service.list();

  if (movieId) {
    res.json({
      data: data
        .filter((theater) =>
          theater.movies.find((movie) => movie.movie_id == movieId)
        )
        .map((theater) => {
          const newTheater = { ...theater, movie_id: movieId };
          delete newTheater["movies"];
          return newTheater;
        }),
    });
  } else {
    res.json({
      data: data,
    });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};