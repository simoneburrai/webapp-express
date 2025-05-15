const selectMovies = `SELECT 
    movies.*, AVG(reviews.vote) AS average_vote
    FROM
        movies
    LEFT JOIN reviews ON movies.id = movie_id`

const insertReviews = `INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)`

const selectReviews = `SELECT * FROM reviews WHERE movie_id = ?`

const insertMovie = ``;


module.exports = {
   selectMovies,
   insertReviews,
   selectReviews,
   insertMovie
}