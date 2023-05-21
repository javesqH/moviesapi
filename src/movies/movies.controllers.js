const uuid = require('uuid');
const Movies = require('../models/movies.models');
const { UUIDV4 } = require('sequelize');

const getAllMovies = async () => {
    const data = await Movies.findAll()
    return data
}

/* getAllMovies()
    .then((response) => console.log(response))
    .catch((err) => console.log(err)) */

const createMovie = async (data) => {
    const newMovie = await Movies.create({
        id: uuid.v4(),
        name: data.name,
        gender: data.gender,
        duration: data.duration,
        releaseDate: data.releaseDate
    })
    return newMovie
}

/* createMovie({
    name: 'Habitacion del panico',
    gender: 'Suspenso',
    duration: 90,
    releaseDate: '2002/05/01'
})
    .then(response => console.log(response))
    .catch(err => console.log(err)) */


    const getMovieById = async (id) => {
        const data = await Movies.findOne({
            where: {
                id: id
            }
        });
        return data
    }

   /*  getMovieById('a1badfad-752c-4e18-a353-2695c509190a')
         .then((response) => console.log(response))
         .catch((err) => console.log(err)) */


const editMovie = async (id, data) => {
    const response = await Movies.update(data, {
        where: {
            id
        }
    })
    return response
}

 /* editMovie("0f63cd70-ed2c-4a9f-ad29-30da72b4d970", {
    name: "Mi pobre Angelito Perdido en New York",
})
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});  */

const deleteMovie = async (id) => {
    const data = await Movies.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    editMovie,
    deleteMovie
};