const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuid } = require('uuid');
const PORT = 3000;
const jwt = require('jsonwebtoken');
const jwtSecret = 'dev-jwt-secret';
const mongoose = require('mongoose');
const { Admin, Course, User } = require('./models');

app.use(bodyParser.json());

let ADMINS = [];
let COURSES = [];
let USERS = [];

mongoose
  .connect('mongodb://localhost/courses')
  .then(() => {
    console.log('connected to mongo');
  })
  .catch((e) => {
    console.log('error in connecting to mongo');
  });

const COURSE_PROPS = [
  'title',
  'description',
  'price',
  'imageLink',
  'published',
];

const COURSE_RES_PROPS = [...COURSE_PROPS, 'id'];

// ADMIN middleware

function authenticateJwt(req, res, next) {
  const { authorization } = req.headers;

  try {
    const decryptedJwt = jwt.verify(authorization, jwtSecret);
    req.user = decryptedJwt;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Token expired' });
  }
}

// USER middleware

function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  try {
    const decryptedJwt = jwt.verify(authorization, jwtSecret);
    req.username = decryptedJwt.username;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Token expired' });
  }
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const adminFromDb = await Admin.findOne({ username });

  if (adminFromDb) {
    return res.status(409).send({ message: 'User exists' });
  }

  const newAdmin = new Admin({ username, password });

  // payload should be object when expiresIn is used
  const token = jwt.sign({ username, role: 'admin' }, jwtSecret, {
    expiresIn: '1h', // expires in 1hour
  });

  await newAdmin.save();

  res.status(200).send({ message: 'Admin created successfully', token });
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const adminFromDb = await Admin.findOne({ username, password });

  if (!adminFromDb) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  // payload should be object when expiresIn is used
  const token = jwt.sign({ username, role: 'admin' }, jwtSecret, {
    expiresIn: '1h', // expires in 1hour
  });

  res.send({ message: 'Logged in successfully', token });
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const { username } = req.user;

  const newCourse = new Course(req.body);

  const adminFromDb = await Admin.findOne({ username });

  newCourse.instructorId = adminFromDb._id;

  try {
    const createdCourse = await newCourse.save();
    res.send({
      message: 'Course created successfully',
      courseId: createdCourse._id,
    });
  } catch (e) {
    res.status(401).send({ message: 'All properties are required' });
  }
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const { courseId } = req.params;
  const body = req.body;

  if (COURSE_PROPS.every((prop) => body[prop] === undefined)) {
    return res.status(400).send({ message: 'Atleast one field required' });
  }

  const updatedCourse = {};

  // this ensures only title, description, .. are only updated
  COURSE_PROPS.forEach((prop) => {
    if (body[prop] !== undefined) {
      updatedCourse[prop] = body[prop];
    }
  });

  try {
    const newUpdatedCourseFromDb = await Course.findByIdAndUpdate(
      courseId,
      updatedCourse,
      {
        new: true,
      }
    );

    if (!newUpdatedCourseFromDb) {
      return res.status(401).send({ message: 'Course not found' });
    }

    res.send({ message: 'Course updated successfully' });
  } catch (e) {
    console.log(e, 'catch error: update course');
    return res.status(500).send({ message: 'Something went wrong' });
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  const { username } = req.user;

  const adminFromDb = await Admin.findOne({ username });

  const coursesByAdmin = await Course.find({ instructorId: adminFromDb._id });

  return res.send({ courses: coursesByAdmin });
});

// <-------------------- Admin DEV Route -------------------->
app.get('/admins', async (req, res) => {
  const { 'dev-mode': devMode } = req.headers;

  if (!devMode) {
    return res.send(401);
  }

  const dbRes = await Admin.find();

  res.send(ADMINS);
});

// <-------------------- User routes -------------------->
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const userFromDb = await User.findOne({ username });

  if (userFromDb) {
    return res.status(409).send({ message: 'User exists' });
  }

  const newUser = new User({ username, password });

  await newUser.save();

  // generate token
  const token = jwt.sign({ username, role: 'user' }, jwtSecret, {
    expiresIn: '1h',
  });

  res.status(200).send({ message: 'User created successfully', token });
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const userFromDb = await User.findOne({ username, password });

  if (!userFromDb) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  // generate token
  const token = jwt.sign({ username, role: 'user' }, jwtSecret, {
    expiresIn: '1h',
  });

  res.send({ message: 'Logged in successfully', token });
});

app.get('/users/courses', authenticateUser, (req, res) => {
  const publishedCourses = COURSES.filter((c) => c.published);

  const coursesResponse = publishedCourses.map((c) => {
    return COURSE_RES_PROPS.reduce((acc, prop) => {
      acc[prop] = c[prop];
      return acc;
    }, {});
  });

  res.send({ courses: coursesResponse });
});

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
  const { courseId } = req.params;

  // allow only published courses to purchase
  const course = COURSES.filter((c) => c.published).find(
    (c) => c.id === courseId
  );

  if (!course) {
    return res.status(401).send({ message: 'Course not found' });
  }

  const { username } = req;

  const currentUser = USERS.find((u) => u.username === username);

  if (
    currentUser?.purchasedCourses &&
    currentUser.purchasedCourses.includes(courseId)
  ) {
    // conflict status code
    return res.status(409).send({ message: 'Course purchased already' });
  }

  if (!currentUser?.purchasedCourses) {
    currentUser.purchasedCourses = [courseId];
  } else {
    currentUser.purchasedCourses.push(courseId);
  }

  // update store
  // updateUsersStore();

  res.send({ message: 'Course purchased successfully' });
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
  const { username } = req;

  const currentUser = USERS.find((u) => u.username === username);

  if (!currentUser) {
    return res.status(404).send({ message: 'USER not found (no chance)' });
  }

  const purchasedCourses = currentUser?.purchasedCourses || [];

  const courseDetails = COURSES.filter((c) => purchasedCourses.includes(c.id));

  const coursesResponse = courseDetails.map((c) => {
    return COURSE_RES_PROPS.reduce((acc, prop) => {
      acc[prop] = c[prop];
      return acc;
    }, {});
  });

  res.send({ courses: coursesResponse });
});

// <-------------------- USER DEV Route -------------------->
app.get('/users', (req, res) => {
  const { 'dev-mode': devMode } = req.headers;

  if (!devMode) {
    return res.send(401);
  }

  res.send(USERS);
});

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log('Server is listening on port 3000');
});
