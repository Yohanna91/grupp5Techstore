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