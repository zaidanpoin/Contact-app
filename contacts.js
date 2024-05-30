const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = "./data/contact.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadContact = () => {
  let konta = [];
  const file = fs.readFileSync(filePath, "utf-8");
  konta = JSON.parse(file);
  return konta;
};

const simpanContact = (nama, email, noHp) => {
  const contact = {
    nama,
    email,
    noHp,
  };

  try {
    // let konta = [];
    // const file = fs.readFileSync(filePath, "utf-8");
    // konta = JSON.parse(file);

    const contacts = loadContact();

    if (file) {
      // Periksa apakah kontak sudah ada dalam daftar
      const existingContact = konta.find(
        (c) => c.nama === nama && c.email === email && c.noHp === noHp
      );
      if (existingContact) {
        console.log(chalk.red.inverse.bold("Kontak sudah ada dalam daftar."));
        return; // Tidak menambahkan kontak baru
      }
    }

    if (email) {
      if (!validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold("email tidak valid"));
        return false;
      }
    }

    if (noHp) {
      if (!validator.isMobilePhone(noHp, "id-ID")) {
        console.log(chalk.red.inverse.bold("no hp tidak valid"));
        return false;
      }
    }

    konta.push(contact);
    fs.writeFileSync(filePath, JSON.stringify(konta));
    console.log(chalk.green.inverse.bold("Kontak berhasil disimpan."));
  } catch (err) {
    console.error("Gagal menyimpan kontak:", err);
  }
};

// list contacct
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("list kontak"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1} nama ${contact.nama}-${contact.noHp}`);
  });
};

// detail contact
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (konta) => konta.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan`));
    return false;
  }
  console.log(chalk.green.inverse.bold(contact.nama));
  console.log(contact.noHp);
  console.log(contact.email);
};

// delete contact
const deleteContact = (nama) => {
  const contact = loadContact();
  const newContact = contact.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contact.length === newContact.length) {
    console.log(chalk.red.inverse.bold(`${nama} ini tidak ditemukan`));
    return false;
  }
  fs.writeFileSync(filePath, JSON.stringify(newContact));

  console.log(chalk.green.inverse.bold(`Kontak ${nama} berhasil dihapus.`));
};
module.exports = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
};
