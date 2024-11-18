const express = require("express");
const app = express();
const port = 3000;
const { loadContact, findContact, addContact } = require('./utils/contacts.js');
const { body, validationResult } = require('express-validator');

//! memanggil express layout
const expressLayouts = require('express-ejs-layouts');
//! untuk menggunakan express layoutnya (third-party middleware punya express)
app.use(expressLayouts);
//? memberitahukan express kalo kita viewnya menggunakan ejs
app.set("view engine", "ejs");
// Build in middleware
app.use(express.static('public'));
// Build in middleware untuk parse data yang user isi
app.use(express.urlencoded({ extended: true }));

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

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    tittle: "Form Tambah Data Contact",
    layout: 'layouts/main-layout',
  });
});

// function validation
const emailVal = () => body('email').isEmail();
const noVal = () => body('nohp').isMobilePhone('id-ID');


// proses data contact
app.post("/contact", [emailVal(), noVal()], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  // addContact(req.body);
  // res.redirect('/contact');
})

// halaman detail contact
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
