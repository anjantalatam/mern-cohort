let count = 0;

export default function requestCounter(req, res, next) {
  count++;
  console.log(count, "count");
  next();
}
