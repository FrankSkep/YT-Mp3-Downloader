# YT_to_MP3 Downloader

Aplicación web que permite descargar archivos de audio en formato MP3 en diferentes calidades, desde videos de YouTube.

<div align="center">
   <img src="https://raw.githubusercontent.com/FrankSkep/YT-Mp3-Downloader/main/public/preview.png" alt="Interfaz">
</div>

## Tecnologías Utilizadas

### Frontend

- **HTML**: Se utiliza para la estructura básica de la página web.
- **CSS**: Se utiliza para estilizar la interfaz de usuario y mejorar la apariencia.
- **JavaScript**: Se utiliza para la interactividad y la lógica del lado del cliente.

### Backend

- **Node.js**: Se utiliza como entorno de ejecución para el servidor.
- **Express.js**: Se utiliza como framework web para Node.js, proporcionando una estructura y funciones para el desarrollo del servidor.
- **ytdl-core**: Se utiliza para obtener información y descargar videos de YouTube.
- **fluent-ffmpeg**: Se utiliza para convertir videos descargados a archivos de audio MP3.
- **stream**: Se utiliza para transmitir el audio procesado al cliente.

## Estructura del Proyecto

El proyecto está organizado en varios directorios y archivos que cumplen diferentes funciones:

*   **Directorio /node_modules**:
    *   Contiene todas las dependencias del proyecto, incluidas las bibliotecas de terceros.
*   **Directorio /routes**:
    *   **`vid-metadata.js`**: Contiene la lógica para manejar la solicitud inicial que obtiene los metadatos del video.
    *   **`mp3-download.js`**: Contiene la lógica para manejar la solicitud que convierte a mp3 y transmite el archivo de audio al cliente.
*   **Directorio /public**:
    *   **`index.html`**: El archivo HTML principal que sirve como la interfaz de usuario.
    *   **`script.js`**: Contiene el código JavaScript del lado del cliente para manejar el formulario y la descarga.
    *   **`styles.css`**: Contiene los estilos CSS para tu interfaz de usuario.
*   **Archivo raíz del servidor**:
    *   **`server.js`**: El archivo principal de configuración del servidor Express.
*   **Otros archivos del proyecto**:
    *   **`package.json`**: Contiene las dependencias del proyecto y los scripts de npm.
    *   **`README.md`**: Contiene la documentación del proyecto.

Cada archivo y directorio tiene un propósito específico en el proyecto, facilitando el mantenimiento y la comprensión del código.
