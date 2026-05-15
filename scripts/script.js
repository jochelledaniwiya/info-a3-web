products = {
    "product1": {
        title:"",
        imgsrc1:"",
    },
    "product2": {

    }
}

const params = URLSearchParams()
const currProductId = params.get("product")

function initPage(product){
    const productData = products[product]

    document.getElementById("").src = productData.imgsrc1
}