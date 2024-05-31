const ytdl = require('ytdl-core');
const ffmpeg = require("fluent-ffmpeg");
const stream = require("stream");

module.exports = async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send({ error: "URL del video requerida" });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title.replace(/[<>:"\/\\|?*]+/g, "");

        // Envía temporalmente el nombre del archivo
        res.json({ fileName: `${videoTitle}.mp3` });

        // Luego, comienza la transmisión de audio
        const audioStream = new stream.PassThrough();

        ffmpeg(ytdl(videoUrl, { filter: 'audioonly' }))
            .audioBitrate(128)
            .format('mp3')
            .pipe(audioStream)
            .pipe(res)
            .on('error', err => {
                console.error("Error en ffmpeg:", err);
                res.status(500).send({ error: "Error al procesar el video" });
            });

    } catch (err) {
        console.error("Error al procesar el video:", err);
        res.status(500).send({ error: "Error al procesar el video" });
    }
};
