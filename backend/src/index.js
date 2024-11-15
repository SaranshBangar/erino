const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const { connection } = require("./database");

const cors = require("cors");
app.use(cors());

app.post("/contacts", (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !company ||
      !jobTitle
    ) {
      return res.status(400).send("Please provide all the required fields");
    }

    const query = `INSERT INTO users VALUES (NULL , '${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${company}', '${jobTitle}')`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error(`Error inserting contact : ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(results);
    });
  } catch (err) {
    console.error(`Error inserting contact : ${err}`);
    res.status(500).send("Internal server error");
  }
});

app.get("/contacts", (req, res) => {
  try {
    connection.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error(`Error fetching contacts : ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(results);
    });
  } catch (err) {
    console.error(`Error fetching contacts : ${err}`);
    res.status(500).send("Internal server error");
  }
});

app.delete("/contacts/:id", (req, res) => {
  try {
    const id = req.params.id;
    connection.query(`DELETE FROM users WHERE id = ${id}`, (err, results) => {
      if (err) {
        console.error(`Error deleting contact : ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Contact deleted successfully");
    });
  } catch (err) {
    console.error(`Error deleting contact : ${err}`);
    res.status(500).send("Internal server error");
  }
});

app.put("/contacts/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !company ||
      !jobTitle
    ) {
      return res.status(400).send("Please provide all the required fields");
    }
    const query = `UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', phoneNumber = '${phoneNumber}', company = '${company}', jobTitle = '${jobTitle}' WHERE id = ${id}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error(`Error updating contact : ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Contact updated successfully");
    });
  } catch (err) {
    console.error(`Error updating contact : ${err}`);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});
