const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leads",
});

// Connect to the database
db.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error);
    return;
  }
  console.log("Connected to the database successfully");
});

// Helper function to handle database queries with async/await
const queryDb = (query) =>
  new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

// Fetch all contacts from the database
app.get("/contacts", async (req, res) => {
  try {
    const query = "SELECT * FROM contacts";
    const results = await queryDb(query);
    res.send(results);
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    res.status(500).send("Internal server error");
  }
});

// Fetch all groups from the database
app.get("/groups", async (req, res) => {
  try {
    const query = "SELECT * FROM groups";
    const results = await queryDb(query);
    res.send(results);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).send("Internal server error");
  }
});

// Get an individual contact from the database
app.get("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const query = `SELECT * FROM contacts WHERE id=${id}`;
    const query = `SELECT * FROM contacts WHERE id='${id}'`;
    const results = await queryDb(query);

    if (results.length === 0) {
      res.status(404).send("Contact not found");
    } else {
      res.send(results[0]);
    }
  } catch (error) {
    console.error("Error fetching contact: ", error);
    res.status(500).send("Internal server error");
  }
});

// Adding Client
async function getNextClientId() {
  const query = "SELECT MAX(id) as maxId FROM contacts";
  const result = await queryDb(query);
  const maxId = result[0].maxId;

  if (!maxId) {
    return "T-1001";
  }

  const currentNum = parseInt(maxId.slice(2), 10);
  const nextNum = currentNum + 1;

  return `T-${nextNum}`;
}

app.post("/contacts", async (req, res) => {
  try {
    const { name, company, email, title, mobile, photo, group_id } = req.body;
    const id = await getNextClientId();
    const query = `INSERT INTO contacts (id, name, company, email, title, mobile, photo, group_id) VALUES ('${id}', '${name}', '${company}', '${email}', '${title}', '${mobile}','${photo}', '${group_id}')`;
    const result = await queryDb(query);
    const newContact = { id, name, company, email, title, mobile, photo, group_id };
    res.send(newContact);
  } catch (error) {
    console.error("Error creating contact: ", error);
    res.status(500).send("Internal server error");
  }
});


// Update Contact
app.put("/contacts/:contactId", (req, res) => {
  const { contactId } = req.params;
  const { name, email, mobile, company, title, photo, group_id } = req.body;

  if (!name || !email || !mobile) {
    res.status(400).send("Name, email, and mobile are required fields");
    return;
  }

  const query = "UPDATE contacts SET name = ?, email = ?, mobile = ?, company = ?, title = ?, photo = ?, group_id = ? WHERE id = ?";
  const values = [name, email, mobile, company, title, photo, group_id, contactId];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error("Error updating contact: ", error);
      res.status(500).send("Internal server error");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("Contact not found");
      return;
    }

    res.send({ contactId, name, email, mobile, company, title, photo, group_id });
  });
});



// Delete user
app.delete("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const q = " DELETE FROM contacts WHERE id = ? ";

  db.query(q, [contactId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
  
// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
