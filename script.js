const API_KEY = "66c96c590ca843a79c3d92d53a645e8d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const cardsContainer = document.getElementById("cards-container");
    if (cardsContainer) {
        cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; font-size: 1.1rem; color: #666;">Loading latest articles...</div>';
    }

    try {
        const res = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
        const data = await res.json();

        if (data.status === "ok" && Array.isArray(data.articles)) {
            if (data.articles.length === 0) {
                cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; color: #666;">No articles found for this topic.</div>';
                return;
            }
            bindData(data.articles);
        } else {
            console.error("NewsAPI Error:", data);
            const errorMsg = data.message || "Unable to fetch news.";
            cardsContainer.innerHTML = `<div style="text-align:center; padding: 2rem; width: 100%; color: #d9534f; font-weight: 500;">${errorMsg}</div>`;
        }
    } catch (error) {
        console.error("Network or Fetch Error:", error);
        cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; color: #d9534f;">Failed to load news. Please ensure the local server is running at <code>http://localhost:3000</code>.</div>';
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title || "";
    newsDesc.innerHTML = article.description || "";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    newsSource.innerHTML = `${article.source?.name || "News"} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        if (article.url) {
            window.open(article.url, "_blank");
        }
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav?.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

searchText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});