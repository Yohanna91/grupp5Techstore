const användare = [
  {
    namn: "fredrik",
    lösenord: "12345",
  },
  {
    namn: "yohanna",
    lösenord: "hej123",
  },
  {
    namn: "john",
    lösenord: "apa123",
  },
];

const utloggad = document.getElementById("utloggad");
const inloggad = document.getElementById("inloggad");
const registrera = document.getElementById("registrera");
const inloggadsom = document.getElementById("inloggadsom");
const felmeddelande = document.getElementById("felmeddelande");
const products = document.getElementById("products");
const myPage = document.getElementById("my-page");
const itemsTotal = document.getElementById("items-total");
const itemsPrice = document.getElementById("items-price");
const removeOrder = document.getElementById("remove-order");

uppdatera_skärmen();

const namnElement = document.getElementById("namn");
const lösenordElement = document.getElementById("lösenord");
const register_namn = document.getElementById("register_namn");
const register_lösenord = document.getElementById("register_lösenord");
const loggaInKnapp = document.getElementById("loggain");
const loggautKnapp = document.getElementById("loggaut");
const registreraknapp = document.getElementById("registreraknapp");

loggaInKnapp.addEventListener("click", function () {
  användare.forEach(function (person) {
    if (
      namnElement.value === person.namn &&
      lösenordElement.value === person.lösenord
    ) {
      const användaren = {
        namn: namnElement.value,
        lösenord: lösenordElement.value,
      };

      localStorage.setItem("inloggad", JSON.stringify(användaren));

      namnElement.value = "";
      lösenordElement.value = "";
      felmeddelande.innerText = "";

      uppdatera_skärmen();
    } else {
      felmeddelande.innerText = "Fel användarnamn eller lösenord";
    }
  });
});

loggautKnapp.addEventListener("click", function () {
  localStorage.removeItem("inloggad");

  uppdatera_skärmen();
});

registreraknapp.addEventListener("click", function () {
  if (register_namn.value === "" || register_lösenord.value === "") {
    return false;
  }

  const användaren = {
    namn: register_namn.value,
    lösenord: register_lösenord.value,
  };

  användare.push(användaren);

  localStorage.setItem("inloggad", JSON.stringify(användaren));

  register_namn.value = "";
  register_lösenord.value = "";

  uppdatera_skärmen();
});

function uppdatera_skärmen() {
  if (localStorage.getItem("inloggad")) {
    const inloggad_användare = JSON.parse(localStorage.getItem("inloggad"));

    myPage.style.display = "block";
    inloggad.style.display = "flex";
    products.style.display = "none";
    registrera.style.display = "none";
    utloggad.style.display = "none";
    inloggadsom.innerText = inloggad_användare.namn;
    MyPageView();
  } else {
    utloggad.style.display = "block";
    registrera.style.display = "block";
    products.style.display = "block";
    inloggad.style.display = "none";
    myPage.style.display = "none";
    felmeddelande.innerText = "";
  }
}

function MyPageView() {
  const inloggad = JSON.parse(localStorage.getItem("inloggad"));
  const myItemsLocalStorage = JSON.parse(localStorage.getItem("my-items"));

  if (myItemsLocalStorage) {
    let total = 0;

    myItemsLocalStorage.forEach((item) => {
      if (!item.price) {
        return;
      }
      total += item.price;
    });

    const orderedByUser =
      myItemsLocalStorage[myItemsLocalStorage.length - 1].user;

    if (orderedByUser == inloggad.namn) {
      itemsTotal.innerText = myItemsLocalStorage.length - 1;
      itemsPrice.innerText = total + ":-";
    } else {
      itemsTotal.innerText = "0";
      itemsPrice.innerText = "0:-";
    }

    removeOrder.addEventListener("click", function () {
      const answer = confirm("Do you want to delete your order?");
      if (answer) {
        localStorage.removeItem("my-items");
        alert("Your order has been deleted 🗑");
        itemsPrice.innerText = 0;
        itemsTotal.innerText = 0;
        removeOrder.style.display = "none";
      }
    });
  }
}
