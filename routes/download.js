const { exec } = require("youtube-dl-exec");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

// Configurar ffmpeg
ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");

module.exports = async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send({ error: "URL del video requerida" });
    }

    try {
        const outputFile = path.resolve(__dirname, "video.mp4");

        const youtubedl = exec(videoUrl, {
            output: outputFile,
            format: "bestaudio",
        });

        let stdout = "";
        youtubedl.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        youtubedl.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        youtubedl.on("close", (code) => {
            if (code !== 0) {
                return res
                    .status(500)
                    .send({ error: "Error al descargar el video" });
            }

            const videoFilePath = outputFile;
            const audioFilePath = path.resolve(__dirname, "audio.mp3");
            console.log(`Video descargado en: ${videoFilePath}`);

            ffmpeg(videoFilePath)
                .toFormat("mp3")
                .save(audioFilePath)
                .on("end", () => {
                    res.download(audioFilePath, "audio.mp3", (err) => {
                        if (err) {
                            console.error(
                                "Error al descargar el archivo:",
                                err
                            );
                            return res.status(500).send({
                                error: "Error al descargar el archivo",
                            });
                        }
                        fs.unlinkSync(videoFilePath); // Elimina el archivo temporal
                        fs.unlinkSync(audioFilePath); // Elimina el archivo temporal
                        console.log("Archivos temporales eliminados");
                    });
                })
                .on("error", (err) => {
                    console.error("Error en ffmpeg:", err);
                    res.status(500).send({
                        error: "Error al procesar el video",
                    });
                });
        });
    } catch (err) {
        console.error("Error al procesar el video:", err);
        res.status(500).send({ error: "Error al procesar el video" });
    }
};
