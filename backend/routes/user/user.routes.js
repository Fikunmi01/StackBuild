const { Router } = require("express");
const { updateUser, profile, uploadDP } = require("../../controller/user");
const router = Router();
const { auth } = require("../../middleware/auth");
const isAdmin = require("../../middleware/admin");
const { listUsers } = require("../../controller/admin");

router.post("/:userId/picture", uploadDP);
router.patch("/:userId/update", auth, updateUser);
router.get("/profile/:userId", auth, profile);
router.get('/list-users', isAdmin, listUsers);

module.exports = router;
