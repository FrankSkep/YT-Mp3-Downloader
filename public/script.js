document
    .getElementById("download-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const url = document.getElementById("url").value;
        const loader = document.getElementById("loader");
        loader.style.display = "flex"; // Mostrar el loader (cambiar de "block" a "flex" para flexbox)

        fetch("/api/download", {
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
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "audio.mp3";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                loader.style.display = "none"; // Ocultar el loader
            })
            .catch((err) => {
                console.error("Error:", err);
                alert(
                    "Error al descargar el archivo. Por favor, intenta de nuevo."
                );
                loader.style.display = "none"; // Ocultar el loader en caso de error
            });
    });
