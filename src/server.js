const express = require("express");
const path = require('path');
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const faker = require('faker');
// Set port here
const port = 8082;
const staticFilesPath = path.resolve(__dirname, '../build');
const staticFiles = express.static(staticFilesPath);

const generateUsers = () => {
  const randomNumberOfUsers = 5 + Math.floor(Math.random() * 10);
  const newUsers = [];
  for (let i = 0; i < randomNumberOfUsers; i++) {
    const user = {
      title: faker.name.title(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      birthYear: faker.date.between(1950, 2000).getFullYear()
    };

    newUsers.push(user)
  }

  return newUsers;
}

app.use(staticFiles);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Home route
app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
// 404
app.use((_req, res) => res.status(404).send("Unable to find that!"));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  const emitData = () => {
    const users = generateUsers();
    io.emit('users', JSON.stringify(users));
  }

  const intervalId = setInterval(() => {
    emitData();
  }, 300)

  socket.on("disconnect", () => {
    clearInterval(intervalId);
  })
})

server.listen(port, () => {
  console.log(`Server listening @ : http://localhost:${port}`)
})



// // Start server
// app.listen(port, () => console.log(`Server listening @ : http://localhost:${port}`));
