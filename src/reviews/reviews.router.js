const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");
router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:reviewId([0-9]+)")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;