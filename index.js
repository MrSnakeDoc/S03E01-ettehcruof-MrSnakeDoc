// TODO
const readline = require("readline");
let boundaries = [6, 3];
let count = 0;
let questions = ["Borne minimum : ", "Borne maximum : "];
async function bound() {
  boundaries = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  for (const item of questions) {
    // asking question one by one
    boundaries.push(
      await new Promise((resolve) => {
        rl.question(item, (answer) => {
          answer = Number(answer);
          resolve(answer);
        });
      })
    );
  }
  rl.close();
}

function question() {
  return "Est ce que ton chiffre est";
}
async function game(minBoundary, maxBoundary) {
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log(
    `Choisis dans ta tête un nombre entre ${minBoundary} et ${maxBoundary}, je vais essayer de le deviner`
  );
  let guessedNumber = Math.round(
    Math.random() * (maxBoundary - minBoundary) + minBoundary
  );
  console.log(`${question()} ${guessedNumber}`);
  rl2.on("line", (input) => {
    switch (input) {
      case "-":
        maxBoundary = guessedNumber - 1;
        guessedNumber = Math.round(
          Math.random() * (maxBoundary - minBoundary) + minBoundary
        );
        console.log(`${question()} ${guessedNumber}`);
        break;
      case "+":
        minBoundary = guessedNumber + 1;
        guessedNumber = Math.round(
          Math.random() * (maxBoundary - minBoundary) + minBoundary
        );
        console.log(`${question()} ${guessedNumber}`);
        break;
      case "ok":
        console.log("Yes ! Node ftw");
        rl2.close();
      case "exit":
        rl2.close();
    }
  });
}

(async () => {
  let min;
  let max;
  await bound();
  if (!Number.isInteger(boundaries[0]) || !Number.isInteger(boundaries[1])) {
    await bound();
  } else {
    block: while (count < 3) {
      if (boundaries[0] > boundaries[1]) {
        console.log("Merci de choisir les bornes dans le bon ordre");
        count++;
        boundaries = [];
        await bound();
      } else {
        break block;
      }
    }
    if (boundaries[0] > boundaries[1]) {
      min = boundaries[1];
      max = boundaries[0];
      console.log(min);
      console.log(max);
      await game(min, max);
    } else {
      min = boundaries[0];
      max = boundaries[1];
      await game(min, max);
    }
  }
})();

(function test() {})();
