const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => next(new NotFoundError(errorMessages.NOT_FOUND)))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie).then(() => res.send(movie));
      } else {
        next(new ForbiddenError(errorMessages.FORBIDDEN));
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError(errorMessages.NOT_FOUND));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, postMovie, deleteMovie };
