const express = require("express");
const db = require("./config/db");

const app = express();

app.use(express.json({ extended: false }));
db();

//routes set-up
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/employee", require("./routes/employee"));
app.use("/api/product", require("./routes/product"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
