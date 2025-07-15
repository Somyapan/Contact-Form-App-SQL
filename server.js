const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 4000;

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123', // Replace with your actual password
  database: 'demo_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ POST route to save contact
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO contacts (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).send('Database error');
    }
    res.send('✅ Contact saved!');
  });
});

// ✅ GET route to fetch all contacts
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, result) => {
    if (err) {
      console.error('❌ Fetch Error:', err);
      return res.status(500).send('Database error');
    }
    res.json(result);
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
