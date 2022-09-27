const express = require('express');
const app = express();
const ejs = require('ejs');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
  });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended:"true"
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
   Article.find(function (err, foundArticles) {
    if (!err) {
        res.send(foundArticles);   
    } else {
        res.send(err);
    }
   });     
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});