const express = require("express");

const app = express();

const PORT = 3000;

// parse JSON

app.use(express.json());

app.get("/", (req, res) => {
  const { count: n } = req.query;
  const sum = (Number(n) * (Number(n) + 1)) / 2;
  console.log(req.route, "route");

  res.send(`sum is ${sum}`);
});

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
