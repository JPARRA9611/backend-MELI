const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/products"));

app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
    error: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
