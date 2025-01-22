if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
const connectDatabase = require("./db/DataBase");

const app = express();
const port = process.env.PORT || 5000;

connectDatabase();





const corsOptions = {
    origin: "http://localhost:3000",
Credential: true,
methods: [ "GET", "POST","PUT","DELETE"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/api', emailRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
