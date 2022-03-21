const express = require("express");
const { postgrator } = require("./lib/db");
const fs = require("fs");
const cors = require("cors");
const petsRoute = require("./routes/pets");
const usersRoute = require("./routes/users");
const statusRoute = require("./routes/status");


const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

app.use("/pets", petsRoute);
app.use('/users', usersRoute);
app.use('/status', statusRoute);

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));
