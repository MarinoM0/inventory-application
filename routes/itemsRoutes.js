const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/itemsController");

router.get("/", ctrl.index);
router.get("/new", ctrl.newForm);
router.post("/", ctrl.create);
router.get("/:id", ctrl.show);

module.exports = router;
