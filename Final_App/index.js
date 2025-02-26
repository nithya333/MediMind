// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const http = require('http');

const { spawn } = require('child_process'); // For running Python scripts
const path = require('path');
// const { Server } = require('socket.io');
const port = 3000;
const textParser = bodyParser.text({
  extended: false
})

// Create an HTTP server with Keep-Alive enabled
const server = http.createServer({
  keepAlive: true, // Enable Keep-Alive
  keepAliveTimeout: 60000, // 60 seconds timeout for the connection
  timeout: 120000 // 120 seconds for inactive connections
}, app);



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'iomt_secret', resave: false, saveUninitialized: true }));

// Database setup
const db = new sqlite3.Database('./user_info.db', (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database');
});



// Endpoint for handling health queries
app.post('/diagnose', (req, res) => {
  const userQuery = req.body.query;

  // Get the absolute path to the Python file
  const pythonScriptPath = path.join(__dirname, 'public', 'model', 'diagnose.py');

  // Spawn the Python process
  const pythonProcess = spawn('python3', [pythonScriptPath, userQuery]);

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', () => {
      res.json({ diagnosis: result.trim() });
  });

});

// Serve Frontend Pages
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
// app.get('/llm_diagnose', (req, res) => res.sendFile(__dirname + '/public/llm_diagnose.html'));



// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
