const products = {
    sencha: {
        title: "Jasmine Sencha Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jpsencha.png",
        thumb1: "images/jpsencha.png",
        description: "Sencha tea is a specialist type of green tea where the tea leaves are steamed before drying, giving them a higher level of vitamines and anti-oxidants than other green teas.",
    },
    bancha: {
        title: "Japanese Bancha Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jpbancha.jpg",
        thumb1: "images/jpbancha.jpg",
        description: "Bancha is harvested from the same tree as sencha grade, but it is plucked later than sencha and this gives it a lower market grade. It's flavour is truly unique, featuring a strong straw smell and though it is considered the lowest grade of Japanese green tea on the market, it is very popular as a daily tea in Japan.",
    },
    lime: {
        title: "Japanese Lime Green Tea",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/jplime.jpg",
        thumb1: "images/jplime.jpg",
        description: "A delightful blend of green teas, citrus peels and chamomile flowers with a refreshing lemon/lime taste. This tea contains 2 different green tea varieties: Sencha and Bancha. This refreshing, crisp citrus creation is load with lots of antioxidants and can be brewed hot or cold.",
    },
    jasminegreen: {
        title: "Organic Jasmine Green Tea",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/jasminegreen.jpg",
        thumb1: "images/jasminegreen.jpg",
        description: "It has a lot to offer thanks to high concentrations of antioxidants and anti-inflammatory properties. Jasmine Tea can also help promote a beautiful, healthy skin and boost your immune system.",
    },
    darjeeling: {
        title: "Darjeeling",
        price: "AUD $20.00",
        pricenum: 20,
        imgsrc1: "images/darjeeling.jpg",
        thumb1: "images/darjeeling.jpg",
        description: "Originates from the Darjeeling district in the West Bengal region at the foot of the Himalayas in India, dating back to 1847, with the first three commercial Darjeeling Tea plantations up and running by 1852.  Today there are over 80 plantations in this region of the seven Valleys, most of these tea plantations are converting to organic farming. When properly brewed this tea is a light coloured infusion with a floral aroma. The Darjeeling variety is a black tea known as the 'Champagne of Teas'. A great brew for any time of the day...enjoy!",
    },
    balance: {
        title: "Balance",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/balance.jpg",
        thumb1: "images/balance.jpg",
        description: "We all need to get a little balance in our life and this is the tea which will do this for you. Ginger, lemon balm, cinnamon quills, cloves, cardamon pods, hawthorn berries and rose petals. A comforting warm tonic that promotes circulation and helps with digestion problems.",
    },
    dreams: {
        title: "Sweet Dreams",
        price: "AUD $15.00",
        pricenum: 15,
        imgsrc1: "images/sweetdreams.jpg",
        thumb1: "images/sweetdreams.jpg",
        description: "After a busy day we all need a good night sleep and sweet dreams. This beautiful blend of orange passion flowers, chamomile, spearmint, hops, lemonbalm, rose petals, lime blossoms, calendula and lemongrass taken before bed will help with a great night sleep and amazing dreams.",
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
    const description = document.getElementById("product-description");

    if (title) title.textContent = productData.title;
    if (img) img.src = productData.imgsrc1;
    if (price) price.textContent = productData.price;
    if (thumb1) thumb1.src = productData.thumb1;
    if (description) description.textContent = productData.description;
}

initPage();

// dropdown details
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
dropdownBtns.forEach(function(button) {
    button.addEventListener("click", function() {
        const content = button.nextElementSibling;
        content.classList.toggle("active");
        button.classList.toggle("active");
    });
});

// search overlay open and close
const searchOverlay = document.querySelector(".search-overlay");
const searchBar = document.querySelector(".search-bar");
window.openSearch = function () {
    searchOverlay.style.display = "flex";
}

window.closeSearch = function () {
    searchOverlay.style.display = "none";
}

if (searchOverlay) {
    searchOverlay.addEventListener("click", closeSearch);
}

if (searchBar) {
    searchBar.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

// search input
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

if (searchInput && searchBtn) {
    function performSearch() {
        const query = searchInput.value.trim();
        if(query != "") {
            window.location.href =
                `results.html?search=${encodeURIComponent(query)}`;
        }
}
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
            performSearch();
        }
    });
}

// cart product counter
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;
    let total = 0;
    cart.forEach(function(item) {
        total += item.quantity;
    });

    cartCount.textContent = total;

    if (total === 0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "flex";
    }
}

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
    updateCartCount();
    window.location.href = "cart.html";
}

// add to cart button 
const addcartbtn = document.getElementById("addtocart-btn");
if (addcartbtn) {
    addcartbtn.addEventListener("click", function () {
        const params = new URLSearchParams(window.location.search);
        let currProductId = params.get("product");

        if(!currProductId) {
            currProductId = "jasminegreen";
        }
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
    updateCartCount();
    showCart();
}

// quantity
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
}
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1){
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
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
                        <button class="qty-minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-plus" data-index="${index}">+</button>
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

    const freeShippingGoal = 75;
    const progressFill = document.querySelectorAll(".progress-fill");
    const shippingMessage = document.querySelectorAll(".shipping-message")
    progressFill.forEach(function(fill) {
        const progressPercent = Math.min((total / freeShippingGoal) * 100, 100);
        fill.style.width = progressPercent + "%";
    });

    shippingMessage.forEach(function(message) {
        if (total >= freeShippingGoal) {
            message.textContent = "Congrats on free shipping!";
        } else {
            const remaining = freeShippingGoal - total;
            message.textContent = 
                `Spend AUD $${remaining.toFixed(2)} more for free shipping`;
        }
    });

    const removebuttons = document.querySelectorAll(".removebtn");
    removebuttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const index = button.dataset.index;
            removeFromCart(index);
        });
    });

    // plus button quantity
    const plusButtons = document.querySelectorAll(".qty-plus");
    plusButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const index = button.dataset.index;
            increaseQuantity(index);
        });
    });

    // minus buttons
    const minusButtons = document.querySelectorAll(".qty-minus");
    minusButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const index = button.dataset.index;
            decreaseQuantity(index);
        });
    });
}
showCart();
updateCartCount();


// payment form validation
const paymentForm = document.getElementById("payment-form");

if (paymentForm) {
    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (paymentForm.checkValidity()) {
            window.location.href = "confirmation.html";
        } else {
            paymentForm.reportValidity();
        }
    });
}


 