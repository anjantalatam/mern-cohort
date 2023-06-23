import fs from "fs";

fs.readFile("a.txt", "utf-8", (err, data) => {
  console.log(data);
});
