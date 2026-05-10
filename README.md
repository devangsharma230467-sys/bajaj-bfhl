# Bajaj Finserv Health Challenge (BFHL)

> **Candidate:** Devang Sharma  
> **Email:** devangsharma230467@acropolis.in  
> **Roll Number:** DEVANG230467

---

## 📁 Project Structure

```
bajaj/
├── backend/
│   ├── routes/
│   │   └── bfhl.js          # GET & POST /bfhl route handlers
│   ├── utils/
│   │   └── helpers.js        # Helper functions (prime, base64, MIME, etc.)
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # React entry point
│   ├── index.html            # HTML template (title: DEVANG230467)
│   ├── vite.config.js        # Vite configuration
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App opens on `http://localhost:5173`

---

## 📡 API Endpoints

### `GET /bfhl`

Returns the operation code.

**Response:**
```json
{
  "operation_code": 1
}
```

### `POST /bfhl`

Processes a data array and optional Base64 file.

**Request Body:**
```json
{
  "data": ["A", "1", "b", "3", "z", "5", "7"],
  "file_b64": "<BASE64_STRING>"
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "devang_sharma_10052026",
  "email": "devangsharma230467@acropolis.in",
  "roll_number": "DEVANG230467",
  "numbers": ["1", "3", "5", "7"],
  "alphabets": ["A", "b", "z"],
  "highest_lowercase_alphabet": ["z"],
  "is_prime_found": true,
  "file_valid": false,
  "file_mime_type": null,
  "file_size_kb": null
}
```

---

## 🧪 Sample Test Cases

### Test 1 — Basic Data
```json
{ "data": ["A", "1", "b"] }
```

### Test 2 — With Prime Numbers
```json
{ "data": ["M", "2", "z", "11", "a", "4"] }
```

### Test 3 — Numbers Only
```json
{ "data": ["1", "2", "3", "4", "5"] }
```

### Test 4 — Alphabets Only
```json
{ "data": ["a", "B", "c", "D"] }
```

### Test 5 — With Base64 File
```json
{
  "data": ["A", "1"],
  "file_b64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}
```

---

## 🌐 Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repository.
2. Go to [render.com](https://render.com) → New → **Web Service**.
3. Connect your GitHub repo.
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add Environment Variables:
   - `PORT` = `5000`
   - `USER_FULL_NAME` = `devang_sharma`
   - `USER_EMAIL` = `devangsharma230467@acropolis.in`
   - `ROLL_NUMBER` = `DEVANG230467`
6. Deploy!

### Frontend → Vercel

1. Push the `frontend/` folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → New Project.
3. Import the repository.
4. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-render-backend-url.onrender.com`
6. Deploy!

---

## 🔧 Environment Variables

### Backend (`.env`)
| Variable         | Value                                |
|------------------|--------------------------------------|
| PORT             | 5000                                 |
| USER_FULL_NAME   | devang_sharma                        |
| USER_EMAIL       | devangsharma230467@acropolis.in      |
| ROLL_NUMBER      | DEVANG230467                         |

### Frontend (Vercel Environment)
| Variable       | Value                                          |
|----------------|-------------------------------------------------|
| VITE_API_URL   | https://your-render-backend-url.onrender.com    |

---

## ✅ Features

- [x] GET /bfhl returns operation_code: 1
- [x] POST /bfhl processes data array
- [x] Extracts numbers and alphabets
- [x] Finds highest lowercase alphabet
- [x] Detects prime numbers
- [x] Validates Base64 files
- [x] Detects MIME type from magic bytes
- [x] Calculates file size in KB
- [x] Dynamic user_id with current date
- [x] JSON input validation on frontend
- [x] Multiselect dropdown filter
- [x] Modern dark-themed responsive UI
- [x] Loading states and error handling
- [x] Browser tab title: DEVANG230467

---

## 👤 Author

**Devang Sharma**  
Email: devangsharma230467@acropolis.in  
Roll Number: DEVANG230467
