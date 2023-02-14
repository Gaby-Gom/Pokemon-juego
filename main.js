const CARDS=10;

//peticion de pokemones al api

for(let i=1; i<=CARDS; i++){
let id=getRandomId(150)
searchPokemonById(id)
}


function getRandomId(max){
  return  Math.floor(Math.random()*max)+1
}

let draggableElements=document.querySelector('.draggable-elements')
//console.log(draggableElements)
let droppableElements=document.querySelector('.droppable-elements')

let pokemonSearched=[];
let pokemonNames=[];



async function searchPokemonById(id){
    const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data=await res.json()
  
  
    //Arreglo con los pokemones
    pokemonSearched.push(data)

    //Arreglo con los nombres de los poke
    pokemonNames.push(data.name)
    pokemonNames=pokemonNames.sort(()=>Math.random()-0.5)
   // console.log(pokemonNames)
    
    //dibujando los poke

    draggableElements.innerHTML=''
    pokemonSearched.forEach(pokemon=>{
        draggableElements.innerHTML +=`
        <div class="pokemon">
        <img id="${pokemon.name}"  draggable="true" class="image"  src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
     </div>`

    })

//insertando
    droppableElements.innerHTML=''
    pokemonNames.forEach(name=>{
        droppableElements.innerHTML += `<div class="names">
        <p>${name}</p>
    </div>`
    })
    


    let pokemons=document.querySelectorAll('.image');
    //console.log(pokemons)
    pokemons=[...pokemons]
   // console.log(pokemons)
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event=>{
           event.dataTransfer.setData('text', event.target.id)
           
   })
})

let names=document.querySelectorAll('.names')

let wrongMsg=document.querySelector('.wrong')
let points =0;
names=[...names]

names.forEach(name=>{
    name.addEventListener('dragover', event=>{
            event.preventDefault()
           
    })
    name.addEventListener('drop', event=>{
      const draggableElementData=event.dataTransfer.getData('text');
      let pokemonElement=document.querySelector(`#${draggableElementData}`)
     

        if(event.target.innerText==draggableElementData){
            console.log("SI")
            points ++
            event.target.innerHTML=''
            event.target.appendChild(pokemonElement)
            wrongMsg.innerText=''

            if(points==CARDS){
                draggableElements.innerHTML=`<p class="win">Ganaste!</p>`

            }
           
        }else{
            console.log('NO')
        wrongMsg.innerText = 'Ups!'
         
        }

    })
})
}

