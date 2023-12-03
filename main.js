const allPuppyDiv = document.querySelector(".allPuppy")
const singlePuppyDiv = document.querySelector(".singlePuppy")
let puppies = []

window.addEventListener("hashchange", () => {
    //everytime there is a hashchange, the page is refreshed
    //the hash changes between different puppies and the all list
    render()
})

async function fetchPuppies() {
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2310-ftb-et-web-ft/players")
    const data = await response.json()
    //have to do .data.players since players is the array of info, not data
    puppies = data.data.players
    console.log(puppies)
    //ensuring the array was saved to correctly
    render()
}

async function render() {
    
    const puppyList = puppies.map((puppy) => {
        //<a> changes the hash in the url
        return `<a href=#${puppy.name} class="puppyYeah"> ${puppy.name} </a>`
    })
    
    const name = window.location.hash.slice(1)
    //slice is to remove the # in front of the name and store as a value

    const singlePuppy = puppies.find((puppy) => {
        return puppy.name === name
    })
    //find() searches for the puppy then checks to ensure it is the correct one based on name
    
    if (singlePuppy) {
        allPuppyDiv.innerHTML = ""
        singlePuppyDiv.innerHTML = `
        <div class="singlePuppyImg">
            <img src=${singlePuppy.imageUrl} />
        </div>
        <div class="singlePuppyInfo">
            <h3> Welcome ${singlePuppy.name}!</h3>
            <p style="margin-top: -0.5%;"> Breed: ${singlePuppy.breed}<p>
            <p style="margin-top: -3%;"> Status: ${singlePuppy.status}<p>
            <a href=# class="backButtonLink"><button class="backButton">Back to all puppies</button></a>
        </div>
        `
    } else {
        allPuppyDiv.innerHTML = `<div class="puppyContainer"> ${puppyList.join("")}</div>`
        singlePuppyDiv.innerHTML = ""
    }
    
}

fetchPuppies()