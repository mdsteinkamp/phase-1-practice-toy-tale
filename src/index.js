let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//takes toy name & image input, assigns to an obj to send to postNewToy fn to POST to json server
document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()
  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  postNewToy(toyObj)
}

//fetches toys from json server
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then((resp) => resp.json())
  .then((toys) => renderToys(toys))
}

//renders toys from json data and places on DOM
function renderToys(toys){
  toys.forEach(toy => {
    const card = document.createElement('div')
    card.className = 'card'
    const toyCollection = document.querySelector('#toy-collection')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    h2.textContent = `${toy.name}`;
    img.src = `${toy.image}`
    img.style = 'height: 100%; width: 100%; object-fit: contain'
    img.class = 'toy-avatar'
    p.innerText = '0 Likes'
    btn.class = "like-btn"
    btn.id = `#{toy.id}`
    btn.textContent = "Like ❤️"
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)
    toyCollection.appendChild(card);
  })
}

function postNewToy (toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  })
  .then((resp) => resp.json())
  .then((toys) => renderToys(toys))

};