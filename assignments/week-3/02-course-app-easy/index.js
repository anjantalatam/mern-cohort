const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuid } = require('uuid');
const fs = require('fs');
const PORT = 3000;

app.use(bodyParser.json());

let ADMINS = [];
let COURSES = [];
let USERS = [];

const enableStore = true;

// ADMIN middleware

function authenticateAdmin(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const adminFromDb = ADMINS.find((a) => a.username === username);

  if (adminFromDb.password !== password) {
    return res.status(401).send({ message: 'Invalid Credentials' });
  }

  next();
}

// USER middleware

function authenticateUser(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const userFromDb = USERS.find((a) => a.username === username);

  if (userFromDb.password !== password) {
    return res.status(401).send({ message: 'Invalid Credentials' });
  }

  next();
}

// <---------------------- Commenting for now ---------------------->

// admins store
fs.readFile(
  path.join(__dirname, '/store/admins.json'),
  'utf-8',
  (err, data) => {
    function initiateAdminStore() {
      fs.writeFile(
        path.join(__dirname, '/store/admins.json'),
        JSON.stringify([]),
        (err) => {
          if (err) {
            // console.log('Error in writing to file');
          } else {
            // console.log('Store Created');
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
  }
);

// courses store setup
fs.readFile(
  path.join(__dirname, '/store/courses.json'),
  'utf-8',
  (err, data) => {
    function initiateCoursesStore() {
      fs.writeFile(
        path.join(__dirname, '/store/courses.json'),
        JSON.stringify([]),
        (err) => {
          if (err) {
            // console.log('Error in writing to file');
          } else {
            // console.log('Store Created');
          }
        }
      );
    }

    if (err) {
      initiateCoursesStore();
      return;
    }

    try {
      const coursesFromFile = JSON.parse(data);
      COURSES = coursesFromFile;
    } catch (e) {
      initiateCoursesStore();
      COURSES = [];
    }
  }
);

// users store
fs.readFile(path.join(__dirname, '/store/users.json'), 'utf-8', (err, data) => {
  function initiateUsersStore() {
    fs.writeFile(
      path.join(__dirname, '/store/users.json'),
      JSON.stringify([]),
      (err) => {
        if (err) {
          // console.log('Error in writing to file');
        } else {
          // console.log('Store Created');
        }
      }
    );
  }

  if (err) {
    initiateUsersStore();
    return;
  }

  try {
    const usersFromFile = JSON.parse(data);
    USERS = usersFromFile;
  } catch (e) {
    initiateUsersStore();
    USERS = [];
  }
});

function updateAdminStore() {
  fs.writeFile(
    path.join(__dirname, '/store/admins.json'),
    JSON.stringify(ADMINS),
    (err) => {
      if (err) {
        // console.log('ADMIN store update failed');
        return;
      }
      // console.log('ADMIN Store updated');
    }
  );
}

function updateCoursesStore() {
  fs.writeFile(
    path.join(__dirname, '/store/courses.json'),
    JSON.stringify(COURSES),
    (err) => {
      if (err) {
        // console.log('COURSES store update failed');
        return;
      }
      // console.log('COURSES Store updated');
    }
  );
}

function updateUsersStore() {
  fs.writeFile(
    path.join(__dirname, '/store/users.json'),
    JSON.stringify(USERS),
    (err) => {
      if (err) {
        // console.log('USERS store update failed');
        return;
      }
      // console.log('USERS Store updated');
    }
  );
}

// <---------------------- Commenting for now ---------------------->

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const admin = ADMINS.find((a) => a.username === username);

  if (admin) {
    return res.status(409).send({ message: 'User exists' });
  }

  ADMINS.push({
    id: uuid(),
    username,
    password,
  });

  enableStore && updateAdminStore();

  res.status(200).send({ message: 'Admin created successfully' });
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const adminFromDb = ADMINS.find((a) => a.username === username);
  if (adminFromDb?.password !== password) {
    return res.status(401).send({ message: 'Invalid Credentials' });
  }

  res.send({ message: 'Logged in successfully' });
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
  const { title, description, price, imageLink, published } = req.body;
  const { username } = req.headers;

  const properties = [
    'title',
    'description',
    'price',
    'imageLink',
    'published',
  ];

  if (properties.some((prop) => req.body[prop] === undefined)) {
    return res.status(401).send({ message: 'All properties are required' });
  }

  const adminUser = ADMINS.find((a) => a.username === username);

  const courseId = uuid();

  const newCourse = {
    title,
    description,
    price,
    imageLink,
    published,
    id: courseId,
    instructorId: adminUser.id,
  };

  COURSES.push(newCourse);

  if (!adminUser.courses) {
    adminUser.courses = [courseId];
  } else {
    adminUser.courses.push(courseId);
  }

  // update stores
  enableStore && updateAdminStore();
  enableStore && updateCoursesStore();

  res.send({ message: 'Course created successfully', courseId });
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  const { courseId } = req.params;

  const course = COURSES.find((c) => c.id === courseId);

  if (!course) {
    return res.status(401).send({ message: 'Course not found' });
  }

  const body = req.body;

  const properties = [
    'title',
    'description',
    'price',
    'imageLink',
    'published',
  ];

  if (properties.every((prop) => body[prop] === undefined)) {
    return res.status(400).send({ message: 'Atleast one field required' });
  }

  const newCourse = { ...course };

  properties.forEach((prop) => {
    if (body[prop] !== undefined) {
      newCourse[prop] = body[prop];
    }
  });

  const updatedCourses = COURSES.map((c) => {
    if (c.id === courseId) {
      return newCourse;
    }
    return c;
  });

  COURSES = updatedCourses;

  enableStore && updateCoursesStore();

  res.send({ message: 'Course updated successfully' });
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
  const { username } = req.headers;

  const admin = ADMINS.find((u) => u.username === username);

  if (!admin) {
    return res.send({ message: 'USER not found (no chance for this error)' });
  }

  const coursesByAdmin = COURSES.filter((c) => c.instructorId === admin.id);

  return res.send({ courses: coursesByAdmin });
});

// <-------------------- Admin DEV Route -------------------->
app.get('/admins', (req, res) => {
  const { 'dev-mode': devMode } = req.headers;

  if (!devMode) {
    return res.send(401);
  }

  res.send(ADMINS);
});

// <-------------------- User routes -------------------->
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const user = USERS.find((a) => a.username === username);

  if (user) {
    return res.status(409).send({ message: 'User exists' });
  }

  USERS.push({
    id: uuid(),
    username,
    password,
  });

  enableStore && updateUsersStore();

  res.status(200).send({ message: 'User created successfully' });
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: 'Username and Password are required' });
  }

  const userFromDb = USERS.find((u) => u.username === username);
  if (userFromDb?.password !== password) {
    return res.status(401).send({ message: 'Invalid Credentials' });
  }

  res.send({ message: 'Logged in successfully' });
});

app.get('/users/courses', authenticateUser, (req, res) => {
  const publishedCourses = COURSES.filter((c) => c.published);
  res.send({ courses: publishedCourses });
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

  const { username } = req.headers;

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

  enableStore && updateUsersStore();

  res.send({ message: 'Course purchased successfully' });
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
  const { username } = req.headers;

  const currentUser = USERS.find((u) => u.username === username);

  const purchasedCourses = currentUser?.purchasedCourses || [];

  const courseDetails = COURSES.filter((c) => purchasedCourses.includes(c.id));

  res.send({ courses: courseDetails });
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

// app.listen(PORT, () => {
//   console.log('Server is listening on port 3000');
// });

module.exports = app;
