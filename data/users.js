const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function addUser(email, passwordHash, first, last, phone) {
  try {
    const sql = `INSERT INTO user (email, hashed_pass, first, last, phone) VALUES ('${email}', '${passwordHash}', '${first}', '${last}', '${phone}')`;
    const user = await query(sql);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmail(email) {
  try {
    const sql = `SELECT * FROM user WHERE email='${email}'`;
    const rows = await query(sql);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}


async function getUserPets(id) {
  try {
    const sql = `SELECT * FROM pet WHERE lastUserId=${id} AND status NOT LIKE 'Available'`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const sql = `SELECT * FROM user WHERE id='${id}'`;
    const rows = await query(sql);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}
async function getAllUsers() {
  try {
    const sql = 'SELECT * FROM user;';
    const allUsers = await query(sql);
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function editUserById(id, email, first, last, phone) {
  try {
    const sql = `UPDATE user SET first='${first}', last='${last}', phone='${phone}', email='${email}' WHERE id='${id}'`;
    const user = await query(sql);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserSavedPets(id, email, first, last, phone) {
  try {
    const sql = `SELECT pet.* FROM pet JOIN saved ON pet.id=saved.pet_id WHERE saved.user_id=${id};`;
    const userSavedPets = await query(sql);
    return userSavedPets;
  } catch (err) {
    console.log(err);
  }
}


module.exports = { addUser, getUserByEmail, getUserById, editUserById, getUserPets, getAllUsers, getUserSavedPets };
