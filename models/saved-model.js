// models/saved-model.js
const pool = require("../database/")

async function addSaved(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO saved_vehicle (account_id, inv_id)
      VALUES ($1, $2)
      RETURNING *;
    `
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rows[0]
  } catch (error) {
    if (error.code === "23505") return null
    throw error
  }
}

async function removeSaved(account_id, inv_id) {
  try {
    const sql = `
      DELETE FROM saved_vehicle
      WHERE account_id = $1 AND inv_id = $2
      RETURNING *;
    `
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rows[0]
  } catch (error) {
    throw error
  }
}

async function getSavedByAccount(account_id) {
  try {
    const sql = `
      SELECT
        sv.saved_id,
        sv.created_at,
        i.inv_id,
        i.inv_make,
        i.inv_model,
        i.inv_year,
        i.inv_price,
        i.inv_thumbnail
      FROM saved_vehicle sv
      JOIN inventory i ON sv.inv_id = i.inv_id
      WHERE sv.account_id = $1
      ORDER BY sv.created_at DESC;
    `
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    throw error
  }
}

module.exports = { addSaved, removeSaved, getSavedByAccount }
