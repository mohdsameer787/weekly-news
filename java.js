const apikey = "18675a30b7714c94ba3a3072c49e9a94";
const url = "https://newsapi.org/v2/everything?q=";
let count = 0;

window.addEventListener("load", () => {
    fetchapi("india");
    search();
});

async function fetchapi(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${apikey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.articles);
        binddata(data.articles);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function binddata(articles) {
    const cardContainer = document.getElementById("card-container");
    const cardTemplate = document.getElementById("temp");
    cardContainer.innerHTML = ''; // Clear existing content

    articles.forEach(article => {
        if (!article.urlToImage) return;
        let cardClone = cardTemplate.content.cloneNode(true);
        
        const imgElement = cardClone.querySelector('img');
        imgElement.src = article.urlToImage;

        const titleElement = cardClone.querySelector('#h3');
        titleElement.innerHTML = article.title;

        const dateElement = cardClone.querySelector('h6');
        dateElement.textContent = new Date(article.publishedAt).toLocaleDateString() || "No date available";

        const descriptionElement = cardClone.querySelector('p');
        descriptionElement.textContent = article.description || "No description available";

        cardContainer.appendChild(cardClone);
    });
}

function search() {
    let submitButton = document.querySelector('.button');
    let inputField = document.getElementById('text1');
    submitButton.addEventListener('click', () => {
        let query = inputField.value;
        if (!query) return;
        fetchapi(query);
        count = count + 1;
        console.log(count);
    });
}
