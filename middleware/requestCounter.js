let count = 0;

function requestCounter(req, res, next) {
  count++;
  console.log(count, "count");
  next();
}

module.exports = requestCounter;
