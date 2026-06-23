# Anleitung - Zusammenarbeit mit der Kurs-Pinnwand

Diese Anleitung beschreibt, wie zwei oder drei Personen gemeinsam an der Kurs-Pinnwand arbeiten können.

Repository:

```text
https://github.com/stoykow/kurs-pinnwand-cicd
```

Veröffentlichte Seite:

```text
https://stoykow.github.io/kurs-pinnwand-cicd/
```

Actions / CI/CD-Job:

```text
https://github.com/stoykow/kurs-pinnwand-cicd/actions
```

## Kurzentscheidung

Für den Unterricht gibt es zwei sinnvolle Wege.

| Variante | Wann sinnvoll? | Müssen TN eingeladen werden? | Können Pull Requests geprüft werden? |
|---|---|---:|---:|
| Fork + Pull Request | beste Kursvariante ohne Schreibrechte | Nein | Ja |
| Collaborator + Branch + Pull Request | kleine vertraute Gruppe | Ja | Ja |

Empfehlung für den ersten Durchlauf:

```text
Fork + Pull Request
```

Dann können Teilnehmende Änderungen vorschlagen, ohne direkten Schreibzugriff auf dein Repository zu haben.

## Grundidee des Projekts

Jede Person bearbeitet oder erstellt eine Datei in:

```text
data/beitraege/
```

Beispiel:

```text
data/beitraege/kevin.json
```

Eine Datei darf einen Beitrag enthalten:

```json
{
  "name": "Kevin",
  "rolle": "Teilnehmender",
  "beitrag": "Ich teste einen Pull Request.",
  "farbe": "green"
}
```

Oder mehrere Beiträge als Array:

```json
[
  {
    "name": "Kevin",
    "rolle": "Teilnehmender",
    "beitrag": "Mein erster Beitrag.",
    "farbe": "green"
  },
  {
    "name": "Kevin",
    "rolle": "Teilnehmender",
    "beitrag": "Mein zweiter Beitrag.",
    "farbe": "blue"
  }
]
```

Erlaubte Farben:

```text
teal, blue, green, amber, gray
```

## Variante A: Fork + Pull Request

Diese Variante ist für den Unterricht am saubersten.

Die Teilnehmenden brauchen:

- GitHub-Konto
- Zugriff auf das öffentliche Repository
- keine Schreibrechte auf dein Repository

### Ablauf für Teilnehmende im Browser

1. Repository öffnen:

```text
https://github.com/stoykow/kurs-pinnwand-cicd
```

2. Oben rechts auf `Fork` klicken.
3. Fork im eigenen GitHub-Konto erstellen.
4. Im eigenen Fork in den Ordner wechseln:

```text
data/beitraege/
```

5. Datei anlegen, z. B.:

```text
kevin.json
```

6. Beitrag als JSON einfügen.
7. Unten bei `Commit changes` eine kurze Commit-Nachricht schreiben, z. B.:

```text
Beitrag von Kevin ergänzen
```

8. Änderung committen.
9. Danach auf `Contribute` oder `Compare & pull request` klicken.
10. Pull Request erstellen.

Wichtig beim Pull Request:

```text
base repository: stoykow/kurs-pinnwand-cicd
base branch: main
compare: eigener Fork / eigene Änderung
```

### Ablauf für Teilnehmende mit Git und VS Code

Erst den Fork auf GitHub erstellen.

Dann den eigenen Fork klonen:

```bash
git clone https://github.com/<github-name>/kurs-pinnwand-cicd.git
cd kurs-pinnwand-cicd
```

Neue Datei anlegen:

```text
data/beitraege/vorname.json
```

Optional lokal prüfen:

```bash
node scripts/check-data.js
```

Änderung speichern:

```bash
git status
git add data/beitraege/vorname.json
git commit -m "Beitrag von Vorname ergänzen"
git push
```

Danach auf GitHub den Pull Request vom Fork zum Originalrepository erstellen.

## Variante B: Teilnehmende als Collaborator einladen

Diese Variante ist gut für zwei oder drei vertraute Personen.

Die Teilnehmenden bekommen Schreibrechte auf dein Repository. Sie sollen trotzdem nicht direkt auf `main` arbeiten, sondern einen Branch und Pull Request nutzen.

### TN einladen

1. Repository öffnen:

```text
https://github.com/stoykow/kurs-pinnwand-cicd
```

2. `Settings` öffnen.
3. In den Bereich `Collaborators` oder `Collaborators & teams` wechseln.
4. `Add people` auswählen.
5. GitHub-Benutzernamen oder E-Mail-Adresse der Person eingeben.
6. Einladung senden.
7. Die Person muss die Einladung annehmen.

Hinweis: Bei persönlichen Repositories können Collaborators lesen und Änderungen pushen. Deshalb ist eine klare Branch-Regel wichtig.

