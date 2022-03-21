const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  addUser,
  getUserById,
  editUserById,
  getUserPets,
  getAllUsers,
  getUserSavedPets,
} = require("../data/users");
const { validateBody } = require("../middleware/validateBody");
const { doesUserExistSignup } = require("../middleware/doesUserExistSignup");
const { doPasswordsMatch } = require("../middleware/doPasswordsMatch");
const { encryptPassword } = require("../middleware/encryptPassword");
const { doesUserExistLogin } = require("../middleware/doesUserExistLogin");

const Schemas = require("../schemas/allSchemas");

router.get("/:id", async (req, res) => {
  try {
    const currentUser = await getUserById(req.params.id);
    res.send(currentUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const AllUser = await getAllUsers(req.params.id);
    res.send(AllUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/mypets", async (req, res) => {
  try {
    const currentUserPets = await getUserPets(req.params.id);
    res.send(currentUserPets);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/savedpets", async (req, res) => {
  try {
    const userSavedPets = await getUserSavedPets(req.params.id);
    res.send(userSavedPets);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const currentUser = await editUserById(
      req.body.id,
      req.body.email,
      req.body.first,
      req.body.last,
      req.body.phone
    );
    res.send(currentUser);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/signup",
  validateBody(Schemas.signUpSchema),
  doesUserExistSignup,
  doPasswordsMatch,
  encryptPassword,
  async (req, res) => {
    try {
      const { email, hashPassword, first, last, phone } = req.body;

      const user = await addUser(email, hashPassword, first, last, phone);
      console.log(user);

      res.send("Signup Successful");
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/login",
  validateBody(Schemas.loginSchema),
  doesUserExistLogin,
  async (req, res) => {
    try {
      const { email, password, user } = req.body;

      bcrypt.compare(password, user.hashed_pass, (err, result) => {
        if (err) {
          res.status(400).send("Incorrect Password");
          return;
        }
        if (result) {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
          res.send({
            token,
            user: {
              name: user.first + " " + user.last,
              email: user.email,
              id: user.id,
            },
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
