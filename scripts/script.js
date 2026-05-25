const products = {
    sencha: {
        title: "Jasmine Sencha Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jpsencha.png",
        thumb1: "images/jpsencha.png",
    },
    bancha: {
        title: "Japanese Bancha Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jpbancha.jpg",
        thumb1: "images/jpbancha.jpg",
    },
    lime: {
        title: "Japanese Lime Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jplime.jpg",
        thumb1: "images/jplime.jpg",
    },
    jasminegreen: {
        title: "Organic Jasmine Green Tea",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/jasminegreen.jpg",
        thumb1: "images/jasminegreen.jpg",
    },
    darjeeling: {
        title: "Darjeeling",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/darjeeling.jpg",
        thumb1: "images/darjeeling.jpg",
    },
    balance: {
        title: "Balance",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/balance.jpg",
        thumb1: "images/balance.jpg",
    },
    dreams: {
        title: "Sweet Dreams",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/sweetdreams.jpg",
        thumb1: "images/sweetdreams.jpg",
    },
};


// product detail page
function initPage() {
    const params = new URLSearchParams(window.location.search);
    const currProductId = params.get("product");
    const productData = products[currProductId];

    if (!productData) return;

    const title = document.getElementById("product-title");
    const img = document.getElementById("main-product-img");
    const price = document.getElementById("product-price");
    const thumb1 = document.getElementById("thumb-1");

    if (title) title.textContent = productData.title;
    if (img) img.src = productData.imgsrc1;
    if (price) price.textContent = productData.price;
    if (thumb1) thumb1.src = productData.thumb1;
}

initPage();

// search overlay
const searchOverlay = document.querySelector(".search-overlay");
const searchBar = document.querySelector(".search-bar");
window.openSearch = function () {
    searchOverlay.style.display = "flex";
}

window.closeSearch = function () {
    searchOverlay.style.display = "none";
}

searchOverlay.addEventListener("click", closeSearch);

searchBar.addEventListener("click", function (event) {
    event.stopPropagation();
});

// product quantities in cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingproduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingproduct) {
        existingproduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}

// add to cart button 
const addcartbtn = document.getElementById("addtocart-btn");
if (addcartbtn) {
    addcartbtn.addEventListener("click", function () {
        const params = new URLSearchParams(window.location.search);
        const currProductId = params.get("product");
        addToCart(currProductId);
    });
}

// quick add
const quickaddbtn = document.querySelectorAll(".quick-add");
quickaddbtn.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        const productId = button.dataset.product;
        addToCart(productId);
    });
});


// to remove products from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// cart page
function showCart () {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    let total = 0;

    if(!cartItems) return;
    cartItems.innerHTML = "";
    cart.forEach(function(item, index) {
        const product = products[item.id];
        if (!product) return;
        total += product.pricenum * item.quantity;

        cartItems.innerHTML += `
            <article class="cart-card">
                <div class="cart-img-container">
                    <img src="${product.imgsrc1}" alt="${product.title}">

                    <div class="quantity-control">
                        <button>-</button>
                        <span>${item.quantity}</span>
                        <button>+</button>
                    </div>
                </div>

                <div class="cart-text">
                    <h2>${product.title}</h2>
                    <p class="price">${product.price}</p>
                </div>
                <button class="removebtn" data-index="${index}">
                        <img src="images/removebtn.png" alt="remove btn">
                </button>

            </article>
        `;      
    });

    const totalPrice = document.getElementById("cart-totalprice");
    if (totalPrice) {
        totalPrice.textContent = `AUD $${total.toFixed(2)}`;
    }

    const removebuttons = document.querySelectorAll(".removebtn");
    removebuttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const index = button.dataset.index;
            removeFromCart(index);
        });
    });
}

showCart();

 