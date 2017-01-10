let express = require('express');
let fs = require("fs");
let _ = require("lodash");
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

let filePath = __dirname + "/" + "posts.json";

//list api
app.get('/api/', function (req, res) {
  fs.readFile(filePath, function(err, data) {
    res.end(data);
  });
});

//get api
app.get('/api/:id', function (req, res) {
  fs.readFile(filePath, function(err, data) {
    if (err) throw err;
    let posts = JSON.parse(data);
    let post = _.filter(posts, { 'id' : Number(req.params.id) });
    res.end(JSON.stringify(post));
  });
});

//delete post by id
app.delete('/api/:id', function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if (err) throw err;
    let posts = JSON.parse(data);
    let post = _.filter(posts, { 'id' : Number(req.params.id) })[0];
    posts = _.reject(posts, post);
    fs.writeFile(filePath, JSON.stringify(posts));
    res.end(JSON.stringify(posts));
  });
});

//delete all
app.delete('api', function (req, res) {
  let posts = [];
  fs.writeFile(filePath, posts, function (err) {
    if (err) return console.log(err);
    res.end('deleted');
  });
});

//create
app.post('/api/', function (req, res) {
  let newPost = req.body;
    fs.readFile(filePath, function (err, data) {
    if (err) throw err;
    let existingPosts = JSON.parse(data);
    existingPosts.push(newPost);
    fs.writeFile(filePath, JSON.stringify(existingPosts));
    res.end(JSON.stringify(existingPosts));
  });
});

//update
app.put('/api/:id', function (req, res) {
  let newPost = req.body;
  fs.readFile(filePath, function (err, data) {
    if (err) throw err;
    let posts = JSON.parse(data);
    let post = _.filter(posts, { 'id': Number(req.params.id) })[0];
    posts = _.reject(posts, post);
    posts.push(newPost);
    fs.writeFile(filePath, JSON.stringify(posts));
    res.end(JSON.stringify(posts));
  });
});

let server = app.listen(4041, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});

