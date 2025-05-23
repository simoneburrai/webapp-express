const connection = require("../data/db");
const path = process.env.IMAGE_LOCAL_PATH;
const imagePath = require("../utils/imagePath");
const mySql = require("../utils/mySql")


const index = (req, res) => {
    const search = req.query.search;
   
    let sql = mySql.selectMovies
    if (search) {
        sql += ` WHERE movies.title LIKE ?
        OR movies.abstract LIKE ?
        OR movies.genre LIKE ?`
    }
    sql += ` GROUP BY movies.id`
    console.log(sql)
    connection.query(sql, [`%${search}%`, `%${search}%`, `%${search}%`], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(imagePath.arrFun(result, path));
    })

}


function show(req, res) {
    const { id } = req.params;

    const movieSql = mySql.selectSingleMovie;

    const reviewSql = mySql.selectReviews;
    console.log(movieSql, reviewSql);
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


function store(req, res) {

    const { title, director, genre, release_year, abstract, image } = req.body;
    const sql = mySql.insertMovie;
    connection.query(sql,
        [ title, director, genre, release_year, abstract, image ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            } else {
                res.json({
                    message: `aggiunto film `
                });
            }
        }
    );
    
}



function reviewStore(req, res) {
    const { id } = req.params;
    const { name, vote, text } = req.body;
    
    const sql = mySql.insertReviews;
    connection.query(sql,
        [name, vote, text, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            } else {
                res.json({
                    message: `aggiunta recensione al film ${id}`
                });
            }
        }
    );

}

module.exports = {
    index,
    show,
    store,
    reviewStore
}