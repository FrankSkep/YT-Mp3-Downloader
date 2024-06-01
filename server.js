const express = require("express");
const bodyParser = require("body-parser");
const videoMetadata = require("./routes/vid-metadata");
const mp3FileDownload = require("./routes/mp3-download");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta para obtener información del video
app.post("/routes/vid-metadata", videoMetadata);

// Ruta para el API de descarga
app.post("/routes/mp3-download", mp3FileDownload);

// Ruta para servir index.html en la raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});