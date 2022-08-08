// select element HTML
const elPokemonList = document.querySelector('.pakemon__box-list')
const elPokemonTemp = document.querySelector('.pakemon__template').content
const elPokemonCount = document.querySelector('.count')
const elPokemonForm = document.querySelector('.pakemon__box-form')
const elFormHeight = document.querySelector('#height')
const elFormWeight = document.querySelector('#weight')
const elFormSelect = document.querySelector('#pakemon__select')
const elFormSorting = document.querySelector('#pakemon__sort')


const pakemonsArray = pokemons


// normalizedArray
const normalizedPokemons = pakemonsArray.map( function(item) {
    return {
        id: item.id,
        name: item.name.toString(),
        type: item.type,
        img: item.img,
        height: item.height,
        weight: item.weight
    }
})


//render pokemons 
function renderPokemon(array, wrapper) {

    elPokemonList.innerHTML = ''

    const pokemonFragment = document.createDocumentFragment();

    elPokemonCount.textContent = array.length;
    
    array.forEach(item => {
        const newTemplate = elPokemonTemp.cloneNode(true)

        const newItem = newTemplate.querySelector('.pakemon__box-list-item');
        
        newTemplate.querySelector('.pakemon__box-item-img').src = item.img,
        newTemplate.querySelector('.pakemon__box-item-heading').textContent = item.name,
        newTemplate.querySelector('.type').textContent = item.type,
        newTemplate.querySelector('.height').textContent = item.height,
        newTemplate.querySelector('.weight').textContent = item.weight,

        pokemonFragment.append(newItem)
        
    });
    wrapper.appendChild(pokemonFragment)
}

renderPokemon(normalizedPokemons, elPokemonList)

//  Get types
const typesArray = [];
function getTypes() {

    const typesFragment = document.createDocumentFragment();

    const typePokemons = normalizedPokemons.forEach(item => {
        const types = item.type

        types.forEach(item => {
            let typeArray = typesArray.includes(item)

            if(!typeArray) {
                typesArray.push(item) 
            }
        })
    })

}
getTypes()


// render Types
function renderTypes(array, wrapper) {

    const selectFragment = document.createDocumentFragment();

    array.sort().forEach(item => {
        
        const newOption = document.createElement('option')
        newOption.textContent = item
        newOption.value = item 
        selectFragment.appendChild(newOption)
    })
    wrapper.appendChild(selectFragment)
}
renderTypes(typesArray, elFormSelect)

//Form search btn
elPokemonForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formWeight = elFormWeight.value.trim();
    const formHeight = elFormHeight.value.trim();
    const formSelect = elFormSelect.value.trim();

    let isTrue 

    const filteredPokemon = normalizedPokemons.filter( item => {

        let selectValue = item.type.includes(formSelect)

        if(formSelect == "all") isTrue = true
        else  isTrue = selectValue

        let validation = formWeight <= item.weight && formHeight <= item.height && isTrue

        return validation
    })

    if(elFormSorting.value == 'height__low-high') {
        filteredPokemon.sort(function(a, b) {
           console.log(a.height - b.height);
        })
    }

    renderPokemon(filteredPokemon, elPokemonList)
})
