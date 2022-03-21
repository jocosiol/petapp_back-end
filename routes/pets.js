const express = require("express");
const {
  createPet,
  advanceSearch,
  getAvailablePets,
  getAllPets,
  addNewPet,
  editPet,
  deletePet,
  getUserPets,
} = require("../data/pets");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");
const fs = require("fs");
const upload = require("../multer");
const cloudinary = require("../lib/cloudinaty");

router.get("/available", checkToken, async (req, res) => {
  const allAvailablePets = await getAvailablePets();
  res.send(allAvailablePets);
});

router.get("/all", async (req, res) => {
  //ADD checkToken
  const allPets = await getAllPets();
  res.send(allPets);
});

router.get("/user:id", async (req, res) => {
  //ADD checkToken
  const userPets = await getUserPets(req.params.id);
  res.send(userPets);
});

router.post("/", checkToken, async (req, res) => {
  const { name, type } = req.body;
  const addedPet = await createPet(name, type);
  res.send({ id: addedPet.insertId, name, type });
});

router.put("/edit/:id", async (req, res) => {
  try {
    const {
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
      breed,
    } = req.body;
    const addedPet = await editPet(
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
    );
    res.send("Pet edited");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const addedPet = await deletePet(req.params.id);
    res.send("Pet deleted");
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", async (req, res) => {
  const {
    name,
    type,
    pic,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietary_restriction,
    breed,
  } = req.body;
  const addPet = await addNewPet(
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
  );
  res.send(`New Pet added successfully.`);
});

router.post("/image", upload.single("pic"), async function (req, res) {
  try {

    const result = await cloudinary.uploads(req.file.path);
    fs.unlinkSync(req.file.path); 
    const fileUrl = result.secure_url;
    res.send({ fileUrl });
  } catch (err) {
    console.log(err);
  }
});

router.post("/search", checkToken, async (req, res) => {
  const { name, status, minHeight, maxHeight, minWeight, maxWeight } = req.body;
  const advanceSearchPet = await advanceSearch(
    name,
    status,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight
  );
  res.send({ advanceSearchPet });
});

module.exports = router;
