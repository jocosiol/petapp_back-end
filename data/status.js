const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function adoptPet(user_id, pet_id) {
  try {
    const sql = `INSERT INTO user_has_pet (status_type, date, user_id, pet_id) VALUES ('Adopted', CURRENT_TIMESTAMP, '${user_id}', '${pet_id}')`;
    const sql2 = `UPDATE pet SET status = 'Adopted', lastUserId= ${user_id} WHERE id = ${pet_id}`;
    const adopt = await query(sql);
    const changePetStatus = await query(sql2);
    //console.log(adopt, changePetStatus);
    return adopt, changePetStatus;
  } catch (err) {
    console.error(err);
  }
}

async function fosterPet(user_id, pet_id) {
  try {
    const sql = `INSERT INTO user_has_pet (status_type, date, user_id, pet_id) VALUES ('Fostered', CURRENT_TIMESTAMP, '${user_id}', '${pet_id}')`;
    const sql2 = `UPDATE pet SET status = 'Fostered', lastUserId= ${user_id} WHERE id = ${pet_id}`;
    const foster = await query(sql);
    const changePetStatus = await query(sql2);
    //console.log(foster, changePetStatus);
    return foster, changePetStatus;
  } catch (err) {
    console.error(err);
  }
}

async function returnPet(user_id, pet_id) {
  try {
    const sql = `UPDATE user_has_pet SET end_date= CURRENT_TIMESTAMP WHERE user_id='${user_id}' AND  pet_id='${pet_id}'`;
    const sql2 = `UPDATE pet SET status = 'Available', lastUserId=NULL WHERE id = ${pet_id}`;
    const returnPet = await query(sql);
    const changePetStatus = await query(sql2);
    //console.log(returnPet, changePetStatus);
    return returnPet, changePetStatus;
  } catch (err) {
    console.error(err);
  }
}

async function savePet(user_id, pet_id) {
  try {
    const sql = `INSERT INTO saved SET user_id='${user_id}',  pet_id='${pet_id}'`;
    const savePet = await query(sql);
    return savePet;
  } catch (err) {
    console.error(err);
  }
}

async function unsavePet(user_id, pet_id) {
  try {
    const sql = `DELETE FROM saved WHERE user_id='${user_id}' AND  pet_id='${pet_id}'`;
    const unsavePet = await query(sql);
    return unsavePet;
  } catch (err) {
    console.error(err);
  }
}

async function getSavedByUser(user_id, pet_id) {
  try {
    const sql = `SELECT CASE WHEN EXISTS (SELECT * FROM saved WHERE user_id=${user_id} AND pet_id=${pet_id}) THEN 1 ELSE 0 END;`;
    const savedPets = await query(sql);
    return savedPets[0];
  } catch (err) {
    console.error(err);
  }
}

module.exports = { adoptPet, returnPet, fosterPet, savePet, unsavePet, getSavedByUser };
