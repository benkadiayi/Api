const form = document.querySelector('#testDataForm')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    //grab form information(first way)
    let query_first = document.querySelector('#season')
    let query_last = document.querySelector('#round')

    

    console.log(event)
    console.log(`This came from the query selectors: ${query_first.value}, ${query_last.value}`)
    
    
    
})
const getData = async () => {
    let query_first = document.querySelector('#season')
    let query_last = document.querySelector('#round')
    let response = await axios.get(`https://ergast.com/api/f1/${query_first.value}/${query_last.value}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}


const DOM_elements = {
    f1_list : '.f1-list'
}


const create_list = (positionText, position, name, nationality, sponsor, points ) => {
    const html = `<a href = "#" class="list-group-item list-group-item-action list-group-item-light" id="${positionText}"> ${position} ${name} ${nationality} ${sponsor} ${points} </a>`;
    document.querySelector(DOM_elements.f1_list).insertAdjacentHTML('beforeend', html)
}
const load_data = async () => {
    const cars = await getData();
    
    cars.forEach(car => create_list (car.positionText, car.position , car.Driver.givenName, car.Driver.nationality, car.Constructors[0].name, car.points))
}
const clear_data = async () =>{
    document.querySelector(DOM_elements.f1_list).innerHTML= "";
}


