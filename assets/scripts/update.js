let id = new URLSearchParams(window.location.search).get("id");
let sec2Boxs = document.getElementById('sec2Boxs');
let name  = document.querySelector('#name');
let category = document.querySelector('.category');
let about = document.querySelector('.about');
let modalImage = document.querySelector('.modalImage');
let categoryForm = document.querySelector('.category-form');
let submit = document.querySelector('.submit');
let file = document.querySelector('input[type="file"]');

fetch(`http://localhost:3000/All/${id}`)
.then(res => res.json())
.then(data => {
    modalImage.src = data.image
    name.value = data.name;
    category.value = data.means;
    about.value = data.destriction;
})

file.addEventListener('input', (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            modalImage.src = reader.result;
        }
    }
})

categoryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    axios.put(`http://localhost:3000/All/${id}`, {
        image: modalImage.src,
        name: name.value,
        means: category.value,
        destriction: about.value
    })
    .then(res=>{
        window.location="../index.html"
    })
})