const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { LINK_REGEX } = require('../utils/const');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(LINK_REGEX),
      trailerLink: Joi.string().required().regex(LINK_REGEX),
      thumbnail: Joi.string().required().regex(LINK_REGEX),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  postMovie,
);

router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
