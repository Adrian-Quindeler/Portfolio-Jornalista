require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/videos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'videos_editados.html'));
});

app.get('/producoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'producoes.html'));
});

app.get('/reportagens', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reportagens.html'));
});

app.get('/fotografias', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotografias.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});