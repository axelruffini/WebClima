window.addEventListener('load',()=>{
    let long
    let lat
    let temperaturaValor = document.getElementById('tempValor')
    let TempDescripcion = document.getElementById('descripcion')
    let TempUbicacion = document.getElementById('ubicacion')
    let velViento = document.getElementById('velocidadViento')
    let dirViento = document.getElementById('direccionViento')




    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=097f43aaf868fbf2435e173fd5e03973&units=metric&lang=es`
            console.log(url)

            fetch(url)
            .then(response => {return response.json()})
            .then(data => {                
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ºc`

                let desc = data.weather[0].description
                TempDescripcion.textContent = desc

                TempUbicacion.textContent = data.name 

                velViento.textContent = data.wind.speed

                dirViento.textContent = data.wind.direction 


                let iconsCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconsCode}.png`

                document.getElementById('icono').src = iconUrl;
                
            })
            .catch(error => {
                console.log(error)
            })
        })
    }
})