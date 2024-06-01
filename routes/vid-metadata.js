const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send({ error: "URL del video requerida" });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title.replace(/[<>:"\/\\|?*]+/g, "");
        const thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;

        res.json({ title: videoTitle, thumbnail });

    } catch (err) {
        console.error("Error al procesar el video:", err);
        res.status(500).send({ error: "Error al procesar el video" });
    }
};
