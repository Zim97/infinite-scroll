const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageArray = [];

const count = 30;
const apiKey = "Zl9REMQZF-N383BTn6-Snh1VBLy8gZ-x1BouzhMP7ro";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  console.log("images loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

function displayImages() {
  imagesLoaded = 0;
  totalImages = imageArray.length;
  imageArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //Create <img> for image
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", imageLoaded);
    // Put <img> inside of <a> and then put both inside Image-container Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    imageArray = await response.json();
    displayImages();
    // console.log(imageArray);
  } catch (error) {
    alert("failed to fetch photos");
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});

getImages();
