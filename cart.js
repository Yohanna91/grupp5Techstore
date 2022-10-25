var listOfProducts;
var complete_purchase
const cartproducts = document.querySelector(".container_cart")

function initSite() {
    // Hämta <p> taggen med antalet produkter och uppdatera
    cartamount = document.querySelector(".cartamount")
    totalamount = document.querySelector(".totalamount")
    complete_purchase = document.querySelector(".complete_purchase")
    // 1. Get items stored in LocalStorage and save it to listOfProducts variable
    // 2. Invoke the function addProductsToWebpage to populate the products to webpage
    addProductsToWebpage();
    // 3. Update the cart amoung in the navbar
    updateCartAmount()
    totalSumInCart()

    complete_purchase.addEventListener("click", () => {
        alert("Thank you for your purchase! 🔥")
        localStorage.removeItem("cart")
        location.href = "/"
        
    })
}


function addProductsToWebpage() {
    const listOfProducts = JSON.parse(localStorage.getItem("cart"))
    cartproducts.innerHTML =  ""
    listOfProducts.forEach((product) => {
        cartproducts.innerHTML += `
        <div class="product_cart" id="${product.title}">
        <img src="/assets/${product.image}" alt="${product.description}">
        <h2>${product.title}</h2>
        <h4 class="price">${product.price} kr</h4>
            <button id="remove-from-cart"><i class="fa-solid fa-trash-can"></i> Ta bort</button>
        </div>
        `
    })

    const removeFromCartButtons = document.querySelectorAll("#remove-from-cart")
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", () => {
    
            const productName = button.parentElement.id
            const productsInLocalStorage = JSON.parse(localStorage.getItem("cart"))
            // Behåll alla produkter i localstorage förutom den man tryck på
            const filtreradLista = productsInLocalStorage.filter(item => item.title !== productName)
            
            // Uppdatera localstorage med produkterna förutom den vi raderat från raden ovanpå 👆🏼
            localStorage.setItem("cart", JSON.stringify(filtreradLista))
            addProductsToWebpage()
            updateCartAmount()
            
    
        })
   })
}

function updateCartAmount() {
    // Hämta de som finns i localstorage och konvertera det från string till javascript objekt
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem("cart"))
    // Antalet produkter i localstorage "cart"
    cartamount.innerText = cartItemsInLocalStorage.length
}

function totalSumInCart() {
    // intial value of total
    let total = 0;
    listOfProducts.forEach(product => {

        // Add product price to total
        total += product.price
    })
    totalamount.innerText = total

}
