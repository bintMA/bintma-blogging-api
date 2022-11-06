require("dotenv").config();
const connectToMongoDB = require("./blogdb");
const app = require("./app");
const PORT = process.env.PORT || 4000
// const localHost = "127.0.0.1"
connectToMongoDB();

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
