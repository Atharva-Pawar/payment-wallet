const express = require("express");
const app = express();
const cors = require("cors");
const { router } = require("./routers");

app.use(cors());
app.use(express.json());

app.use("/api/v1", router)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
