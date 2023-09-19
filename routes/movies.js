const router = require('express').Router();
const { postMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  postMovieValidation,
  postMovie,
);

router.delete(
  '/movies/:_id',
  deleteMovieValidation,
  deleteMovie,
);

module.exports = router;
