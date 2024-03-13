function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
const form = document.querySelector('form[name="reserve"]');

// Valeur Inputs
let inputPrenom = document.getElementById("first");
let inputNom = document.getElementById("last");
let inputEmail = document.getElementById("email");
let inputDateNaissance = document.getElementById("birthdate");
let inputParticipation = document.getElementById("quantity");
let inputVille = document.querySelectorAll('form[type="radio"]');
let inputCondition = document.getElementById('checkbox');
let inputNewsletter = document.getElementById('checkbox2');



// Functions Verif Inputs
function verifierInput(input) {
  if(input.value.trim() === ""){
    input.classList.add("error")
  }else{
    input.classList.remove("error")
  }
}

function verifierEmail(email){
  let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if(emailRegex.test(email.value)){
      email.classList.remove("error");
  }else{
      email.classList.add("error");
  }
}

function verifierPrenom(prenom) {
  //Retire les espaces
  let prenomVerif = prenom.value.trim();
  if (prenomVerif.length < 2) {
    prenom.classList.add("errorInput");
    prenom.textContent = "Veuillez rentrer au minimum 2 caractères";
  }else {
    prenom.classList.remove("errorInput");
  }
}

inputPrenom.addEventListener('change', ()=> {
  verifierPrenom(inputPrenom)
})



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close form
close.addEventListener('click', closeModal);

// function close modal
function closeModal() {
  modalbg.style.display = "none";
}

// Lorsque le form est submit lanpage n'est pas rechargée
form.addEventListener('submit', handleResa);

// Function qui evite le rechargement de la page après submit
function handleResa(e) {
  e.preventDefault();
  console.log('sub');
  if(!valideInputs()){
    return
  }
  let balisePrenom = document.getElementById("first");
  let prenom = balisePrenom.value;
  console.log('confirmation');
}

function valideInputs(balise) {
  if (balise.value === '') {
    balise.classList.add("error")
  }else {
    balise.classList.remove("error")
  }
  let valide = true;
  
  // recup les valeurs des inputs 
  
  //et les valider

  // valider avec les regex
  return valide;
}





