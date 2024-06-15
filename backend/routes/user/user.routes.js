const { Router } = require("express");
const { updateUser, profile, uploadDP } = require("../../controller/user");
const router = Router();
const { auth } = require("../../middleware/auth");

router.post("/:userId/picture", uploadDP);
router.patch("/update", auth, updateUser);
router.get("/profile/:userId", auth, profile);

module.exports = router;
