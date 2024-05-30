const yargs = require("yargs");
const contacts = require("./contacts.js");

yargs
  .command({
    command: "add",
    describe: "menambahkan kontak baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: true,
        type: "string",
      },
      noHp: {
        describe: "noHp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

// Menampilkan daftar semua nama kontak
yargs.command({
  command: "list",
  describe: "menampilkan semua list kontak",
  builder: {},
  handler() {
    contacts.listContact();
  },
});

// menampilkan detail
yargs.command({
  command: "detail",
  describe: "menampilkan detail kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "menghapus data",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});
yargs.parse();
