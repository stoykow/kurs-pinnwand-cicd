const board = document.querySelector("#board");
const cardTemplate = document.querySelector("#cardTemplate");
const count = document.querySelector("#count");
const updated = document.querySelector("#updated");
const themeControls = document.querySelectorAll('input[name="theme"]');

const allowedColors = new Set(["teal", "blue", "green", "amber", "gray"]);
const allowedThemes = new Set(["system", "dark", "light"]);
const themeStorageKey = "kurs-pinnwand-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function readTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    return allowedThemes.has(savedTheme) ? savedTheme : "system";
  } catch (error) {
    return "system";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    // Die Auswahl funktioniert auch ohne Speicherung.
  }
}

function resolveTheme(theme) {
  if (theme === "system") {
    return systemThemeQuery.matches ? "dark" : "light";
  }

  return theme;
}

function applyTheme(theme) {
  const selectedTheme = allowedThemes.has(theme) ? theme : "system";

  document.body.dataset.themeMode = selectedTheme;
  document.body.dataset.theme = resolveTheme(selectedTheme);

  themeControls.forEach((control) => {
    control.checked = control.value === selectedTheme;
  });
}

themeControls.forEach((control) => {
  control.addEventListener("change", () => {
    saveTheme(control.value);
    applyTheme(control.value);
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (readTheme() === "system") {
    applyTheme("system");
  }
});

function createCard(entry) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const color = allowedColors.has(entry.farbe) ? entry.farbe : "gray";

  card.classList.add(color);
  card.querySelector(".badge").textContent = entry.rolle;
  card.querySelector("h2").textContent = entry.name;
  card.querySelector("p").textContent = entry.beitrag;

  return card;
}

function render(entries) {
  board.replaceChildren(...entries.map(createCard));
  count.textContent = `${entries.length} Beiträge`;
  updated.textContent = `Stand: ${new Date().toLocaleDateString("de-DE")}`;
}

async function loadEntries() {
  try {
    const response = await fetch("data/beitraege.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const entries = await response.json();
    render(entries);
  } catch (error) {
    count.textContent = "Beiträge konnten nicht geladen werden.";
    updated.textContent = "Tipp: Erst node scripts/build-data.js ausführen und dann per lokalem Webserver öffnen.";
  }
}

applyTheme(readTheme());
loadEntries();
