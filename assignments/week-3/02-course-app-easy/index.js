const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuid } = require('uuid');
const fs = require('fs');
const PORT = 3000;

app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

fs.readFile(path.join(__dirname, '/store/admin.json'), 'utf-8', (err, data) => {
  function initiateAdminStore() {
    fs.writeFile(
      path.join(__dirname, '/store/admin.json'),
      JSON.stringify([]),
      (err) => {
        if (err) {
          console.log('Error in writing to file');
        } else {
          console.log('Store Created');
        }
      }
    );
  }

  if (err) {
    initiateAdminStore();
    return;
  }

  try {
    const adminsFromFile = JSON.parse(data);
    ADMINS = adminsFromFile;
  } catch (e) {
    initiateAdminStore();
    ADMINS = [];
  }
});

function updateAdminStore() {
  fs.writeFile(
    path.join(__dirname, '/store/admin.json'),
    JSON.stringify(ADMINS),
    (err) => {
      if (err) {
        console.log('ADMIN store update failed');
        return;
      }
      console.log('ADMIN Store updated');
    }
  );
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and Password are required' });
  }

  const admin = ADMINS.find((a) => a.email === email);

  console.log(ADMINS, admin);

  if (admin) {
    return res.status(409).send({ message: 'User exists' });
  }

  ADMINS.push({
    id: uuid(),
    email,
    password,
  });

  updateAdminStore();

  res.status(200).send({ message: 'User created successfully' });
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.headers;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and Password are required' });
  }

  const adminFromDb = ADMINS.find((a) => a.email === email);
  if (adminFromDb.password !== password) {
    return res.status(401).send({ message: 'Invalid Credentials' });
  }

  res.send({ message: 'Logged in successfully' });
});

app.get('/admins', (req, res) => {
  res.send(ADMINS);
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(PORT, () => {
  console.log('Server is listening on port 3000');
});
