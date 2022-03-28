// write your code here


function fetchAllRamen() {
    fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(data => {
            displayDetails(data[0])
            postRamenToNav(data)
        })
}

function appendRamenImage(dish) {
    const ramenMenu = document.querySelector("#ramen-menu")
    const ramenPic = document.createElement('img')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Remove Menu Item"
    deleteBtn.addEventListener('click', ()=> {
        // Must delete all instances of item deleted...
        ramenPic.remove()
        deleteBtn.remove()
        deleteRamen(dish)
    })
    ramenPic.src = dish.image
    ramenPic.addEventListener("click", () => displayDetails(dish))
    // ramenPic.appendChild(deleteBtn)
    ramenMenu.append(ramenPic, deleteBtn)
}

function postRamenToNav(data) {
    data.forEach(appendRamenImage)
}

function displayDetails(dish) {
    // console.log(dish)
    const mainSelection = document.querySelector("#ramen-detail")
    const image = document.querySelector(".detail-image")
    image.src = dish.image
    const name = document.querySelector(".name")
    name.innerHTML = dish.name
    const restaurant = document.querySelector(".restaurant")
    restaurant.innerText = dish.restaurant
    const rating = document.querySelector("#rating-display")
    rating.innerText = dish.rating
    const comment = document.querySelector("#comment-display")
    comment.innerText = dish.comment
    mainSelection.innerText = ""
    mainSelection.append(image, name, restaurant)
    updateRamen(dish)
}

const form = document.querySelector("#new-ramen")
form.addEventListener("submit", (e) => { createRamen(e, form) })

function createRamen(e, form) {
    e.preventDefault()
    const name = e.target[0].value
    const restaurant = e.target[1].value
    const image = e.target[2].value
    const rating = e.target[3].value
    const comment = e.target[4].value
    e.target[0].value = ""
    e.target[1].value = ""
    e.target[2].value = ""
    e.target[3].value = ""
    e.target[4].value = ""
    console.log(name, restaurant, image, rating, comment)
    const newDish = { name, restaurant, image, rating, comment }
    postRamen(newDish)
    appendRamenImage(newDish)
}

function updateRamen(dish) {
    const editForm = document.querySelector('#edit-ramen')
    // console.log(dish)
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        dish.rating = e.target[0].value
        dish.comment = e.target[1].value
        e.target[0].value = ""
        e.target[1].value = ""
        displayDetails(dish)
        patchRamen(dish)
    })
}

function patchRamen (dish)
    {fetch(`http://localhost:3000/ramens/${dish.id}`, {
    'method': 'PATCH',
    'headers': {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
    "body": JSON.stringify({
        name: dish.name, image: dish.image, rating: dish.rating, comment: dish.comment, restaurant: dish.restaurant
    })
})
.then(resp => resp.json())
.then(data => console.log(data))}

function postRamen (newDish)
    {fetch(`http://localhost:3000/ramens/`, {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
    "body": JSON.stringify(newDish)
})
.then(resp => resp.json())
.then(data => console.log(data))}

function deleteRamen (dish)
    {fetch(`http://localhost:3000/ramens/${dish.id}`, {
    'method': 'DELETE',
    'headers': {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
    'body': JSON.stringify({dish})
})
.then(resp => resp.json())
.then(data => console.log(data))}



document.addEventListener("DOMContentLoaded", () => {
    // See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
    fetchAllRamen()
})