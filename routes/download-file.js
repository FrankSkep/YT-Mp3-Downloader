const ytdl = require('ytdl-core');
const ffmpeg = require("fluent-ffmpeg");
const stream = require("stream");

ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");

module.exports = async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send({ error: "URL del video requerida" });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title.replace(/[<>:"\/\\|?*]+/g, "");

        res.setHeader('Content-disposition', `attachment; filename="${videoTitle}.mp3"`);
        res.setHeader('Content-type', 'audio/mpeg');

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
