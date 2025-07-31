
# 🛍️ Ecommerce Clone

This is a simple **E-commerce web application** built with **React** that allows users to browse products, add them to the cart (only if logged in), and write product reviews. The app uses **Firebase Authentication** for login/registration and **LocalStorage** to persist cart and reviews.

---

## 🚀 Features

* 🔐 **User Authentication** (Login & Register using Firebase)
* 🛒 **Add to Cart** (only for logged-in users)
* 💬 **Customer Reviews** (stored in LocalStorage per product)
* 📦 **Product Listing with Modal View**
* 🖼️ **Responsive UI** built with Bootstrap

---

## 🛠️ Technologies Used

* **React JS** (Frontend Framework)
* **Firebase Authentication** (User login & registration)
* **Bootstrap 5** (Styling)
* **LocalStorage** (Cart & Reviews Persistence)

---

## 📂 Project Structure

```
ecommerce-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── ProductCard.js
│   │   └── Login.js
│   ├── App.js
│   ├── index.js
│   └── firebase.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/codewithsam-git/ecommerce-clone.git
   cd ecommerce-clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   * Create a Firebase project on [Firebase Console](https://console.firebase.google.com)
   * Add your Firebase config inside `firebase.js`:

     ```javascript
     import { initializeApp } from "firebase/app";
     import { getAuth } from "firebase/auth";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     ```

4. **Run the development server**:

   ```bash
   npm start
   ```

---

## 🧪 Usage

* Register or Login with your credentials.
* Browse products, click to see details.
* Logged-in users can:

  * Add products to the cart.
  * Write reviews (saved in LocalStorage).
* Cart and Reviews persist even after page refresh.
