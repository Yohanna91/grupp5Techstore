console.log("Hej")
const användare = [
    
    {
        namn: "fredrik",
        lösenord: "12345"
    },
    {
        namn: "yohanna",
        lösenord: "hej123"
    },
    {
        namn: "john",
        lösenord: "apa123"
    }
]


const utloggad = document.getElementById("utloggad")
const inloggad = document.getElementById("inloggad")
const registrera = document.getElementById("registrera")
const inloggadsom = document.getElementById("inloggadsom")
const felmeddelande = document.getElementById("felmeddelande")

uppdatera_skärmen();


const namnElement = document.getElementById("namn")
const lösenordElement = document.getElementById("lösenord")
const register_namn = document.getElementById("register_namn")
const register_lösenord = document.getElementById("register_lösenord")
const loggaInKnapp = document.getElementById("loggain")
const loggautKnapp = document.getElementById("loggaut")
const registreraknapp = document.getElementById("registreraknapp")


loggaInKnapp.addEventListener("click", function() {
    
    användare.forEach(function(person) {
        if (namnElement.value === person.namn && lösenordElement.value === person.lösenord) {

           
            const användaren = {
                namn: namnElement.value,
                lösenord: lösenordElement.value
            }
        
           
            localStorage.setItem("inloggad", JSON.stringify(användaren))
        
           
            namnElement.value = ""
            lösenordElement.value = ""
            felmeddelande.innerText = ""
        
          
            uppdatera_skärmen();
           } 
           
           else {
            felmeddelande.innerText = "Fel användarnamn eller lösenord"
           }
    })
})

loggautKnapp.addEventListener("click", function() {
    
    localStorage.removeItem("inloggad");

    uppdatera_skärmen();
})

registreraknapp.addEventListener("click", function() {
    
    if (register_namn.value === "" || register_lösenord.value === "") {
        return false;
    }
   
    const användaren = {
        namn: register_namn.value,
        lösenord: register_lösenord.value
    }

    
    användare.push(användaren)

    
    localStorage.setItem("inloggad", JSON.stringify(användaren))


    register_namn.value = ""
    register_lösenord.value = ""

    uppdatera_skärmen();
})


function uppdatera_skärmen() {


    if (localStorage.getItem("inloggad")) {
       
        const inloggad_användare = JSON.parse(localStorage.getItem("inloggad"))
        
        utloggad.style.display = "none"
        registrera.style.display = "none"

       inloggad.style.display = "block"
    
        inloggadsom.innerText = inloggad_användare.namn
    }
    
    else {
        
        inloggad.style.display = "none"
        
        utloggad.style.display = "block"
        registrera.style.display = "block"
    }
}

        //KNYTA IHOP EN ORDER MED EN SPECIFIK ANVÄNDARE

        // function MyPageView() {
        //     const inloggad = JSON.parse(localStorage.getItem("inloggad"));
        //     const orders = JSON.parse(localStorage.getItem("orders"));
        //     const myOrders = orders.filter(order => order.user == inloggad.namn)
        //     if (myOrdersLocalStorage) {
        //       let total = 0;
        //       myOrdersLocalStorage.forEach((order) => {
        //         if (order.user == inloggad.namn) {
        //           return;
        //         }
        //         total += item.price;
        //       });
        //       const orderedByUser = myOrdersLocalStorage[myOrdersLocalStorage.length - 1].user;
        //       if (orderedByUser == inloggad.namn) {
        //         //yohanna fredrik etc...är = inloggad.namn
        //         itemsTotal.innerText = myItemsLocalStorage.length - 1;
        //         itemsPrice.innerText = total + ":-";
        //       } else {
        //         itemsTotal.innerText = "0";
        //         itemsPrice.innerText = "0:-";
        //       }

        // const Yohanna = document.getElementById("jonas")

        // Yohanna.addEventListener("click", function() {

        //     console.log("hej")
            
            
        // })
            
            // // for (const order of orders) {
            // //     const ul = document.createElement("ul");
            // //     const li = document.createElement("li");
            // //     li.innerText = inloggad.namn
            // //     ul.appendChild(li)
            // // }
            
            // // for ( const hero of heroes) {
            // //     if ( hero.teamId === team.teamId) {
            // //         const heroUL = document.createElement("ul")
            // //         const heroLI = document.createElement("li")
            // //         heroLI.innerText = hero.heroName
            // //         heroUL.append(heroLI)
            // //         teamUL.appendChild(heroUL)
                    
            // //     }
            // // }
            
            // // document.body.appendChild(ul)
        
         
        
    