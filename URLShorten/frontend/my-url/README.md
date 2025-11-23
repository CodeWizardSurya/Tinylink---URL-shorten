Here is a **professional README.md** you can **copy–paste directly** to your GitHub repo.
It explains **your exact code**, **your flow**, **your endpoints**, and **your project purpose** clearly and professionally.

---

# 🚀 TinyLink – URL Shortener

A simple and fast URL shortening application built using **Node.js**, **Express**, **MongoDB**, and **React**.
This project lets users create short URLs, view analytics (click count), and manage all their generated links.

---

## 📌 Features

* 🔗 **Create Short URLs**
* 👀 **Track Clicks** for each shortened URL
* 📅 **Stores created time** and **last clicked time**
* 🗑️ **Delete URL entries**
* 📊 **View statistics** (long URL, total clicks)
* ⚛️ **React-based Frontend** with clean UI
* 🌐 **REST API with Express**

---

## 🏗️ Project Structure

```
TinyLink/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── urlRoutes.js
│   └── controllers/
│       └── urlController.js
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Stats.jsx
    │   ├── components/
    │   │   └── LinkCard.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── App.jsx
```

---

# 🔧 Backend Overview (Node.js + Express)

## 📌 1. URL Schema (MongoDB Model)

```js
const UrlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});
```

### **What this does**

* Stores the **original long URL**
* Generates/uses a **unique short code**
* Tracks how many times the link was clicked
* Saves **created time** and **last clicked time**

---

## 📌 2. API Endpoints

### ▶️ **Create a Short URL**

```
POST /api/links
```

Request:

```json
{
  "url": "https://example.com",
  "code": "surya123"
}
```

Response:

```json
{
  "message": "Short link created",
  "shortUrl": "http://localhost:5000/surya123"
}
```

---

### ▶️ **Get All Links**

```
GET /api/links
```

Returns an array of all stored short URLs.

---

### ▶️ **Get Statistics for a Short Code**

```
GET /api/links/:code
```

Returns:

```json
{
  "longUrl": "https://google.com",
  "clicks": 5
}
```

---

### ▶️ **Delete a Short Link**

```
DELETE /api/links/:code
```

---

### ▶️ **Redirect to Original URL**

```
GET /:code
```

* Increases `clicks`
* Updates `lastClicked`
* Redirects to `longUrl`

---

# 🎨 Frontend Overview (React)

## 📌 1. `api.js` – API Service Layer

Handles all API calls:

```js
export async function createLink(longUrl, code) { ... }
export async function getLinks() { ... }
export async function getStats(code) { ... }
export async function deleteLink(code) { ... }
```

✔ Makes frontend cleaner
✔ All REST operations from a single file

---

## 📌 2. Stats Page (`Stats.jsx`)

```js
const { code } = useParams();
const [stats, setStats] = useState(null);

useEffect(() => { loadStats(); }, []);

async function loadStats() {
  const data = await getStats(code);
  setStats(data);
}
```

### **What it does**

* Reads the `shortCode` from the URL
* Fetches stats from backend
* Shows:

  * Long URL
  * Total clicks
* Has a Back button to return to dashboard

---

# ⚙️ Installation & Setup

## 📍 Backend Setup

```bash
cd backend
npm install
npm start
```

Create `.env`:

```
MONGO_URI=your-mongodb-url
PORT=5000
```

---

## 📍 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🧠 How the Project Works (Workflow)

1. User enters a **long URL** and optional **custom short code**
2. Frontend sends it to backend → `/api/links`
3. Backend saves it in MongoDB
4. Dashboard shows all created URLs
5. When someone clicks the short link:

   * Backend increments `clicks`
   * Redirects to original `longUrl`
6. Statistics page shows URL analytics

---

# 📝 Tech Stack

* **Node.js**
* **Express**
* **MongoDB (Mongoose)**
* **React + Vite**
* **TailwindCSS** (optional)
* **Fetch API**

---

# 🙌 Author

**Surya K**
Full Stack Developer

