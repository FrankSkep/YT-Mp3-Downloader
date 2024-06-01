const express = require("express");
const bodyParser = require("body-parser");
const download = require("./routes/download");
const downloadFile = require("./routes/download-file");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta para el API de descarga
app.post("/routes/download", download);
app.post("/routes/download-file", downloadFile);

// Ruta para servir index.html en la raiz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
