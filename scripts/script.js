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

function initPage() {
    const params = new URLSearchParams(window.location.search);
    const currProductId = params.get("product");
    const productData = products[currProductId];

    document.getElementById("product-title").textContent = productData.title;
    document.getElementById("main-product-img").src = productData.imgsrc1;
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

