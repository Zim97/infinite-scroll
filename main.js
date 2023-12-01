const count = 10;
const apiKey = 'Zl9REMQZF-N383BTn6-Snh1VBLy8gZ-x1BouzhMP7ro';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count${count}`;

async function getImages() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch(error) {
        alert("failed to fetch photos");
    }
}
