document.addEventListener('DOMContentLoaded', function() {
    // const ciudad = document.getElementById('ciudad-usuario').textContent;
    const ciudad = 'Pereira, Colombia ';
    const tamaño = '400x200'; // Ancho x Alto
    const zoom = 12; // zoom
    const tipoMapa = 'roadmap'; 
    const claveAPI = 'AIzaSyC04nYD502bkMBWfeKSvZR2cIRU7W4UEIQ'; // Api
    
    // Construir URL del mapa estático
    const urlMapa = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(ciudad)}&zoom=${zoom}&size=${tamaño}&maptype=${tipoMapa}&markers=color:red%7C${encodeURIComponent(ciudad)}&key=${claveAPI}`;
    
    // Mostrar el mapa
    document.getElementById('mapa-imagen').src = urlMapa;
});