const connection = require("../data/db");
const path = process.env.IMAGE_LOCAL_PATH;
const imagePath = require("../utils/imagePath");


const index = (req, res) => {
    const sql = `SELECT 
    movies.*, AVG(reviews.vote) AS average_vote
    FROM
        movies
    LEFT JOIN reviews ON movies.id = movie_id
    GROUP BY movies.id`
    connection.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(imagePath.arrFun(result, path));
    })
}

function show(req, res) {
    const { id } = req.params;

    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const movie = imagePath.objFun(movieResults[0], path);


        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }
            res.json({ movie, reviews: reviewResults });
        });
    });
}


module.exports = {
    index,
    show
}