
<!-- ````markdown -->
# React Firebase + Google Drive Integration App

This is a React-based frontend app that integrates with:
- 🔥 **Firebase Firestore**
- 🔐 **Firebase Google Authentication**
- ☁️ **Google Drive API** (`appDataFolder` access)

---

## 🚀 How to Use This App

### 📦 1. Clone the Repository

```bash
git clone https://github.com/priangshudas/priDocs
cd priDocs
````

---

## 🔧 2. Firebase Setup

### ➤ Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add Project"**
3. Name your project (e.g., `pri-docs`)
4. **Turn on Analytics** (optional)
5. Finish setup

### ➤ Enable Firebase Authentication (Google)

1. In your Firebase dashboard, go to **Build → Authentication**
2. Click **Get Started**
3. Under **Sign-in Method**, enable **Google**

### ➤ Enable Firestore Database

1. Go to **Build → Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** or set rules as needed
4. Choose a **location near you or select a favorite server**
5. Goto Rules Section and add this rule 
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId}/files/{fileId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
6. Deploy  in production mode 

---

## ☁️ 3. Google Drive API Setup

### ➤ Enable Drive API for Your Firebase Project

1. Go to [https://console.developers.google.com](https://console.developers.google.com)
2. From top bar, **select your Firebase project** [must be match the project id of firebase]
3. Click **"Enable APIs and Services"**
4. Search for **Google Drive API**
5. Click **Enable**
6. Done
---

## ⚙️ 4. Environment Setup

### ➤ Install Dependencies

```bash
npm install
```

### ➤ Development Server

```bash
npm run dev
```

(or if using Create React App)

```bash
npm start
```

### ➤ Build for Production

```bash
npm run build
```

---

## 🛠 5. Configuration (Optional but Recommended)

1. Go to firebase and create a web app
2. After creation complete it will give you a js file copy only the firebase config and paste into 
the priDocs/src/firebase.js
3.  Here is the example . 

If you don't change the config data then you have not acess the backend server data 
```js
//...
//...
//--change start here--
const firebaseConfig = {
  apiKey: "AIzaSyCMXLH1zrlAGwaqCvYcKWbi4CfuVl2zfSc",
  authDomain: "pri-docs.firebaseapp.com",
  projectId: "pri-docs",
  storageBucket: "pri-docs.firebasestorage.app",
  messagingSenderId: "350345140346",
  appId: "1:350345140346:web:9b87397caa22871c4903c3",
  measurementId: "G-DJT6JCZ1GC"
};
//--change end here--
//...
//...
```

---

## ❓ Got Trouble?

If you run into any issues or have questions, feel free to [open an issue](https://github.com/priangshudas/priDocs/issues) on this repository.

---

## 💬 Thanks!

Thanks for using this app! Your feedback and contributions are welcome.