### Arbeitsablauf für eingeladene TN

Repository klonen:

```bash
git clone https://github.com/stoykow/kurs-pinnwand-cicd.git
cd kurs-pinnwand-cicd
```

Eigenen Branch erstellen:

```bash
git switch -c beitrag-vorname
```

Datei anlegen:

```text
data/beitraege/vorname.json
```

Optional prüfen:

```bash
node scripts/check-data.js
```

Commit erstellen:

```bash
git status
git add data/beitraege/vorname.json
git commit -m "Beitrag von Vorname ergänzen"
```

Branch hochladen:

```bash
git push -u origin beitrag-vorname
```

Dann auf GitHub einen Pull Request von `beitrag-vorname` nach `main` erstellen.

## Als Trainer Pull Requests prüfen

1. Repository öffnen:

```text
https://github.com/stoykow/kurs-pinnwand-cicd
```

2. Reiter `Pull requests` öffnen.
3. Pull Request auswählen.
4. Prüfen:

- Titel verständlich?
- Datei unter `data/beitraege/`?
- Kein Klarname nötig, Pseudonym ist okay.
- JSON sieht korrekt aus?
- GitHub Actions Check ist grün?

5. In `Files changed` die Änderung ansehen.
6. Bei Fehlern Kommentar schreiben oder `Request changes` wählen.
7. Wenn alles passt: `Merge pull request`.
8. Danach läuft automatisch der Deploy-Job auf `main`.

Die Seite aktualisiert sich nach dem Merge meist nach einigen Sekunden:

```text
https://stoykow.github.io/kurs-pinnwand-cicd/
```

Wenn nichts sichtbar ist:

1. Actions prüfen:

```text
https://github.com/stoykow/kurs-pinnwand-cicd/actions
```

2. Browser hart neu laden:

```text
Strg + F5
```

3. Veröffentlichte Daten prüfen:

```text
https://stoykow.github.io/kurs-pinnwand-cicd/data/beitraege.json
```

## Optional: main schützen

Wenn Teilnehmende als Collaborator eingeladen werden, können sie grundsätzlich auch direkt pushen.

Für mehr Kontrolle kann `main` geschützt werden:

1. Repository öffnen.
2. `Settings` öffnen.
3. `Branches` öffnen.
4. Branch protection rule für `main` anlegen.
5. `Require a pull request before merging` aktivieren.
6. Optional: Status Checks vor Merge verlangen.

Für den ersten Kursdurchlauf reicht oft eine klare Ansage:

```text
Nicht direkt auf main arbeiten.
Immer Branch oder Fork.
Immer Pull Request.
```

## Empfohlener Ablauf für 2-3 Personen

1. Eine Person teilt den Repository-Link.
2. Jede Person erstellt eine eigene Datei in `data/beitraege/`.
3. Jede Person erstellt einen eigenen Pull Request.
4. Die Gruppe schaut einen Pull Request gemeinsam an.
5. Der Trainer prüft `Files changed` und den grünen Actions-Check.
6. Der Trainer merged.
7. Alle öffnen die veröffentlichte Seite und sehen das Ergebnis.

Rollen für Partnerarbeit:

| Rolle | Aufgabe |
|---|---|
| Driver | tippt und erstellt Commit/PR |
| Navigator | prüft JSON und Dateiname |
| Reviewer | schaut Pull Request und Actions an |

Nach einem Durchlauf Rollen wechseln.

## Häufige Fehler

| Fehler | Lösung |
|---|---|
| Datei heißt `Kevin.json` | klein schreiben: `kevin.json` |
| Farbe nicht erlaubt | nur `teal`, `blue`, `green`, `amber`, `gray` |
| JSON-Kommafehler | Actions-Fehler öffnen und Datei korrigieren |
| Änderung direkt auf `main` | beim nächsten Mal Branch/Fork nutzen |
| Seite aktualisiert nicht sofort | Actions prüfen und Browser hart neu laden |

## Kurzskript für dich im Unterricht

```text
Wir arbeiten nicht direkt auf main.
Ihr erstellt eine kleine Änderung in einer eigenen Datei.
Diese Änderung kommt als Pull Request zu mir.
Ich prüfe die Änderung und den automatischen Check.
Wenn alles grün ist, merge ich.
Danach wird die Webseite automatisch aktualisiert.
```

## Quellen

- GitHub Docs: Collaborators zu persönlichen Repositories einladen  
  <https://docs.github.com/articles/inviting-collaborators-to-a-personal-repository>
- GitHub Docs: Pull Request aus einem Fork erstellen  
  <https://docs.github.com/articles/creating-a-pull-request-from-a-fork>
- GitHub Docs: Pull Requests prüfen  
  <https://docs.github.com/articles/reviewing-proposed-changes-in-a-pull-request>
- GitHub Docs: Branch Protection Rules  
  <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule>
