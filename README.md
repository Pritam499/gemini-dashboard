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
## 📁 Project Images
### 🔐 Login Page
<img width="1077" height="753" alt="login page" src="https://github.com/user-attachments/assets/d32c0e3e-eefd-483a-9681-9e747bcd920f" />

### 🔐 Verify Otp Page
<img width="900" height="708" alt="verify otp" src="https://github.com/user-attachments/assets/573d416a-26e0-4141-b05c-62fba0674cba" />

### 🔐 Dashboard without sidebar - Dark Theme
<img width="1918" height="908" alt="dashboard without sidebar - dark theme" src="https://github.com/user-attachments/assets/68fdc9d4-4ffb-4392-a67a-119f2377e108" />

### 🔐 Dashboard with sample chats and sidebar - Light Theme
<img width="1918" height="910" alt="dashboard with sample chat sidebar - light theme" src="https://github.com/user-attachments/assets/4a8b3a1e-951a-4e6e-94e8-777f154c17fe" />

### 🔐 Mobile view - Dark Theme
<img width="308" height="603" alt="mobile view darkmode" src="https://github.com/user-attachments/assets/ade69960-e424-49cc-9130-1222d16dab45" />

### 🔐 Mobile view with Chats and Sidebar - Light Theme
<img width="288" height="596" alt="mobile view with chats and sidebar with light theme" src="https://github.com/user-attachments/assets/fa112267-cc19-4412-9d6b-e93c954c34f1" />

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
