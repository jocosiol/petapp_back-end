const express = require("express");
const {
  adoptPet,
  returnPet,
  fosterPet,
  savePet,
  unsavePet,
  getSavedByUser,
} = require("../data/status");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");
const { userOwnPet } = require("../middleware/userOwnPet");

router.get("/", checkToken, async (req, res) => {
  // const allPets = await getPets();
  // res.send(allPets);
});

router.post("/adopt/:id", async (req, res) => {
  const { userId, petId } = req.body;
  const adoptingPet = await adoptPet(userId, petId);
  res.send(`The ${userId} adopted ${petId} successfully.`);
});

router.post("/foster/:id", async (req, res) => {
  const { userId, petId } = req.body;
  const fosteringPet = await fosterPet(userId, petId);
  res.send(`The ${userId} adopted ${petId} successfully.`);
});

router.post("/save/:id", async (req, res) => {
  const { userId, petId } = req.body;
  const savingPet = await savePet(userId, petId);
  res.send(`The pet ${petId} was saved.`);
});
router.post("/unsave/:id", async (req, res) => {
  const { userId, petId } = req.body;
  const savingPet = await unsavePet(userId, petId);
  res.send(`The pet ${petId} was saved.`);
});

router.get("/checksaved/:id", async (req, res) => {
  const { userId, petId } = req.body;
  const savingPet = await getSavedByUser(userId, petId);
  res.send(savingPet);
});

router.put("/return/:id", userOwnPet, async (req, res) => {
  const { userId, petId, ownerId } = req.body;
  const returningPet = await returnPet(userId, petId);
  res.send(`The ${userId} returned ${petId} successfully.`);
});

module.exports = router;
