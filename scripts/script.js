const products = {
    sencha: {
        title: "Jasmine Sencha Green Tea",
        price: "AUD $20.00",
        imgsrc1: "images/jpsencha.png",
    },
    bancha: {
        title: "Japanese Bancha Green Tea",
        price: "AUD $20.00",
        imgsrc1: "images/jpbancha.jpg",
    },
    lime: {
        title: "Japanese Lime Green Tea",
        price: "AUD $20.00",
        imgsrc1: "images/jplime.jpg",
    },
    jasminegreen: {
        title: "Organic Jasmine Green Tea",
        price: "AUD $15.00",
        imgsrc1: "images/jasminegreen.jpg",
    },
    darjeeling: {
        title: "Darjeeling",
        price: "AUD $20.00",
        imgsrc1: "images/darjeeling.jpg",
    },
    balance: {
        title: "Balance",
        price: "AUD $15.00",
        imgsrc1: "images/balance.jpg",
    },
    dreams: {
        title: "Sweet Dreams",
        price: "AUD $15.00",
        imgsrc1: "images/sweetdreams.jpg",
    },
};

// search overlay
function initPage() {
    const params = new URLSearchParams(window.location.search);
    const currProductId = params.get("product");
    const productData = products[currProductId];

    if (!productData) return;

    const title = document.getElementById("product-title");
    const img = document.getElementById("main-product-img");
    const price = document.getElementById("product-price");

    if (title) title.textContent = productData.title;
    if (img) img.src = productData.imgsrc1;
    if (price) price.textContent = productData.price;
}

initPage();

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

// to add products to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}

const addcartbtn = document.getElementById("addtocart-btn");
if (addcartbtn) {
    addcartbtn.addEventListener("click", function () {
        addToCart("jasminegreen");
    });
}

// cart page
function showCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");

    if(!cartItems) return;
    cartItems.innerHTML = "";
    cart.forEach(function(productId) {
        const product = products[productId];

        cartItems.innerHTML += `
            <article class="cart-card">
                <div class="cart-img-container">
                    <img src="${product.imgsrc1}" alt="${product.title}">

                    <div class="quantity-control">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                </div>

                <div class="cart-text">
                    <h2>${product.title}</h2>
                    <p class="price">${product.price}</p>
                </div>
                <button class="removebtn">
                        <img src="images/removebtn.png" alt="remove btn">
                </button>

            </article>
        `;
            
    });
}

showCart();

 