import db from "../db.js";

export async function getCategories(req, res) {
  const { offset, limit } = req.query;
  try {
    const { rows: categories } = await db.query(
      `SELECT * FROM categories ${offset && `OFFSET ${parseInt(offset)}`} ${
        limit && `LIMIT ${parseInt(limit)}`
      }`
    );
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createCategory(req, res) {
  const { name } = req.body;

  try {
    await db.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
