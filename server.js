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
  res.sendFile(path.join(__dirname, 'public', 'videosEditados.html'));
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

app.get('/romariaMulheres', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'romariaMulheres.html'))
});

app.get('/romariaConguistas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'romariaConguistas.html'))
});

app.get('/ilhaCaieiras', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'ilhaCaieiras.html'))
});

app.get('/romariaCiclistas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'romariaCiclistas.html'))
});

app.get('/pequenoMC', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'pequenoMC.html'))
});

app.get('/territorioBem', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'territorioBem.html'))
});

app.get('/MCMulheres', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fotos' , 'MCMulheres.html'))
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});