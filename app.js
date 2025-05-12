const express = require("express");
const app = express();
const port = process.env.PORT;
const movieRouter = require("./routers/movieRouter");
const errorHandler = require("./middlewares/errorHandler");
const pageNotFound = require("./middlewares/pageNotFound");
const cors = require("cors");

//adding cors path localhost 5173
app.use(cors({
    origin: process.env.FE_APP
}
))
console.log(process.env);
// adding public folder on static 
app.use(express.static("./public"));

// JSON body parser 
app.use(express.json());

// ROUTERS used in 127.0.0.1:3000/movies 
app.use("/movies", movieRouter);

// 500 Handler 
app.use(errorHandler);

// 404 Handler 
app.use(pageNotFound);


// Listening server 
app.listen(port, () => {
    console.log("Server attivo nella porta 3000")
})
