const express = require("express");
const path = require('path');

const app = express();
// Set port here
const port = 8082;
const staticFilesPath = path.resolve(__dirname, '../build');
const staticFiles = express.static(staticFilesPath);

app.use(staticFiles);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const p = path.resolve(__dirname, '../build/index.html');
  res.sendFile(p);
});

// 404
app.use((_req, res) => res.status(404).send("Unable to find that!"));

// Start server
app.listen(port, () => console.log(`Server listening @ : http://localhost:${port}`));