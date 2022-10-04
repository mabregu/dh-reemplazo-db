const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ]
        })
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO
        return res.render('moviesAdd')
    },
    create: function (req, res) {
        // TODO
        let movie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        }

        Movies.create(movie) // Promise
            .then(() => {
                return res.redirect('/movies')
            })
            .catch((err) => console.error(err))
        ;
    },
    edit: function(req, res) {
        // TODO
        let movieId = req.params.id;

        Movies.findByPk(movieId) // Promise
            .then(Movie => {
                return res.render('moviesEdit', {
                    Movie
                })
            })
            .catch(err => console.error(err))
        ;
    },
    update: function (req,res) {
        // TODO
        let movieId = req.params.id;

        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        }, {
            where: {
                id: movieId
            }
        })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(err => console.error(err))
        ;
    },
    delete: function (req, res) {
        // TODO
        let movieId = req.params.id;

        Movies.findByPk(movieId) // Promise
            .then(Movie => {
                return res.render('moviesDelete', {
                    Movie
                })
            })
            .catch(err => console.error(err))
        ;
    },
    destroy: function (req, res) {
        // TODO
        let movieId = req.params.id;

        Movies.destroy({
            where: { id: movieId },
        })
            .then(() => res.redirect('/movies'))
            .catch(err => console.error(err))
        ;
    }
}

module.exports = moviesController;