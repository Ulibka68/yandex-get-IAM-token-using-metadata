require("dotenv").config();

function generateOutputPictName() {
  const d = new Date();
  let a = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/`;
  for (let i = 1; i < 12; i++) {
    a += Math.floor(Math.random() * 16).toString(16);
  }
  return a;
}

const a = generateOutputPictName();
console.log(a);
