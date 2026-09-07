const API_KEY = "66c96c590ca843a79c3d92d53a645e8d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// Fallback mirror mapping for categories when NewsAPI blocks browser requests (e.g. file:/// or non-localhost)
const FALLBACK_CATEGORY_MAP = {
    "india": "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json",
    "latest news": "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json",
    "sports": "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json",
    "education": "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json",
    "entertainment": "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json",
    "world": "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json",
    "technology": "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json",
    "business": "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json",
    "science": "https://saurav.tech/NewsAPI/top-headlines/category/science/in.json",
    "health": "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json",
};

async function fetchFromFallback(query) {
    const key = query.toLowerCase().trim();
    const endpoint = FALLBACK_CATEGORY_MAP[key] || "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json";

    const res = await fetch(endpoint);
    const data = await res.json();

    if (data.status === "ok" && Array.isArray(data.articles)) {
        if (!FALLBACK_CATEGORY_MAP[key]) {
            const filtered = data.articles.filter((article) =>
                (article.title && article.title.toLowerCase().includes(key)) ||
                (article.description && article.description.toLowerCase().includes(key))
            );
            return filtered.length > 0 ? filtered : data.articles;
        }
        return data.articles;
    }
    return [];
}

async function fetchNews(query) {
    const cardsContainer = document.getElementById("cards-container");
    if (cardsContainer) {
        cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; font-size: 1.1rem; color: #666;">Loading latest articles...</div>';
    }

    try {
        let articles = null;

        // First attempt: direct NewsAPI request
        try {
            const res = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
            const data = await res.json();

            if (data.status === "ok" && Array.isArray(data.articles)) {
                articles = data.articles;
            } else if (data.code === "corsNotAllowed" || data.status === "error") {
                console.warn("NewsAPI browser restriction active. Using news mirror fallback...", data.message);
                articles = await fetchFromFallback(query);
            }
        } catch (netErr) {
            console.warn("Direct network call failed (likely CORS or file://). Using fallback...", netErr);
            articles = await fetchFromFallback(query);
        }

        if (articles && articles.length > 0) {
            bindData(articles);
        } else {
            cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; color: #666;">No articles found for this topic.</div>';
        }
    } catch (error) {
        console.error("Error loading news:", error);
        cardsContainer.innerHTML = '<div style="text-align:center; padding: 2rem; width: 100%; color: #d9534f;">Failed to load news articles.</div>';
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