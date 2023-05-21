const { response } = require('express')
const moviesControllers = require('./movies.controllers')

const getAllMovies = (req, res) => {
    moviesControllers.getAllMovies()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const postMovie = (req, res) => {
    const data  = req.body;
    if(data.name && data.gender && data.duration && data.releaseDate) {
        moviesControllers.createMovie(data)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
     } else {
        res.status(400).json({message: 'Missing data'})
     }
};


const getMovieById = (req, res) => {
    const id = req.params.id;

    moviesControllers.getMovieById(id)
        .then(data => {
            if(data){
            res.status(200).json(data)
            }else {
              res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

const patchMovie = (req, res) => {
    const id = req.params.id
    const {name, gender, duration, releaseDate} = req.body;

    moviesControllers.editMovie(id, {name, gender, duration, releaseDate})
    .then((response) => {
        if(response[0]){
        res.status(200).json({
            message: `Movie with id: ${id}, edited succesfully!`
        })
        }else {
            res.status(400).json({message: 'Invalid ID'})
        }
        })
    .catch(error => {
        res.status(400).json({message: error.message})
    })
}

const deleteMovie = (req, res) => {
    const id = req.params.id
    moviesControllers.deleteMovie(id)
    .then((response) => {
        if(response){
        res.status(204).json()
       }else {
        res.status(400).json({message: 'Invalid ID'})
       }
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const putMovie = (req, res) => {
    const id = req.params.id;
    const { name, gender, duration, releaseDate} = req.body

    if(name && gender && duration && releaseDate){
        moviesControllers.editMovie(id, {name, gender, duration, releaseDate})
            .then((response) => {
                if(response[0]){
                    res.status(200).json({message: `Movie with ID: ${id}, edited succesfully!`})
                } else {
                    res.status(404).json({message: 'Invalid ID'})
                }
            })
            .catch(err => {
                res.status(400).json({message: err.message})
            })
    } else {
         res.status(400).json({message: 'Missing data', fields: {
            name: 'string',
            gender: 'string',
            duration: 'integer',
            releaseDate: 'YYYY/MM/DD'
         }})
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    postMovie,
    patchMovie,
    deleteMovie,
    putMovie
}