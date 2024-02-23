const { Router } = require('express');
const { searchPost } = require('../../controller/user');
const router = Router();

/* GET users listing. */
router.get('/', searchPost);

const SearchRoutes = router;
module.exports = SearchRoutes;
