let id = new URLSearchParams(window.location.search).get("id");
const body = document.querySelector("body");

fetch("http://localhost:3000/All/" + id)
  .then((response) => response.json())
  .then((data) => {
    body.innerHTML = `

        <div class="item2">
        <img src="${data.image}" alt="">
        <span>${data.name}</span>
        <h5>${data.means}</h5>
        <p>${data.destriction}</p>
        </div>
        `;
  });
