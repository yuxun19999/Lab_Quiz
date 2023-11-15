const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML) from the 'public' directory
app.use(express.static('public'));

// Load common passwords from file
const commonPasswords = fs.readFileSync('10-million-password-list-top-1000.txt', 'utf-8').split('\n');

// Password validation function
function validatePassword(password) {
  // Implement your custom password validation logic here
  // For example, you can check length, complexity, and whether it's a common password
  return password.length >= 12 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password) &&
         !commonPasswords.includes(password);
}

// Home page route
app.get('/', (req, res) => {
  const errorMessage = req.query.error ? `<p style="color: red">${req.query.error}</p>` : '';
  res.send(`
    <form action="/login" method="post">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Login</button>
    </form>
    ${errorMessage}
  `);
});

// Handle POST request to /login
app.post('/login', (req, res) => {
  const password = req.body.password;

  // Validate the password
  if (validatePassword(password)) {
    // Password meets the requirements
    // You can add your authentication logic here

    console.log('Redirecting to welcome page');
    
    // Redirect to the welcome page
    res.redirect('/welcome?password=' + encodeURIComponent(password));
  } else {
    // Password does not meet the requirements or is a common password
    // Redirect back to the home page with an error message
    console.log('Redirecting to home page with error');
    res.redirect('/?error=Password does not meet the requirements or is a common password.');
  }
});

// Welcome page route
app.get('/welcome', (req, res) => {
  const password = req.query.password;
  res.send(`
    <h1>Welcome!</h1>
    <p>Your password is: ${password}</p>
    <a href="/">Logout</a>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
