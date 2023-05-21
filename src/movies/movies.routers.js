const router = require('express').Router();

const moviesServices = require('./movies.services')

router.get('/', moviesServices.getAllMovies);
router.post('/', moviesServices.postMovie);

router.get('/:id', moviesServices.getMovieById);
router.delete('/:id', moviesServices.deleteMovie);
router.patch('/:id', moviesServices.patchMovie);
router.put('/:id', moviesServices.putMovie); 

module.exports = router;