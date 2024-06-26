/*************************************************** 
      Prise en charge de l'icon du menu sur mobile
****************************************************/

const iconeNav = document.querySelector('.icon');
iconeNav.addEventListener('click', editNav)

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*************************************************** 
        Ouverture / fermeture  de la modal
****************************************************/
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModal = document.querySelector(".close");
const closeConf = document.querySelector(".close-conf");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Ajout de la fonctionnalité au bouton (x)
closeModal.addEventListener("click", () => {
  modalbg.style.display = "none";
})

closeConf.addEventListener("click", ()=>{
  modalbg.style.display = "none";
  location.reload();
})

window.addEventListener("click", e => {
  if (e.target == modalbg) {
    modalbg.style.display = "none";
  }
});

/*************************************************** 
          Prise en charge du formulaire
****************************************************/


const formData = document.querySelectorAll(".formData");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector('form[name="reserve"]');
const formConfirmation = document.querySelector('.content-conf');


//Inputs
const inputPrenom = document.getElementById("first");
const inputNom = document.getElementById("last");
const inputBirthdate = document.getElementById("birthdate");
const inputEmail = document.getElementById("email");
const inputParticipation = document.getElementById("quantity");
const inputVille = document.querySelectorAll('input[name="location"]');
const inputCondition = document.getElementById('checkbox1');
const inputNewsletter = document.getElementById('checkbox2');


//Gestion des erreurs 

// Lorsqu'un input n'est pas valide la fonction passe l'attribut à "true" ce qui engendre le css lié a cette attribut.
function afficherErreur(inputElement, message){
  inputElement.parentElement.setAttribute("data-error-visible", 'true')
  inputElement.parentElement.setAttribute("data-error", message)
}

// Lorsqu'un input est valide la fonction passe l'attribut à "false" ce qui engendre le css lié a cette attribut.
function supprimerErreur(inputElement) {
  inputElement.parentElement.setAttribute("data-error-visible", false);
}

// Verification des inputs


// cette fonction parcour les input des villes et des qu'il y a une de check la boucle s'arrete passant radioIsChecked a true
// avec la variable radioIsChecked je verifi si c'est false ou true et affiche une erreur ou pas 
function verifierVilleChoisie() {
  let radioIsChecked = false;

  for (let ville of inputVille) {
    if (ville.checked) {
      radioIsChecked = true;
      break;
    }
  }
  if (!radioIsChecked) {
    afficherErreur(inputVille[0], "Vous devez choisir une option.")
  }
  if (radioIsChecked) {
    supprimerErreur(inputVille[0])
  }
}

// fonction qui verifie si la condition est checked
function verifierCondition() {
  if (!inputCondition.checked) {
    afficherErreur(inputCondition, "Vous devez vérifier que vous acceptez les termes et conditions.")
  }
  if (inputCondition.checked) {
    supprimerErreur(inputCondition)
  }
}

// Fonction qui verifie si le nom est rentré correctement selon les conditions
// Trim() sert supprimer les espaces vides
// Verification que la variable nom fait plus de 2 caractères 
function verifierNom(){
  let nom = inputNom.value.trim();
  if (nom.length < 2) {
    afficherErreur(inputNom, `Veuillez entrer 2 caractères ou plus pour le champ du nom.`)
  } else {
    supprimerErreur(inputNom)
  }
}

function verifierPrenom(){
  let prénom = inputPrenom.value.trim();
  if (prénom.length < 2) {
    afficherErreur(inputPrenom, `Veuillez entrer 2 caractères ou plus pour le champ du nom.`)
  } else {
    supprimerErreur(inputPrenom)
  }
}

// Fonction de verification d'email
// La regex permet d'autorisé des caractéres definit pour l'adresse mail (minuscule, majuscule, chiffre, caractères speciaux, "@"...)
// la methode test() retroun false si la regex n'est pas respecté

function verifierEmail(){
  let email = inputEmail.value.trim();
  let emailRegex = new RegExp("[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[A-Za-z0-9._-]{2,}");
  if (!emailRegex.test(email)) {
    afficherErreur(inputEmail, "Veuillez entrer un email valide.")
  }
  //essaie avec 2 if, pour simplifier
  if (emailRegex.test(email)) {
    supprimerErreur(inputEmail)
  }
}

//fonction pour verifier la date d'anniversaire
// dateDujour contient la date du jour 
// dateDeNaissanceString recupere la date entrer dans l'input
// dateDeNaissance est convertit en objet Date
// La variable diffDate calcule la différence entre l'année actuelle et l'année de naissance de l'utilisateur.
// Si le mois actuel est inférieur au mois de naissance, ou si les mois sont égaux mais le jour actuel est antérieur au jour de naissance, cela signifie que l'anniversaire de l'utilisateur n'est pas encore passé cette année, donc on ajuste l'âge en conséquence.

function verifierAnniversaire(){
  let dateDuJour = new Date;
  let dateDeNaissanceString = inputBirthdate.value;
  let dateDeNaissance = new Date(dateDeNaissanceString)
  let diffDate = dateDuJour.getFullYear() - dateDeNaissance.getFullYear();
  
  if (dateDeNaissanceString === "") {
    afficherErreur(inputBirthdate, "Veuillez renseigner votre de date de naissance.")
  }else{
    supprimerErreur(inputBirthdate)
  }
  
  if (dateDuJour.getMonth() < dateDeNaissance.getMonth() || (dateDuJour.getMonth() === dateDeNaissance.getMonth() && dateDuJour.getDate() < dateDeNaissance.getDate())) {
    diffDate--;
  }
  
  if (diffDate < 18) {
    afficherErreur(inputBirthdate, "Vous devez être majeur pour participer à l\'évenement.")
  }
  
  if (diffDate >= 18) {
    supprimerErreur(inputBirthdate)
  }

}

// Verfification de l'input participation
// isNaN() sert verifier si ce n'est pas un nombre
function verifierParticipation(){
  let nombreParticipation = inputParticipation.value.trim();
  
  if (isNaN(nombreParticipation) || nombreParticipation === "") {
    afficherErreur(inputParticipation, "Vous devez entrer un chiffre.")
  } else {
    supprimerErreur(inputParticipation)
  }
}

// 'blur' permet de déclancher lorsque l'element perd le focus
inputPrenom.addEventListener('blur', verifierPrenom);
inputNom.addEventListener('blur', verifierNom);
inputEmail.addEventListener("blur", verifierEmail);
inputBirthdate.addEventListener('change', verifierAnniversaire);
inputParticipation.addEventListener("blur", verifierParticipation);
inputCondition.addEventListener('change', verifierCondition)
inputVille.forEach(ville => {
  ville.addEventListener('change', verifierVilleChoisie);
});



// Conserver les données du formulaire

form.addEventListener("submit", e => {
  e.preventDefault();

  if(validateInputs()){
    console.log('222');
    formConfirmation.style.display = 'block';
    form.style.display = 'none';
    form.reset();
  }
  console.log('aaa');
})

// Verification de l'ensemble des fonctions
// si aucun elements avec '[data-error-visible="true"]' est trouvé elle retourne true
function validateInputs() {
  verifierParticipation();
  verifierAnniversaire();
  verifierEmail();
  verifierNom();
  verifierPrenom();
  verifierVilleChoisie();
  verifierCondition();

  return !document.querySelector('[data-error-visible="true"]');
}
