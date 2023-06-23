function customMiddleware(req, res, next) {
  const counter = req.body.counter;

  console.log(counter, "counter from custom middleware");
  if (counter < 10) {
    return res.send({ error: "invalid counter" });
  }

  next();
}

module.exports = customMiddleware;
