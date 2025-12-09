const Item = require("../models/item");
const Category = require("../models/category");

async function index(req, res) {
  const items = await Item.getAllItems();
  res.render("items/index", { items: items });
}

async function newForm(req, res) {
  const categories = await Category.getAllCategories();
  res.render("items/new", { categories });
}

async function create(req, res) {
  const { name, description, price, quantity, category_id } = req.body;
  await Item.createItem(name, description, price, quantity, category_id);
  res.redirect("/items");
}

async function show(req, res) {
  const item = await Item.getItemById(req.params.id);
  res.render("items/show", { item });
}

async function editForm(req, res) {
  const item = await Item.getItemById(req.params.id);
  const categories = await Category.getAllCategories();
  res.render("items/edit", { item, categories });
}

async function update(req, res) {
  const { name, description, price, quantity, category_id } = req.body;
  await Item.updateItem(
    req.params.id,
    name,
    description,
    price,
    quantity,
    category_id
  );
  res.redirect(`/items/${req.params.id}`);
}

module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
};
