let videoTitle;

document.getElementById("url").addEventListener("input", function (e) {
    const url = e.target.value;
    if (url) {
        fetch("/routes/vid-metadata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then((data) => {
            videoTitle = data.title;
            const videoInfoDiv = document.getElementById("video-info");
            videoInfoDiv.innerHTML = `
                <img src="${data.thumbnail}" alt="Thumbnail">
                <p>${data.title}</p>
            `;
            videoInfoDiv.style.display = "flex";
        })
        .catch((err) => {
            console.error("Error:", err);
        });
    } else {
        document.getElementById("video-info").style.display = "none";
    }
});

document.getElementById("download-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("url").value;
    const bitrate = document.getElementById("bitrate").value;
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    fetch("/routes/mp3-download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, bitrate }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return response.blob();
    })
    .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${videoTitle}.mp3`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        loader.style.display = "none";
    })
    .catch((err) => {
        console.error("Error:", err);
        alert("Error al descargar el archivo. Por favor, intenta de nuevo.");
        loader.style.display = "none";
    });
});
