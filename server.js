require("dotenv").config();
const express = require("express");
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const categoriesRoutes = require("./routes/categoriesRoutes");
//const itemsRoutes = require("./routes/itemsRoutes");

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.send("app running");
});

app.use("/categories", categoriesRoutes);
//app.use("/items", itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log / `Server listening on http://localhost:${PORT}`;
});
