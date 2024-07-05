const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const data = await service.read(req.params.movieId);
  if (data) {
    res.locals.movie = data;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  const data = await service.list(isShowing);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};