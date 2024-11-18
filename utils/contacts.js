const fs = require('node:fs');

//! membuat folder data jika belum adaa
const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//! membuat file JSON jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// untuk membaca isi kotak yang ada di file json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// mencari contact berdasrkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
}

module.exports = {loadContact, findContact};