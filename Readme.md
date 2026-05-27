# 📰 Lovely News — News Aggregator

A clean, responsive news aggregator web application that fetches real-time articles from around the world using the [NewsAPI](https://newsapi.org/). Users can browse by category or search for any topic they're interested in.

---

## 🖥️ Live Preview

> Open `index.html` in your browser after setting up your API key (see [Getting Started](#-getting-started)).

---

## ✨ Features

- 🔍 **Search** — Search for any topic/keyword and get relevant news articles instantly
- 📂 **Category Navigation** — Browse curated categories: Latest News, Sports, Education, Entertainment, and World
- 🃏 **News Cards** — Each article is displayed as a card with an image, title, source, date, and description
- 🔗 **Read Full Article** — Click any card to open the full article in a new tab
- 📱 **Responsive Design** — Optimized layout for all screen sizes (mobile, tablet, desktop)
- 🦶 **Footer** — Includes quick links, help section, trending topics, and social media links

---

## 🗂️ Project Structure

```
News-Aggregator.Project/
│
├── index.html        # Main HTML structure (navbar, cards container, footer)
├── script.js         # JavaScript logic (API calls, DOM manipulation, search)
├── style.css         # Main stylesheet (navbar, cards, layout, responsive)
├── value.css         # Base/global background color override
└── lovely1822.png    # Project logo image
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A free API key from [https://newsapi.org](https://newsapi.org)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Swarajbabu/News-Aggregator.Project.git
   cd News-Aggregator.Project
   ```

2. **Get your NewsAPI key**

   - Go to [https://newsapi.org/register](https://newsapi.org/register)
   - Sign up for a free account
   - Copy your API key from the dashboard

3. **Add your API key**

   Open `script.js` and replace the existing key on line 1:

   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```

4. **Run the project**

   Simply open `index.html` in your browser — no build tools or server required.

   ```bash
   # Optional: use a local server to avoid CORS issues
   npx serve .
   # or
   python -m http.server 8000
   ```

---

## ⚙️ How It Works

### API Integration

The app uses the **NewsAPI** `/v2/everything` endpoint to fetch articles:

```
https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}
```

### JavaScript Flow

| Function | Description |
|---|---|
| `fetchNews(query)` | Makes an async API call using the given query string |
| `bindData(articles)` | Loops through articles and renders news cards to the DOM |
| `fillDataInCard(cardClone, article)` | Populates each card with image, title, description, source, and date |
| `onNavItemClick(id)` | Handles navigation category clicks and triggers a fetch |
| `reload()` | Reloads the page when the logo is clicked |

### Default Behaviour

On page load, the app automatically fetches news related to **"India"**:

```js
window.addEventListener("load", () => fetchNews("India"));
```

---

## 🎨 Styling Overview

### `style.css`
- **CSS Variables** for consistent theming:
  ```css
  --primary-text-color: #183b56;
  --secondary-text-color: #577592;
  --accent-color: #2294ed;
  --accent-color-dark: #1d69a3;
  ```
- Fixed **navbar** with shadow
- Responsive **card grid** (360px wide cards, flexbox wrapping)
- Hover animations on cards (`translateY(-2px)`)
- **Fonts**: Poppins (headings) + Roboto (body text) via Google Fonts

### `value.css`
- Sets a global `aliceblue` background color for the entire page.

### `style.css` (footer section)
- Dark footer (`#24262b`) with four columns: About, Help, Trending, Follow Us
- Social media icon buttons with circular hover effect
- Responsive: 2-column on tablet, 1-column on mobile

---

## 📦 Dependencies

| Dependency | Purpose | How Loaded |
|---|---|---|
| [NewsAPI](https://newsapi.org/) | Fetches news articles | REST API (fetch) |
| [Google Fonts](https://fonts.google.com/) — Poppins & Roboto | Typography | CSS `@import` |
| [Font Awesome](https://fontawesome.com/) | Icons (search button, social media) | CDN `<script>` tag |

> ⚠️ **Note:** The Font Awesome kit script tag in `index.html` uses a project-specific kit ID (`761110c0cd`). If you fork this project, you may want to replace it with your own free kit from [fontawesome.com](https://fontawesome.com/start).

---

## ⚠️ Known Limitations

- **NewsAPI Free Plan**: The free tier only allows requests from `localhost`. Deploying to a live server requires a paid plan.
- **No pagination**: All results are shown at once with no "load more" button.
- **No error handling UI**: If the API call fails or returns no results, no message is shown to the user.
- **API key exposed in client-side JS**: For production use, API calls should be proxied through a backend server to keep the key secret.

---

## 🔧 Possible Improvements

- [ ] Add error/empty state messages when no results are found
- [ ] Add loading spinner while fetching articles
- [ ] Paginate results or implement infinite scroll
- [ ] Move API key to a backend proxy or environment variable
- [ ] Add dark mode toggle
- [ ] Make the footer links functional

---

## 📄 License

This project is open-source and free to use for educational purposes.

---

## 👤 Author

**Swaraj Babu**
- GitHub: [@Swarajbabu](https://github.com/Swarajbabu)
