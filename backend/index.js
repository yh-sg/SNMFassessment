//get all dependencies
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT)

// add all middlewares
const app = express();
require("./config/db")
app.use(morgan('combined'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/frontend'))

app.use("/auth", require("./routes/auth.route"));
app.use("/main", require("./routes/main.route"));
app.use("/currencies", require("./routes/currencies.route"));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Error!" });
});



app.listen(PORT, () =>
  console.log(`App is running on ${PORT}`)
);
