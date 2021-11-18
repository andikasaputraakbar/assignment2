const express = require('express');
const router = require('./routers/routes')
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require('./configs/connectionDb')
const app = express();
const port = 8080;

connectDB();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test/:idPlayer", (req, res) => {
  const {idPlayer } = req.params;
  res.json({pesan : "Welcome to my App", idPlayer});
});

app.use('/api', router);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
})