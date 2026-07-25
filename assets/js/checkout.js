<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boivana Cart</title>

  <!-- Google Font: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/style.css">

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      min-height: 100vh;
      background: radial-gradient(circle at top left, #1a1c29, #0d0e15);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }

    header {
      width: 100%;
      max-width: 650px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    header h2 {
      font-size: 1.5rem;
      background: linear-gradient(135deg, #a855f7, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    header a {
      color: #a78bfa;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .cart-section {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 30px;
      width: 100%;
      max-width: 650px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .cart-section h1 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 10px;
    }

    /* Cart Card Styling */
    .cart-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 14px;
      margin-bottom: 14px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .cart-card img {
      border-radius: 8px;
      object-fit: cover;
    }

    .cart-info {
      flex-grow: 1;
    }

    .cart-info h3 {
      font-size: 1rem;
      color: #f3f4f6;
      margin-bottom: 4px;
    }

    .cart-info p {
      font-size: 0.85rem;
      color: #9ca3af;
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.2);
      padding: 4px 8px;
      border-radius: 8px;
    }

    .qty-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .remove-btn {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 5px;
    }

    .empty-cart {
      text-align: center;
      color: #9ca3af;
      padding: 30px 0;
    }

    .total-container {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #checkout-btn {
      width: 100%;
      margin-top: 20px;
      padding: 14px;
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
    }

    #checkout-btn:hover {
      opacity: 0.95;
      transform: translateY(-2px);
    }
  </style>
</head>

<body>

  <header>
    <h2>🛒 Boivana Cart</h2>
    <a href="index.html">← Continue Shopping</a>
  </header>

  <section class="cart-section">
    <h1>Your Cart</h1>

    <!-- Cart items dynamic render hobe -->
    <div id="cart-items"></div>

    <div class="total-container">
      <h3>Total:</h3>
      <h2>৳ <span id="total-price">0</span></h2>
    </div>

    <button id="checkout-btn">Proceed to Checkout</button>
  </section>

  <!-- Cart Script -->
  <script>
    // EXACT SAME KEY FROM CHECKOUT JS
    const CART_KEY = "boivanaCart";

    function renderCart() {
      const cartItemsContainer = document.querySelector("#cart-items");
      const totalPriceElement = document.querySelector("#total-price");

      // LocalStorage theke data fetch
      let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is currently empty!</p>`;
        totalPriceElement.innerText = "0";
        return;
      }

      let total = 0;
      cartItemsContainer.innerHTML = "";

      cart.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-card");

        div.innerHTML = `
          <img src="${item.image || 'https://via.placeholder.com/100'}" width="80" height="100">
          <div class="cart-info">
            <h3>${item.title}</h3>
            <p>৳${item.price} × ${item.quantity} = ৳${itemTotal}</p>
          </div>

          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">🗑️</button>
        `;

        cartItemsContainer.appendChild(div);
      });

      totalPriceElement.innerText = total;
    }

    // Quantity Barano / Kamano Function
    window.updateQuantity = function(index, change) {
      let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1); // Quantity 0 hole remove hobe
        }
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderCart();
    };

    // Item Remove Function
    window.removeItem = function(index) {
      let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      cart.splice(index, 1);
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderCart();
    };

    // Page Load hobar shomoy call hobe
    document.addEventListener("DOMContentLoaded", renderCart);

    // Checkout Navigation
    const checkoutBtn = document.querySelector("#checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        if(cart.length === 0) {
          alert("Your cart is empty!");
          return;
        }
        window.location.href = "checkout.html";
      });
    }
  </script>

  <script type="module" src="assets/js/auth.js"></script>
  <script type="module" src="assets/js/auth-guard.js"></script>
  <script type="module" src="assets/js/script.js"></script>

</body>

</html>
