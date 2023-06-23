const express = require("express");

const app = express();

const PORT = 3000;

const requestCounter = require("./middleware/requestCounter");
const customMiddleware = require("./middleware/customMiddleware");
const { sum, multiply } = require("./utils");

function middleware(req, res, next) {
  //   console.log("From inside middleware", req.headers);
  if (req.headers.counter < 0) {
    return res.send("Error from Middleware");
  }

  next();
}

app.use(requestCounter);
app.use(middleware);

// parse JSON

app.use(express.json());

app.post("/customMiddleware", customMiddleware, (req, res) => {
  res.json({ status: "ok" });
});

app.post("/counterSum", (req, res) => {
  const { counter: n } = req.body;
  //   console.log(req.headers);
  const sumOfN = sum(n);
  const mul = multiply(n);
  //   console.log(req.route, "route");

  if (n > 10000) {
    res.status(404).send("Number is too big");
  }

  const ans = {
    sum: sumOfN,
    mul,
  };

  // res.send vs res.json
  // with res.json you can't send text. it enforces to send json

  res.send(ans);
});

// use dynamic routes
app.get("/users/:user/:id", (req, res) => {
  console.log(req.params);

  res.send({ params: req.params });
});

app.post("/createUser", (req, res) => {
  console.log(req.body);
  console.log(req.route, "route");

  res.send(`User Created, ${req.body}`);
});

app.put("/updateUser", (req, res) => {
  res.send("User Updated");
});

app.delete("/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.listen(PORT, () => {
  console.log(`Listening of PORT ${PORT}, http://localhost:${PORT}`);
});
