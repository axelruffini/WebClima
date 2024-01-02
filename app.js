window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperaturaValor = document.getElementById('tempValor');
    let TempDescripcion = document.getElementById('descripcion');
    let TempUbicacion = document.getElementById('ubicacion');
    let velViento = document.getElementById('velocidadViento');
    let dirViento = document.getElementById('direccionViento');
    let hum = document.getElementById('humedad');
    let precip = document.getElementById('precipitacion');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=097f43aaf868fbf2435e173fd5e03973&units=metric&lang=es`;
            console.log(url);

            fetch(url)
                .then(response => { return response.json(); })
                .then(data => {
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} ºc`;

                    let desc = data.weather[0].description;
                    TempDescripcion.textContent = desc;

                    TempUbicacion.textContent = data.name;
                    
                    hum.textContent = `Humedad: ${data.main.humidity} %`;

                    //precip.textContent = data.main.precipitation;

                    velViento.textContent = `${data.wind.speed} km/h`;
                    

                    // Llamada a la función para obtener la dirección del viento
                    dirViento.textContent = `Direccion: ${getDireccionViento(data.wind.deg)}`;

                    let iconsCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconsCode}.png`;

                    document.getElementById('icono').src = iconUrl;
                })
                .catch(error => {
                    console.log(error);
                });
                
        });
    }

    // Función para obtener la dirección del viento basada en los grados
    function getDireccionViento(grados) {
        const direccion = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

        // Asegúrate de que los grados estén en el rango [0, 360)
        grados = (grados % 360 + 360) % 360;

        // Calcula el índice correspondiente en la matriz de direcciones
        const index = Math.floor((grados + 22.5) / 45) % 8;

        return direccion[index];
    }
});
