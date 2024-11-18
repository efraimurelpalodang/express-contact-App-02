const express = require("express");
const app = express();
const port = 3000;
const { loadContact, findContact } = require('./utils/contacts.js')

//! memanggil express layout
const expressLayouts = require('express-ejs-layouts');
//! untuk menggunakan express layoutnya (third-party middleware punya express)
app.use(expressLayouts);

//? memberitahukan express kalo kita viewnya menggunakan ejs
app.set("view engine", "ejs");

// Build in middleware
app.use(express.static('public'));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Efraim",
      email: "hayoappa@gmail.com",
    },
    {
      nama: "urel",
      email: "gataumales@gmail.com",
    },
    {
      nama: "Molly",
      email: "hayamaja@gmail.com",
    },
    {
      nama: "Ebong",
      email: "apaliatliat@gmail.com",
    },
  ];

  res.render("index", {
    layout : 'layouts/main-layout',
    nama: "efraim urel palodang",
    tittle: "Halaman Home",
    mahasiswa
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout : 'layouts/main-layout',
    tittle : 'Halaman About'
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  
  res.render("contact", {
    layout : 'layouts/main-layout',
    tittle : 'Halaman Contact',
    contacts
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  
  res.render("detail", {
    layout : 'layouts/main-layout',
    tittle : 'Halaman Detail Contact',
    contact
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});
