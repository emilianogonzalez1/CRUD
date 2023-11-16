const URL = 'https://654a38ebe182221f8d52c154.mockapi.io/users';
const idSearch = document.querySelector('.id-buscar');
const resultados = document.querySelector('#results')
const btn1 = document.querySelector('#btnGet1')

idSearch.addEventListener('input', ()=>{

    const URL_ID = `https://654a38ebe182221f8d52c154.mockapi.io/users/${idSearch.value}`;

    if(idSearch.value>0){
        fetch(URL_ID)
        .then(response => response.json())
        .then(data=>{
            console.log(URL_ID)
            
            btn1.addEventListener('click', ()=>{
                resultados.innerHTML = `
                <div>${data.id}</div>
                <div>${data.name}</div>
                <div>${data.lastname}</div>
                ` 
            })
    } )
    }
    else{

            btn1.addEventListener('click', ()=>{
                resultados.innerHTML = `
                <div></div>
                <div></div>
                <div></div>
                ` 
            })
    }

})

btn1.addEventListener('click', ()=>{
if(idSearch.value == ''){
    fetch(URL)
    .then(response => response.json())
    .then(datos => {
        
            resultados.innerHTML = `
            <div>${datos[0].id}</div>
            <div>${datos[0].name}</div>
            <div>${datos[0].lastname}</div>

            <div>${datos[1].id}</div>
            <div>${datos[1].name}</div>
            <div>${datos[1].lastname}</div>

            <div>${datos[2].id}</div>
            <div>${datos[2].name}</div>
            <div>${datos[2].lastname}</div>

            <div>${datos[3].id}</div>
            <div>${datos[3].name}</div>
            <div>${datos[3].lastname}</div>
            
            <div>${datos[4].id}</div>
            <div>${datos[4].name}</div>
            <div>${datos[4].lastname}</div>

            ` 
        
    })
}
})