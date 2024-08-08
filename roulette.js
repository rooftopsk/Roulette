// Variables pour la roulette
let perfecthalf = 1 / 37 * 360 / 2;
let currentLength = perfecthalf;

// Variables pour les mises
let solde = 0;
let miseRouge = 0;
let miseNoir = 0;

//  rotation de la roulette au démarrage
$(".wheel img").css("transform", "rotate(" + perfecthalf + "deg)");

//  obtenir un entier aléatoire entre min et max (inclus)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// rotation  roulette
function spinRoulette() {
  $(".wheel img").css("filter", "blur(8px)");

  //  rotation aléatoire
  spininterval = getRandomInt(0, 37) * (360 / 37) + getRandomInt(3, 4) * 360;
  currentLength += spininterval;

  numofsecs = spininterval;

  console.log(currentLength);
  $(".wheel img").css("transform", "rotate(" + currentLength + "deg)");

  // Réinitialisation du flou après un certain délai
  setTimeout(function () {
    $(".wheel img").css("filter", "blur(0px)");

    // Résultat du jeu après l'arrêt de la roue
    const resultat = getRandomInt(0, 36);
    console.log("Résultat: " + resultat);

    //  le résultat est pair ou impair
    const estPair = resultat % 2 === 0;

    //  gagné ou perdu
    if ((estPair && miseNoir > 0) || (!estPair && miseRouge > 0)) {
      // L'utilisateur a gagné
      const gain = estPair ? miseNoir * 2 : miseRouge * 2;
      solde += gain;
      alert("Félicitations, vous avez gagné! Votre gain est de: " + gain);
      updateSolde(); // Mettre à jour l'affichage du solde après le gain
    } else {
      // L'utilisateur a perdu
      alert("Désolé, vous avez perdu votre mise.");
    }

    // Réinitialiser les mises après le résultat
    miseRouge = 0;
    miseNoir = 0;
    updateSolde();
  }, numofsecs);
}

// boutons Ajouter et Retirer
$(document).ready(function() {
  $("#ajouter").click(function() {
    const montantAjout = prompt("Combien d'argent souhaitez-vous ajouter?");
    if (!isNaN(montantAjout) && montantAjout > 0) {
      solde += parseInt(montantAjout);
      updateSolde();
    } else {
      alert("Veuillez entrer un montant valide.");
    }
  });

  $("#retirer").click(function() {
    const montantRetrait = prompt("Combien d'argent souhaitez-vous retirer?");
    if (!isNaN(montantRetrait) && montantRetrait > 0 && montantRetrait <= solde) {
      solde -= parseInt(montantRetrait);
      updateSolde();
    } else if (montantRetrait > solde) {
      alert("Vous n'avez pas suffisamment d'argent dans votre solde.");
    } else {
      alert("Veuillez entrer un montant valide.");
    }
  });
});

//  bouton Jouer
$(".btn-jouer").click(function() {
  // Vérifier si l'utilisateur a misé avant de jouer
  if (miseRouge === 0 && miseNoir === 0) {
    alert("Vous devez d'abord effectuer une mise avant de jouer.");
  } else {
    spinRoulette();
  }
});


//  boutons Rouge et Noir
$(".btn-rouge").click(function() {
  if (miseNoir === 0) {
    const montantMiseRouge = prompt("Combien voulez-vous miser sur rouge?");
    if (!isNaN(montantMiseRouge) && montantMiseRouge > 0 && montantMiseRouge <= solde) {
      miseRouge += parseInt(montantMiseRouge);
      solde -= miseRouge;
      updateSolde();
    } else {
      alert("Veuillez entrer un montant valide ou vous avez déjà misé sur Noir.");
    }
  } else {
    alert("Vous ne pouvez pas miser sur le Rouge et le Noir en même temps.");
  }
});

$(".btn-noir").click(function() {
  if (miseRouge === 0) {
    const montantMiseNoir = prompt("Combien voulez-vous miser sur noir?");
    if (!isNaN(montantMiseNoir) && montantMiseNoir > 0 && montantMiseNoir <= solde) {
      miseNoir += parseInt(montantMiseNoir);
      solde -= miseNoir;
      updateSolde();
    } else {
      alert("Veuillez entrer un montant valide ou vous avez déjà misé sur Rouge.");
    }
  } else {
    alert("Vous ne pouvez pas miser sur le Rouge et le Noir en même temps.");
  }
});

// Annuler la mise
$(".btn-annuler-mise").click(function() {
  if (miseRouge > 0 || miseNoir > 0) {
    solde += miseRouge + miseNoir; // Restituer le montant total misé au solde
    miseRouge = 0; // Réinitialiser la mise Rouge à zéro
    miseNoir = 0; // Réinitialiser la mise Noir à zéro
    updateSolde(); //  l'affichage du solde
  } else {
    alert("Vous n'avez pas encore misé.");
  }
});

// mise à jour du solde 
function updateSolde() {
  $("#solde").text("Votre solde est: " + solde);
  $(".mise-rouge").text("Mise Rouge: " + miseRouge);
  $(".mise-noir").text("Mise Noir: " + miseNoir);

  // affichage dynamique du montant de la mise 
  const totalMise = miseRouge + miseNoir;
  $("h3").text("Votre mise est: " + totalMise);
}
