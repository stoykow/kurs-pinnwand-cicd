# Kurs-Pinnwand

Dieses Mini-Projekt ist für den Git- und GitHub-Einstieg gedacht.

Online:

- Repository: <https://github.com/stoykow/kurs-pinnwand-cicd>
- Veröffentlichte Seite: <https://stoykow.github.io/kurs-pinnwand-cicd/>

Die Idee:

- Eine einfache Webseite zeigt Beiträge aus `data/beitraege.json`.
- Jede Person ergänzt genau einen kleinen Beitrag.
- Die Änderung wird über Git, GitHub und Pull Request sichtbar.
- Nach dem Merge kann die Seite automatisch über GitHub Pages aktualisiert werden.

Das Projekt ist bewusst einfach. Es geht nicht um perfekte Webentwicklung, sondern um den Ablauf:

```text
Fork/Branch -> Änderung -> Commit -> Push -> Pull Request -> Review -> Merge -> sichtbares Ergebnis
```

## Lokal öffnen

Starte im Projektordner einen kleinen lokalen Webserver:

```bash
python -m http.server 8000
```

Öffne danach im Browser:

```text
http://localhost:8000
```

Hinweis: Ein direkter Doppelklick auf `index.html` kann je nach Browser nicht funktionieren, weil die Seite die Datei `data/beitraege.json` nachlädt.

## Beitrag ergänzen

Bearbeite `data/beitraege.json`.

Beispiel:

```json
{
  "name": "Niko",
  "rolle": "Trainer",
  "beitrag": "Ich teste heute Pull Requests.",
  "farbe": "teal"
}
```

Erlaubte Farben:

- `teal`
- `blue`
- `green`
- `amber`
- `gray`

## Einfache Prüfung

Wenn Node.js verfügbar ist:

```bash
node scripts/check-data.js
```

Die Prüfung kontrolliert:

- Ist `data/beitraege.json` gültiges JSON?
- Gibt es mindestens einen Beitrag?
- Haben alle Beiträge die Pflichtfelder?

## GitHub Pages

Wenn das Repository auf GitHub liegt, kann die Seite mit GitHub Pages veröffentlicht werden.

Der Workflow in `.github/workflows/pages.yml` prüft die Daten und veröffentlicht die statische Webseite. Dafür muss GitHub Pages im Repository auf **GitHub Actions** als Quelle eingestellt sein.

## Didaktischer Zweck

Dieses Projekt zeigt das CI/CD-Prinzip in klein:

- Änderung wird versioniert
- Pull Request macht die Änderung prüfbar
- automatische Prüfung schützt vor kaputtem JSON
- Deployment macht das Ergebnis sichtbar
