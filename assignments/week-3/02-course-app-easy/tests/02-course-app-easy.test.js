// these are yet to be published

// allow users to purchase only published courses

//  get courses in users should return only published courses

// trying to buy already bought course
const request = require('supertest');

const server = require('../index.js');

describe('Admin Routes', () => {
  let courseId;

  test('Create an Admin', async () => {
    const res = await request(server).post('/admin/signup').send(adminOne);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Admin created successfully');
  });

  test('Login an Admin', async () => {
    const res = await request(server)
      .post('/admin/login')
      .set('username', adminOne.username)
      .set('password', adminOne.password);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logged in successfully');
  });

  test('Should create a course', async () => {
    const res = await request(server)
      .post('/admin/courses')
      .set('username', adminOne.username)
      .set('password', adminOne.password)
      .send(testCourseOne);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Course created successfully');
    courseId = res.body.courseId;
  });

  test('Should update a course', async () => {
    const res = await request(server)
      .put(`/admin/courses/${courseId}`)
      .set('username', adminOne.username)
      .set('password', adminOne.password)
      .send({
        title: 'test tile one updated',
        description: 'test description one updated',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Course updated successfully');
  });

  test('Get all courses', async () => {
    // create second admin
    await request(server).post('/admin/signup').send(adminTwo);

    // add course to admin1
    await request(server)
      .post('/admin/courses')
      .set('username', adminOne.username)
      .set('password', adminOne.password)
      .send(testCourseTwo);

    // add course to admin2
    await request(server)
      .post('/admin/courses')
      .set('username', adminTwo.username)
      .set('password', adminTwo.password)
      .send(testCourseThree);

    const res = await request(server)
      .get(`/admin/courses`)
      .set('username', adminOne.username)
      .set('password', adminOne.password);

    const { courses } = res.body;

    console.log(courses);

    expect(res.statusCode).toBe(200);
    expect(courses).toBeDefined();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBe(2);
  });
});

describe('User Routes', () => {
  test('Create an User', async () => {
    const res = await request(server).post('/users/signup').send(userOne);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User created successfully');
  });

  test('Login User', async () => {
    const res = await request(server)
      .post('/users/login')
      .set('username', userOne.username)
      .set('password', userOne.password);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logged in successfully');
  });

  test('Get All Courses', async () => {
    const res = await request(server)
      .get('/users/courses')
      .set('username', userOne.username)
      .set('password', userOne.password);

    const { courses } = res.body;

    expect(res.statusCode).toBe(200);
    expect(courses).toBeDefined();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBe(2);
  });
});

const adminOne = {
  username: 'test-admin-one@gmail.com',
  password: 'test-admin-one',
};

const adminTwo = {
  username: 'test-admin-two@gmail.com',
  password: 'test-admin-two',
};

const testCourseOne = {
  title: 'test tile one',
  description: 'test description one',
  price: 1000,
  imageLink: 'https://linktoimage.com',
  published: true,
};

const testCourseTwo = {
  title: 'test tile two',
  description: 'test description two',
  price: 100,
  imageLink: 'https://linktoimage.com',
  published: false,
};

const testCourseThree = {
  title: 'test tile three',
  description: 'test description two',
  price: 0,
  imageLink: 'https://linktoimage.com',
  published: true,
};

// user mock data
const userOne = {
  username: 'test-user-one@gmail.com',
  password: 'test-user-one',
};
