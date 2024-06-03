require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require("./database/connect");
const playerRouter = require("./routes/player");
const imagesRouter = require("./routes/flipImages");
const scoreRouter = require("./routes/scores");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors())
app.use(express.json());

// routes
app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome</h1>')
})
app.use('/auth', playerRouter);
app.use('/images', imagesRouter);
app.use('/scores', scoreRouter);

// middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();