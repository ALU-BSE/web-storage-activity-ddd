// Check login status on page load
window.onload = function () {
    checkAuth();
    loadTheme();
    loadCart();
};

// **Task 1: User Authentication with Cookies**
function login() {
    const username = document.getElementById("username").value;
    if (!username) return alert("Please enter a username");

    // Set secure cookie with HttpOnly & Secure flags (server-side needed for HttpOnly)
    document.cookie = `authToken=${username}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; Secure`;

    checkAuth();
}

function logout() {
    // Expire the authToken cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    checkAuth();
}

function checkAuth() {
    const token = getCookie("authToken");
    if (token) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("logout-container").style.display = "block";
        document.getElementById("user-name").textContent = token;
    } else {
        document.getElementById("login-container").style.display = "block";
        document.getElementById("logout-container").style.display = "none";
    }
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// **Task 2: Theme Preferences with Local Storage**
document.getElementById("theme-toggle").addEventListener("click", function () {
    let theme = document.body.classList.contains("dark") ? "light" : "dark";
    document.body.classList.toggle("dark");

    // Store theme settings using JSON
    localStorage.setItem("userSettings", JSON.stringify({ theme }));
});

function loadTheme() {
    const settings = JSON.parse(localStorage.getItem("userSettings"));
    if (settings && settings.theme === "dark") {
        document.body.classList.add("dark");
    }
}

// **Task 3: Session-Specific Shopping Cart**
function addToCart(product, quantity) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push({ product, quantity });

    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");

    cartList.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.product} x${item.quantity}`;
        cartList.appendChild(li);
    });
}
