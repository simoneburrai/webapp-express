const express = require("express");
const app = express();
const port = process.env.PORT;
const movieRouter = require("./routers/movieRouter");

app.use(express.static("./public"));
app.use(express.json());
app.use("/movies", movieRouter);

app.listen(port, () => {
    console.log("Server attivo nella porta 3000")
})
