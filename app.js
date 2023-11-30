const auth = "fFw19LW51YsIhAh91GPeLebyEjzPqD4q7PAyK30Ed7UV9GiFUfuTFyBj";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  searchPhotos(searchValue);
});

function updateInput(e) {
  e.preventDefault();
  searchValue = e.target.value;
}

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "app;ication/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "app;ication/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
