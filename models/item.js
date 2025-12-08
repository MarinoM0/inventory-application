const db = require("../db/db");

async function getAllItems() {
  const res = await db.query("SELECT * FROM ITEMS ORDER BY NAME");
  return res.rows;
}

async function getItemById(id) {
  const res = await db.query("SELECT * FROM ITEMS WHERE id=$1", [id]);
  return res.rows[0];
}

async function createItem(name, description, price, quantity, category_id) {
  const res = await db.query(
    "INSERT INTO Items (name,decription,price,quantity,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [name, description, price, quantity, category_id]
  );
  return res.rows[0];
}

async function updateItem(id, name, description, price, quantity, category_id) {
  const res = await db.query(
    "UPDATE items SET name=$1, description=$2, price=$3, quantity=$4, category_id=$5 WHERE id=$6 RETURNING *",
    [name, description, price, quantity, category_id, id]
  );
  return res.rows[0];
}

async function deleteItem(id) {
  await db.query("DELETE FROM items WHERE id=$1", [id]);
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
