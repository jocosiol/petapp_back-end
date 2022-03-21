const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function getAllPets() {
  try {
    const allPets = await query("SELECT * FROM pet");
    return allPets;
  } catch (err) {
    console.error(err);
  }
}

async function getAvailablePets() {
  try {
    const allPets = await query(
      'SELECT * FROM pet WHERE status NOT LIKE "Adopted";'
    );
    return allPets;
  } catch (err) {
    console.error(err);
  }
}

async function getUserPets(id) {
  try {
    const userPets = await query(`SELECT * FROM pet WHERE lastUserId=${id};`);
    return userPets;
  } catch (err) {
    console.error(err);
  }
}

async function createPet(name, type) {
  try {
    const sql = `INSERT INTO pet (name, type) VALUES ('${name}', '${type}')`;
    const insertedPet = await query(sql);
    return insertedPet;
  } catch (err) {
    console.log(err);
  }
}

async function addNewPet(
  name,
  type,
  pic,
  height,
  weight,
  color,
  bio,
  hypoallergenic,
  dietary_restriction,
  breed
) {
  try {
    const sql = `INSERT INTO pet (name, type, status, pic, height, weight, color, bio, hypoallergenic, dietary_restriction, breed) VALUES ('${name}', '${type}', 'Available','${pic}','${height}', '${weight}', '${color}', '${bio}', '${hypoallergenic}', '${dietary_restriction}', '${breed}')`;
    const AddedNewPet = await query(sql);
    return AddedNewPet;
  } catch (err) {
    console.log(err);
  }
}
async function editPet(
  id,
  name,
  type,
  pic,
  height,
  weight,
  color,
  bio,
  hypoallergenic,
  dietary_restriction,
  breed
) {
  try {
    const sql = `UPDATE pet SET name = '${name}', type = '${type}', pic='${pic}', height=${height}, weight=${weight}, color='${color}', bio='${bio}', hypoallergenic=${hypoallergenic}, dietary_restriction='${dietary_restriction}', breed='${breed}' WHERE id = ${id};`;
    const editPet = await query(sql);
    return editPet;
  } catch (err) {
    console.log(err);
  }
}

async function deletePet(id) {
  try {
    const sql = `DELETE FROM pet WHERE id = ${id};`;
    const deletePet = await query(sql);
    return deletePet;
  } catch (err) {
    console.log(err);
  }
}

async function advanceSearch(
  name,
  status,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight
) {
  try {
    const sql = `SELECT * FROM pet WHERE name LIKE '%${name}%' AND status LIKE '%${status}%' AND height BETWEEN ${minHeight} AND ${maxHeight} AND weight BETWEEN ${minWeight} AND ${maxWeight};`;

    const search = await query(sql);
    return search;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllPets,
  createPet,
  advanceSearch,
  getAvailablePets,
  addNewPet,
  editPet,
  deletePet,
  getUserPets,
};
