var listOfProducts;
var cartamount;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(response => response.json())
    .then(data => {
        listOfProducts = data
        addProductsToWebpage();
    })
}


function initSite() {
    loadProducts();
    // Hämta <p> taggen med antalet produkter och uppdatera
    cartamount = document.querySelector(".cartamount")
    updateCartAmount()
    // This would also be a good place to initialize other parts of the UI
}

function updateCartAmount() {
    // Hämta de som finns i localstorage och konvertera det från string till javascript objekt
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem("cart"))
    // Antalet produkter i localstorage "cart"
    cartamount.innerText = cartItemsInLocalStorage.length
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
    listOfProducts.forEach(product => {
        products.innerHTML += `
        <div class="product">
            <h2>${product.title}</h2>
            <h4>${product.description}</h4>
            <img src="/assets/${product.image}" alt="${product.description}">
            <h4 class="price">${product.price} kr</h4>
            <button id="add-to-cart">🛒 Lägg till i kundvagnen</button>
        </div>
        `
    })

    const addToCartButtons = document.querySelectorAll("#add-to-cart")
   addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.parentElement.firstChild.nextSibling.innerText
            // Gå igenom listan av alla produkter (listofProducts) och filtrera bort allt förutom
            // den produkt man vill ha
            const foundProduct = listOfProducts.filter(item => item.title == productName)
            
            // Kolla först om kundkorgen existerar i localstorage
            if (!localStorage.getItem("cart")) {
                // Om det inte fanns någon "cart" i localStorage så skapar vi en helt ny med vår product
                localStorage.setItem("cart", JSON.stringify(foundProduct))
                updateCartAmount()
            } else {
                // Däremot om localStorage har en "cart" redan så ska vi bara lägga till den nya produkten
                // Hämta den först
                let cart = JSON.parse(localStorage.getItem("cart"))
                // Lägg till den nya produkten
                cart.push(foundProduct);
                // Uppdatera localStorage
                localStorage.setItem("cart", JSON.stringify(cart))
                updateCartAmount()
            }

        })
   })
}