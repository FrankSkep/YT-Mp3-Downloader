document
    .getElementById("download-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const url = document.getElementById("url").value;
        const bitrate = document.getElementById("bitrate").value;
        const loader = document.getElementById("loader");
        const progress = document.querySelector(".progress"); // Seleccionar la barra de progreso
        loader.style.display = "block"; // Mostrar el loader

        fetch("/routes/download", {
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
            return response.json();
        })
        .then((data) => {
            const fileName = data.fileName;

            return fetch("/routes/download-file", {
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
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                loader.style.display = "none"; // Ocultar el loader
                progress.style.display = 'none'; // Ocultar la barra de progreso al finalizar
            });
        })
        .catch((err) => {
            console.error("Error:", err);
            alert(
                "Error al descargar el archivo. Por favor, intenta de nuevo."
            );
            loader.style.display = "none"; // Ocultar el loader en caso de error
        });
    });
