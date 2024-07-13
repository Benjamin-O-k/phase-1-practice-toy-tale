let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

let form = document.querySelector('form')
form.addEventListener('submit',(e) =>{
  e.preventDefault()
  addToys()
});

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toy => fetchToys(toy))

function fetchToys (toy){
  toy.forEach(toy =>{
      let toydiv = document.querySelector("#toy-collection")
      let fetchtoy = document.createElement('div')
      fetchtoy.className = 'card'
      fetchtoy.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn" id="[toy_id]">Like ❤️</button>
      `
      toydiv.appendChild(fetchtoy)
})}

function addToys(){
  const toyName = document.querySelector(".input-text").value;
  const toyImage = document.querySelector(".input-text").value;
  const newToy = {
    'name': toyName,
    'image': toyImage,
    'likes': 0
    };
}
fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(newToy),
  })
  .then(response => response.json())
  .then(toy => {
    console.log(toy);
    const toydiv = document.querySelector("#toy-collection");
    let fetchtoy = document.createElement('div');
    fetchtoy.className = 'card';
    fetchtoy.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    toydiv.appendChild(fetchtoy);
  });

//add like=
const likeButton = document.querySelector('.like-btn')
likeButton.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const toyId = event.target.id
      fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ likes: event.target.likes + 1 }),
    })
    .then(response => response.json())
    .then(toy => {
      event.target.parentNode.querySelector('p').textContent = toy.likes
      console.log(toy)
    })
  })
})
