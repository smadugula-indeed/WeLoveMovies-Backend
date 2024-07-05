const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");
router.use(cors());

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.use("/:movieId([0-9]+)/reviews", controller.movieExists, reviewsRouter);
router.use(
  "/:movieId([0-9]+)/theaters",
  controller.movieExists,
  theatersRouter
);

router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);
router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);

module.exports = router;