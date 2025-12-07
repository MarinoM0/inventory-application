const db = require("../db/db");

async function getAllCategories() {
  const res = await db.query("SELECT * FROM categories ORDER BY name");
  return res.rows;
}

async function getCategoryById(id) {
  const res = await db.query("SELECT * FROM categories WHERE id=$1", [id]);
  return res.rows[0];
}

async function createCategory(name, description) {
  const res = await db.query(
    "INSERT INTO categories (name,description) VALUES ($1,$2)",
    [name, description]
  );
  return res.rows[0];
}

async function updateCategory(id, name, description) {
  const res = await db.query(
    "UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *",
    [name, description, id]
  );
  return res.rows[0];
}

async function deleteCategory(id) {
  await db.query("DELETE FROM categories WHERE id=$1", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
