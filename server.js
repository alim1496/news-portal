const express = require("express");
const categoryRoute = require("./routes/categoryRoute");
const articleRoute = require("./routes/articleRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/articles", articleRoute);

app.listen(5000, () => {
    console.log("Server created successfully");
});
