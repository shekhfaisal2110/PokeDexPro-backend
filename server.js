const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const matchRoutes = require("./routes/matchRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});