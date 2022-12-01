const express = require("express");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoute");
const articleRoute = require("./routes/articleRoute");
const videoRoute = require("./routes/videoRoute");
const userRoute = require("./routes/userRoute");
const commentRoute = require("./routes/commentRoute");
const reactionRoute = require("./routes/reactionRoute");
const historyRoute = require("./routes/historyRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/articles", articleRoute);
app.use("/api/v1/videos", videoRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/reactions", reactionRoute);
app.use("/api/v1/history", historyRoute);

app.listen(5000, () => {
    console.log("Server created successfully");
});
