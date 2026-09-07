# 📰 Lovely News — News Aggregator

A clean, responsive news aggregator web application that fetches real-time articles from around the world using the [NewsAPI](https://newsapi.org/). Users can browse by category or search for any topic they're interested in.

---

## 🖥️ Live Preview & Running the Project

> [!IMPORTANT]
> **A local server is REQUIRED.**  
> NewsAPI's Developer plan strictly blocks browser requests from `file:///` protocol (returning `HTTP 426 corsNotAllowed`). The application **must** be served from `http://localhost`.

### 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Swarajbabu/News-Aggregator.Project.git
   cd News-Aggregator.Project
   ```

2. **Add your NewsAPI key:**
   - Sign up for a free key at [https://newsapi.org/register](https://newsapi.org/register).
   - In `script.js`, ensure your API key is set at the top:
     ```javascript
     const API_KEY = "YOUR_API_KEY_HERE";
     ```

3. **Start a local development server:**

   **Using Python (Recommended):**
   ```bash
   python -m http.server 3000
   ```

   **Using Node.js:**
   ```bash
   npx serve .
   ```

   **Using VS Code:**
   Right-click `index.html` and select **"Open with Live Server"**.

4. **Open in your browser:**  
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port displayed by your server).

---

## ✨ Features

- 🔍 **Search & Enter Support** — Search for any topic or keyword by clicking the search button or pressing <kbd>Enter</kbd>.
- 📂 **Category Navigation** — Seamlessly filter by curated categories: Latest News, Sports, Education, Entertainment, and World.
- 🃏 **News Cards** — Displays article banner, title, source, publication date (localized to IST), and summary description.
- 🔗 **Full Article Redirection** — Click any card to open the original full article in a new tab.
- ⏳ **Loading State & Error Handling** — Live loading indicator and informative user-facing error messages if requests fail or rate limits are reached.
- 📱 **Responsive Design** — Fully optimized for mobile screens, tablets, and desktop displays.
- 🦶 **Footer** — Includes quick navigation links, trending topics, help resources, and social media links.

---

## 🗂️ Project Structure

```
News-Aggregator.Project/
│
├── index.html        # Main HTML layout (navbar, card container template, footer)
├── script.js         # JavaScript logic (NewsAPI fetching, DOM rendering, search, navigation)
├── style.css         # Main stylesheet (navbar, responsive cards, typography, footer)
├── value.css         # Base/global styling rules
├── lovely1822.png    # Project logo asset
└── Readme.md         # Documentation & setup guide
```

---

## ⚙️ How It Works

### API Integration

The application fetches articles using the **NewsAPI** `/v2/everything` endpoint:

```
https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}
```

### JavaScript Flow

| Function | Description |
|---|---|
| `fetchNews(query)` | Async call to NewsAPI with query encoding, loading indicator, and error handling |
| `bindData(articles)` | Clears the container, filters valid articles, and clones template cards into the DOM |
| `fillDataInCard(cardClone, article)` | Populates image, title, description, publication date, and click redirect |
| `onNavItemClick(id)` | Triggers fetch for the selected category and highlights the active navbar item |
| `reload()` | Refreshes the application when the logo is clicked |

### Default Behavior

On initial page load, the application automatically loads headline news for **"India"**:

```javascript
window.addEventListener("load", () => fetchNews("India"));
```

---

## 🎨 Styling Overview

- **CSS Variables** for consistent color schemes:
  ```css
  --primary-text-color: #183b56;
  --secondary-text-color: #577592;
  --accent-color: #2294ed;
  --accent-color-dark: #1d69a3;
  ```
- Fixed navbar with sticky positioning and subtle drop shadow.
- Responsive grid with smooth hover transitions (`transform: translateY(-2px)`).
- **Typography**: `Poppins` for headings and `Roboto` for body text via Google Fonts.
- Responsive four-column dark footer (`#24262b`) with circular social media buttons.

---

## 📦 Dependencies

| Dependency | Purpose | How Loaded |
|---|---|---|
| [NewsAPI](https://newsapi.org/) | Real-time news article data | REST API (`fetch`) |
| [Google Fonts](https://fonts.google.com/) | Poppins & Roboto typography | CSS `@import` |
| [Font Awesome](https://fontawesome.com/) | Search and social media icons | CDN `<script>` tag |

---

## ⚠️ Known Limitations

- **NewsAPI Developer Tier**: NewsAPI restricts browser calls on the free plan strictly to `localhost`. Deploying to a public domain (e.g. GitHub Pages, Vercel) requires either a paid plan or a backend server/serverless function acting as a proxy.
- **Client-side API Key**: In production, API keys should be handled on the backend to avoid exposure.

---

## 🔧 Roadmap & Improvements

- [x] Add user-friendly error and empty state feedback
- [x] Add loading indicator during network requests
- [x] Add keyboard Enter support in search input
- [x] Fix Sports category navbar active state sync
- [ ] Add pagination or infinite scrolling
- [ ] Backend proxy server to protect API keys for production deployment
- [ ] Dark mode toggle

---

## 📄 License

This project is open-source and available for educational purposes.

---

## 👤 Author

**Swaraj Babu**
- GitHub: [@Swarajbabu](https://github.com/Swarajbabu)
