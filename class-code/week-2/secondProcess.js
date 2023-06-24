import fetch from "node-fetch";

fetch("http://localhost:3000/counterSum", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    counter: 3,
  }),
}).then((res) => {
  res.json().then((result) => {
    console.log(result);
  });
});
