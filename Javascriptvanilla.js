// Sélection des élements du DOM
const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");

// Variables globales 
let currentElement = "";
let movesCount,
  imagesArr = [];

// Fonction pour détecter si le dispositif est tactile
  const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};


// Fonction pour générer un nombre aléatoire entre 1 et 8
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//getRandomInt(10);
const randomNumber = () => Math.floor(Math.random() * 9);

// Fonction pour obtenir les coordonnées d'un élément dans la grille
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

// Fonction pour vérifier si deux éléments sont adjacents dans la grille
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    if (row2 == row1 - 1 || row2 == row1 + 1) {
      return true;
    }
  }
  return false;
};

// Fonction pour générer un tableau d'images aléatoires ( le dracaufeu ) 
const randomImages = () => {
  while (imagesArr.length < 9 ) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal)) {
      imagesArr.push(randomVal);
      console.log (randomVal);
    }
  }
  //imagesArr.push(8);
};

// Fonction pour génerer la grille de jeu
const gridGenerator = () => {
  randomImages();
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("style", `grid-column:${i + 1};grid-row:${j + 1}`);
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", selectImage);
      div.innerHTML = `<img src="assets/image_part_${imagesArr[count]}.png" class="image ${
        imagesArr[count] == 8 ? "target" : ""
      }" data-index="${count}"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};

// Fonction appelée lorsqu'une image est sélectionnée
const selectImage = (e) => {
  e.preventDefault();
  currentElement = e.target;
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;
  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
     // échange des positions des éléments
    currentElement.remove();
    targetElement.remove();
    let currentArrIndex = imagesArr.indexOf(
      parseInt(currentElement.getAttribute("data-index"))
    );
    let targetArrIndex = imagesArr.indexOf(
      parseInt(targetElement.getAttribute("data-index"))
    );
    [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
      imagesArr[targetArrIndex],
      imagesArr[currentArrIndex],
    ];

    currentElement.setAttribute("data-index", targetArrIndex + 1);
    targetElement.setAttribute("data-index", currentArrIndex + 1);

    currentParent.appendChild(targetElement);
    targetParent.appendChild(currentElement);

     // Vérification si le puzzle est résolu
    if (imagesArr.join("") == "012345678") {
      setTimeout(() => {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        result.innerText = `Total Moves: ${movesCount}`;
        startButton.innerText = "Restart Game";
      }, 1000);
    }
    // Mise à  jour du nombre de mouvements ( compteur en haut a droite ) 
    movesCount += 1;
    moves.innerText = `Moves: ${movesCount}`;
  }
};

// Gestionnaire d'événement pour le bouton de démarrage
startButton.addEventListener("click", () => {
   // RÃ©initialisation du jeu
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  container.innerHTML = "";
  imagesArr = [];
  
  // GÃ©nÃ©ration alÃ©atoire de la grille
  //zz randomImages();
  gridGenerator();
  
  
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
});
// Chargement initial de la page
window.onload = () => {
  // Affichage de l'Ã©cran de dÃ©marrage
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
};












