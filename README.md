# Urkunddashboard

## Konfiguration
### Datenbank
In der `backend/config.ts` Datei kann die Verbindung zu der Datenbank konfiguriert werden. Das Dashboard benutzt mit einer MySQL Datenbank Siehe https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md für verschiedene Arten der Konfiguration.

### Port
In der `backend/config.ts` Datei kann auch in der Varible:   `export const PORT = 8000;` Der Port unter der das Dashboard erreichbar ist , geändert werden.
### Email
Die Datei `backend/emailconfig.ts` beinhaltet die Konfigurationen für das Empfangen und versenden vom Emails.

`export const emailadress = '';` ist die Adresse, die die Emails absendet.
`export const urkundmail = 'xxx@analys.urkund.se';` ist die Urkund E-Mail-Adresse an denen die Dokumente zur Überprüfung geschick werden sollen.
Die Variable `sendConfig` beinhaltet die SMTP Konfiguration für die Absendeadresse. Siehe: https://nodemailer.com/smtp/
Die Variable `imapConfig` beinhaltet die IMAP Konfiguration für das Postfach an den Urkund die Antwort schickt. Siehe: https://www.npmjs.com/package/imap-simple

## Installation
Zum Installieren ist die Version 14 von [Node.js](https://nodejs.org/en/download/) benötigt.
Danach muss die UrkundDashboard.zip Datei entpackt werden. Zur Installation muss in der Kommandozeile der Ordner gefunden werden und mit `npm install` kann können die Abhängigkeiten des Programmes installiert werden.

Danach kann mit `npm run build:frontend` das Frontend kompiliert werden. Die daraus resultierende HTML und Javascript Dateien befinden sich in ``backend/public`` . Das Backend kann nun mit `npm run build:backend` kompiliert werden.

Bei der ersten Installation muss ein neuer Benutzer erstellt werden. Dies wird mit gemacht `npm run createuser` 

Mit `npm start` kann nun das Dashboard gestartet werden und es ist unter http://localhost:8000/ verfügbar.
