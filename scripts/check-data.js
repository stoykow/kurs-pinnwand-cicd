const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "beitraege.json");
const allowedColors = new Set(["teal", "blue", "green", "amber", "gray"]);

function fail(message) {
  console.error(message);
  process.exit(1);
}

let entries;

try {
  entries = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (error) {
  fail(`JSON konnte nicht gelesen werden: ${error.message}`);
}

if (!Array.isArray(entries)) {
  fail("Die Datei muss ein JSON-Array enthalten.");
}

if (entries.length === 0) {
  fail("Es muss mindestens ein Beitrag vorhanden sein.");
}

entries.forEach((entry, index) => {
  const label = `Eintrag ${index + 1}`;
  for (const field of ["name", "rolle", "beitrag", "farbe"]) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      fail(`${label}: Feld "${field}" fehlt oder ist leer.`);
    }
  }

  if (!allowedColors.has(entry.farbe)) {
    fail(`${label}: Farbe "${entry.farbe}" ist nicht erlaubt.`);
  }
});

console.log(`${entries.length} Beiträge geprüft.`);
