# 📚 Gemini Frontend Clone

A demo conversational AI chat application inspired by Google Gemini.
Built with React, Redux Toolkit, Tailwind CSS, and simulates OTP login, chatroom management, AI-style messaging, image uploads, dark/light theming, accessibility, and more.

---

## 🔗 Live Demo

[Try it out 🚀](https://gemini-dashboard.netlify.app/)

---

## 🚀 Tech Stack

- **Framework**: React (Create React App)  
- **State Management**: Redux Toolkit  
- **Form Validation**: React Hook Form + Zod  
- **Styling**: Tailwind CSS  
- **Routing**: React Router v6  
- **Icons**: react-icons  
- **Deployment**: Vercel or Netlify  
- **Data Persistence**: localStorage  

---

## ⚙️ Setup & Run

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/gemini-frontend-clone.git
   cd gemini-frontend-clone
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start development server**  
   ```bash
   npm start
   ```

   App will open at http://localhost:3000/

4. **Build for production**  
   ```bash
   npm run build
   ```

---

## 📁 Folder Structure

```
gemini-frontend-clone/
├── public/                # Static assets (favicon, index.html)
├── src/
│   ├── api/               # Axios client + REST countries helper
│   ├── components/        # Reusable UI components (ChatBubble, ChatInput…)
│   ├── features/          # Redux slices & thunks (auth, chatrooms, messages)
│   ├── hooks/             # Custom React hooks (useDebounce, useInfiniteScroll…)
│   ├── pages/             # Route-level pages (Login, Signup, Dashboard, Chatroom)
│   ├── store/             # Redux store setup
│   ├── utils/             # Utility functions (throttle, formatDate, base64)
│   ├── App.jsx            # Main app with routes
│   └── index.js           # Entry point
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS setup
├── package.json           # Scripts & dependencies
└── README.md              # This documentation
```

---

## ✨ Features

### 🔐 Authentication

- OTP Login/Signup with country‑code selection  
- Country codes fetched from [restcountries.com]  
- Simulated OTP send/verify via `setTimeout`  
- Form validation with React Hook Form + Zod  

### 🧭 Dashboard

- List of chatrooms  
- Create/Delete chatrooms with confirmation toasts  
- Debounced search bar to filter by title  

### 💬 Chatroom Interface

- User & AI messages with timestamps  
- Typing indicator (“Gemini is typing…”)  
- Simulated AI replies after delay + throttling  
- Auto‑scroll to latest message  
- Reverse infinite scroll to load older messages (dummy data)  
- Pagination (20 messages per page)  
- Image upload (base64 preview)  
- Copy‑to‑clipboard on message hover  

### 🌍 Global UX

- Mobile responsive via Tailwind’s breakpoints  
- Dark/light mode toggle (persisted in localStorage)  
- Loading skeletons for chatrooms & messages  
- Toast notifications for key actions  
- Keyboard accessibility for all controls  

---

## 🛠 Implementation Details

### ⏱ Throttling & Debounce

- `useDebounce` hook for search input and API calls  
- `useThrottledTimeout` for AI response delay  

### 📦 Pagination & Infinite Scroll

- Redux state stores `byPage` object  
- `useInfiniteScroll` hook watches scroll position at top to load older pages  

### ✅ Form Validation

- Zod schemas define required/format rules  
- React Hook Form + zodResolver provides error messages  

### 🖼 Image Upload

- FileReader → Base64 string  
- Preview shown immediately in UI  
- Latest upload persisted to `localStorage` per chatroom  

### 🌙 Dark Mode

- CSS `dark:` variants in Tailwind  
- Class toggle on `<html>` via DarkModeToggle or sidebar button
