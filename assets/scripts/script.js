const forElem = document.querySelector(".for");
const loadBtn = document.querySelector(".loadBtn");
const search = document.querySelector(".search");
let page = 1;
const arr = [];

function getDataJson() {
  fetch(`http://localhost:3000/All?_page=${page}&_limit=3`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arr.push(data);
      data.forEach((element) => {
        forElem.innerHTML += `
        <div class="item2">
        <img src="${element.image}" alt="">
        <span>${element.name}</span>
        <h5>${element.means}</h5>
        <p>${element.destriction}</p>
        <button class = "deafaultBtnStyle"><a href = "./details.html?id=${element.id}">View Details</a></button>
        <button class = "deafaultBtnStyle" onclick = "boxsDelete(${element.id})")>Delete</button>
        <button class = "deafaultBtnStyle"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
        <i onclick="addToFav(${element.id})"  class="fa-regular fa-heart"></i>
       </div>

            `;
      });
      return arr.flat();
    })
    .then((data) => {
      console.log(data);
      search.addEventListener("input", (event) => {
        let value = event.target.value.toLowerCase();

        if (value !== "") {
          const filteredData = data.filter((s) => {
            return s.name.toLowerCase().includes(value);
          });

          forElem.innerHTML = "";

          filteredData.forEach((element) => {
            forElem.innerHTML += `
                       
            <div class="item2">
        <img src="${element.image}" alt="">
        <span>${element.name}</span>
        <h5>${element.means}</h5>
        <p>${element.destriction}</p>
        <button class = "deafaultBtnStyle"><a href = "./details.html?id=${element.id}">View Details</a></button>
        <button class = "deafaultBtnStyle" onclick = "boxsDelete(${element.id})")>Delete</button>
        <button class = "deafaultBtnStyle"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
        <i onclick="addToFav(${element.id})"  class="fa-regular fa-heart"></i>

       </div>

            `;
          });
        } else {
          forElem.innerHTML = "";
          data.forEach((element) => {
            forElem.innerHTML += `
                        
            <div class="item2">
            <img src="${element.image}" alt="">
            <span>${element.name}</span>
            <h5>${element.means}</h5>
            <p>${element.destriction}</p>
                 <button class = "deafaultBtnStyle"><a href = "./details.html?id=${element.id}">View Details</a></button>
         <button class = "deafaultBtnStyle" onclick = "boxsDelete(${element.id})")>Delete</button>
         <button class = "deafaultBtnStyle"><a href = "./update.html?id=${element.id}" target = "_blank">Update</a></button>
         <i onclick="addToFav(${element.id})"  class="fa-regular fa-heart"></i>

           </div>

            `;
          });
        }
      });
    });
}

function boxsDelete(id) {
  axios
    .delete("http://localhost:3000/All/" + id)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting item: ", error);
    });
}

function addToFav(id) {
  axios
    .get("http://localhost:3000/All/" + id)
    .then((res) => {
      axios.post("http://localhost:3000/favorites", res.data).catch((error) => {
        console.error("Error adding to favorites: ", error);
      });
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

loadBtn.addEventListener("click", () => {
  page++;
  getDataJson();
});

getDataJson();

let avatar = document.querySelector(".avatar");
let fimage = document.querySelector('input[type="file"]');

fimage.addEventListener("input", (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      avatar.src = reader.result;
    };
  }
});

addData.addEventListener("click", function () {
  fetch("http://localhost:3000/All", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: avatar.src,
      name: fname.value,
      means: email.value,
      destriction: about.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data gonderildi" + data);
    });
});
