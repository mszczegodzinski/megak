/**
 * Creat an app which has 3 routes:
 * /name/set/:name - save given name, save to the file, and display it in the browser
 * /name/show - display previously given name in the browser
 * /name/check - check if the given name is already in the file
 */

const { readFile, writeFile } = require('fs').promises;
const express = require('express');

const app = express();

app.get('/name/set/:name', async (req, res) => {
  const name = req.params.name;
  await writeFile('name.txt', name, 'utf-8');
  res.send(name);
});

app.get('/name/show', async (req, res) => {
  const data = await readFile('name.txt', 'utf8');
  res.send(data);
});

app.get('/name/check', async (req, res) => {
  try {
    await readFile('name.txt', 'utf8');
    res.send('There is already a name in the file');
  } catch (error) {
    res.send('There no name in the file');
  }

  res.send(data);
});

app.listen(3000, 'localhost');
