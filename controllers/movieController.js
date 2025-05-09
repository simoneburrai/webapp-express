const connection = require("../data/db");

const index = (req, res) => {
    const sql = "SELECT * FROM movies"
    connection.query(sql, (error, result) => {
        res.json(result);
    })
}

const show = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM movies where id = ?"
    connection.query(sql, [id], (error, result) => {
        res.json(result);
    })
}


module.exports = {
    index,
    show
}