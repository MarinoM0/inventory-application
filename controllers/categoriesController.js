const Category = require("../models/category");
const Item = require("../models/item");

async function index(req, res) {
  const categories = await Category.getAllCategories();
  res.render("categories/index", { title: "Categories", categories });
}

async function newForm(req, res) {
  res.render("categories/new", { title: "New Category" });
}

async function create(req, res) {
  const { name, description } = req.body;
  await Category.createCategory(name, description || null);
  res.redirect("/categories");
}

async function show(req, res) {
  const category = await Category.getCategoryById(req.params.id);
  if (!category) return res.status(404).send("Category not found");

  const items = await Item.getItemsByCategory(req.params.id);

  res.render("categories/show", { title: category.name, category, items });
}

async function editForm(req, res) {
  const category = await Category.getCategoryById(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.render("categories/edit", { title: "Edit Category", category });
}

async function update(req, res) {
  const { name, description } = req.body;
  await Category.updateCategory(req.params.id, name, description || null);
  res.redirect("/categories/" + req.params.id);
}

async function destroy(req, res) {
  await Category.deleteCategory(req.params.id);
  res.redirect("/categories");
}

module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy,
};
