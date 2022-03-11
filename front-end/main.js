var splash_screen = document.getElementById("splash_screen");

let splash_time = setTimeout(() => {
  splash_screen.style.display = "none";
}, 1000);

var serveurUrl = "https://isiscapitalist.kk.kurasawa.fr/"; 
var currentWorld; 

// setInterval(function() {calcScore();}, 100);

$(document).ready(function () {        
  $.getJSON(serveurUrl + "adventureisis/generic/world", function (world) {         
    currentWorld = world;         

    document.getElementById("name").innerHTML = world.name;
    document.getElementById("score").innerHTML = "Score total : " + world.score + " $";
    document.getElementById("logo_joueur").src = world.logo;

    document.getElementById("money").innerHTML = world.money + " $";
    document.getElementById("activeangels").innerHTML = world.activeangels;
    document.getElementById("angelbonus").innerHTML = world.angelbonus + "%";
    document.getElementById("totalangels").innerHTML = world.totalangels;

    document.getElementById("icon_nike").src = world.products.product[0].logo;
    document.getElementById("icon_pingpong").src = world.products.product[1].logo;
    document.getElementById("icon_football").src = world.products.product[2].logo;
    document.getElementById("icon_schrimp").src = world.products.product[3].logo;
    document.getElementById("icon_chocolate").src = world.products.product[4].logo;
    document.getElementById("icon_van").src = world.products.product[5].logo;
    
    document.getElementById("titre_upgrade_one").innerHTML = world.upgrades.pallier[0].name;
    document.getElementById("logo_upgrade_one").innerHTML = world.upgrades.pallier[0].logo;
    document.getElementById("action_upgrade_one").innerHTML = "Bonus : " + world.upgrades.pallier[0].typeratio + " * " + world.upgrades.pallier[0].ratio;
    document.getElementById("cost_upgrade_one").innerHTML = world.upgrades.pallier[0].seuil + " $";
    document.getElementById("titre_upgrade_two").innerHTML = world.upgrades.pallier[1].name;
    document.getElementById("logo_upgrade_two").innerHTML = world.upgrades.pallier[1].logo;
    document.getElementById("action_upgrade_two").innerHTML = "Bonus : " + world.upgrades.pallier[1].typeratio + " * " + world.upgrades.pallier[1].ratio;
    document.getElementById("cost_upgrade_two").innerHTML = world.upgrades.pallier[1].seuil + " $";
    document.getElementById("titre_upgrade_three").innerHTML = world.upgrades.pallier[2].name;
    document.getElementById("logo_upgrade_two").innerHTML = world.upgrades.pallier[2].logo;
    document.getElementById("action_upgrade_three").innerHTML = "Bonus : " + world.upgrades.pallier[2].typeratio + " * " + world.upgrades.pallier[2].ratio;
    document.getElementById("cost_upgrade_three").innerHTML = world.upgrades.pallier[2].seuil + " $";
    document.getElementById("titre_upgrade_four").innerHTML = world.angelupgrades.pallier[0].name;
    document.getElementById("logo_upgrade_four").innerHTML = world.angelupgrades.pallier[0].logo;
    document.getElementById("action_upgrade_four").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[0].ratio;
    document.getElementById("cost_upgrade_four").innerHTML = world.angelupgrades.pallier[0].seuil + " $";
    document.getElementById("titre_upgrade_five").innerHTML = world.angelupgrades.pallier[1].name;
    document.getElementById("logo_upgrade_five").innerHTML = world.angelupgrades.pallier[1].logo;
    document.getElementById("action_upgrade_five").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[1].ratio;
    document.getElementById("cost_upgrade_five").innerHTML = world.angelupgrades.pallier[1].seuil + " $";
    document.getElementById("titre_upgrade_six").innerHTML = world.angelupgrades.pallier[2].name;
    document.getElementById("logo_upgrade_six").innerHTML = world.angelupgrades.pallier[2].logo;
    document.getElementById("action_upgrade_six").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[2].ratio;
    document.getElementById("cost_upgrade_six").innerHTML = world.angelupgrades.pallier[2].seuil + " $";
    document.getElementById("titre_upgrade_seven").innerHTML = world.angelupgrades.pallier[3].name;
    document.getElementById("logo_upgrade_seven").innerHTML = world.angelupgrades.pallier[3].logo;
    document.getElementById("action_upgrade_seven").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[3].ratio;
    document.getElementById("cost_upgrade_seven").innerHTML = world.angelupgrades.pallier[3].seuil + " $";
    
    if (world.upgrades.pallier[0].unlocked) {document.getElementById("logo_upgrade_one").style.filter = "brightness(50%)"} 
    if (world.upgrades.pallier[1].unlocked) {document.getElementById("logo_upgrade_two").style.filter = "brightness(50%)"} 
    if (world.upgrades.pallier[2].unlocked) {document.getElementById("logo_upgrade_three").style.filter = "brightness(50%)"} 
    if (world.angelupgrades.pallier[0].unlocked) {document.getElementById("logo_upgrade_four").style.filter = "brightness(50%)"} 
    if (world.angelupgrades.pallier[1].unlocked) {document.getElementById("logo_upgrade_five").style.filter = "brightness(50%)"} 
    if (world.angelupgrades.pallier[2].unlocked) {document.getElementById("logo_upgrade_six").style.filter = "brightness(50%)"} 
    if (world.angelupgrades.pallier[3].unlocked) {document.getElementById("logo_upgrade_seven").style.filter = "brightness(50%)"} 
    
    document.getElementById("qte_nike").innerHTML = world.products.product[0].quantite;
    document.getElementById("qte_pingpong").innerHTML = world.products.product[1].quantite;
    document.getElementById("qte_football").innerHTML = world.products.product[2].quantite;
    document.getElementById("qte_schrimp").innerHTML = world.products.product[3].quantite;
    document.getElementById("qte_chocolate").innerHTML = world.products.product[4].quantite;
    document.getElementById("qte_van").innerHTML = world.products.product[5].quantite;
    document.getElementById("nike_suppl").innerHTML = world.products.product[0].cout + " $";
    document.getElementById("pingpong_suppl").innerHTML = world.products.product[1].cout + " $";
    document.getElementById("football_suppl").innerHTML = world.products.product[2].cout + " $";
    document.getElementById("schrimp_suppl").innerHTML = world.products.product[3].cout + " $";
    document.getElementById("chocolate_suppl").innerHTML = world.products.product[4].cout + " $";
    document.getElementById("van_suppl").innerHTML = world.products.product[5].cout + " $";

    document.getElementById("manager_name_nike").innerHTML = world.managers.pallier[0].name;
    document.getElementById("manager_seuil_nike").innerHTML = world.managers.pallier[0].seuil + " $";
    document.getElementById("manager_logo_nike").src = world.managers.pallier[0].logo;
    document.getElementById("manager_name_pingpong").innerHTML = world.managers.pallier[1].name;
    document.getElementById("manager_seuil_pingpong").innerHTML = world.managers.pallier[1].seuil + " $";
    document.getElementById("manager_logo_pingpong").src = world.managers.pallier[1].logo;
    document.getElementById("manager_name_football").innerHTML = world.managers.pallier[2].name;
    document.getElementById("manager_seuil_football").innerHTML = world.managers.pallier[2].seuil + " $";
    document.getElementById("manager_logo_football").src = world.managers.pallier[2].logo;
    document.getElementById("manager_name_schrimp").innerHTML = world.managers.pallier[3].name;
    document.getElementById("manager_seuil_schrimp").innerHTML = world.managers.pallier[3].seuil + " $";
    document.getElementById("manager_logo_schrimp").src = world.managers.pallier[3].logo;
    document.getElementById("manager_name_chocolate").innerHTML = world.managers.pallier[4].name;
    document.getElementById("manager_seuil_chocolate").innerHTML = world.managers.pallier[4].seuil + " $";
    document.getElementById("manager_logo_chocolate").src = world.managers.pallier[4].logo;
    document.getElementById("manager_name_van").innerHTML = world.managers.pallier[5].name;
    document.getElementById("manager_seuil_van").innerHTML = world.managers.pallier[5].seuil + " $";
    document.getElementById("manager_logo_van").src = world.managers.pallier[5].logo;
    
    if (world.managers.pallier[0].unlocked) {document.getElementById("manager_logo_nike").style.filter = "brightness(50%)"} 
    if (world.managers.pallier[1].unlocked) {document.getElementById("manager_logo_pingpong").style.filter = "brightness(50%)"} 
    if (world.managers.pallier[2].unlocked) {document.getElementById("manager_logo_football").style.filter = "brightness(50%)"} 
    if (world.managers.pallier[3].unlocked) {document.getElementById("manager_logo_schrimp").style.filter = "brightness(50%)"} 
    if (world.managers.pallier[4].unlocked) {document.getElementById("manager_logo_chocolate").style.filter = "brightness(50%)"} 
    if (world.managers.pallier[5].unlocked) {document.getElementById("manager_logo_van").style.filter = "brightness(50%)"} 

    document.getElementById("icon_first_unlock").src = world.allunlocks.pallier[0].logo;
    document.getElementById("first_unlock_name").innerHTML = world.allunlocks.pallier[0].name;
    document.getElementById("first_unlock_quota").innerHTML = world.allunlocks.pallier[0].seuil + " unités de chaque produit";
    document.getElementById("first_unlock_typebonus").innerHTML = "Type de bonus : " + world.allunlocks.pallier[0].typeratio;
    document.getElementById("first_unlock_bonus").innerHTML = "Valeur du bonus : " + world.allunlocks.pallier[0].ratio;
    document.getElementById("icon_second_unlock").src = world.allunlocks.pallier[1].logo;
    document.getElementById("second_unlock_name").innerHTML = world.allunlocks.pallier[1].name;
    document.getElementById("second_unlock_quota").innerHTML = world.allunlocks.pallier[1].seuil + " unités de chaque produit";
    document.getElementById("second_unlock_typebonus").innerHTML = "Type de bonus : " + world.allunlocks.pallier[1].typeratio;
    document.getElementById("second_unlock_bonus").innerHTML = "Valeur de bonus : " + world.allunlocks.pallier[1].ratio;
         
    if (world.allunlocks.pallier[0].unlocked) {document.getElementById("icon_first_unlock").style.filter = "brightness(50%)"} 
    // else {document.getElementById("icon_first_unlock").onclick = function() {world.allunlocks.pallier[0].unlocked = true;}}
    if (world.allunlocks.pallier[1].unlocked) {document.getElementById("icon_second_unlock").style.filter = "brightness(50%)"} 
    // else {document.getElementById("icon_second_unlock").onclick = function() {world.allunlocks.pallier[1].unlocked = true;}}

    $.each(world.products.product, function (index, product) {            
      // remplir le layout avec les infos de chaque produit         
    });
    
    
  });  
}); 

document.getElementById("display_infos").onmouseover = function() {
  document.getElementById("infos_user").style.visibility = "visible";
  document.getElementById("infos_user_background").style.visibility = "visible";
}
document.getElementById("display_infos").onmouseout = function() {
  document.getElementById("infos_user").style.visibility = "hidden";
  document.getElementById("infos_user_background").style.visibility = "hidden";
}

feather.onclick = function() {
   if (document.getElementById("vitesse").innerHTML == "x1") {
    document.getElementById("vitesse").innerHTML = "x2";
    document.getElementById("buy_nike_button").innerHTML = "Buy</br>x2";
    document.getElementById("buy_pingpong_button").innerHTML = "Buy</br>x2";
    document.getElementById("buy_football_button").innerHTML = "Buy</br>x2";
    document.getElementById("buy_schrimp_button").innerHTML = "Buy</br>x2";
    document.getElementById("buy_chocolate_button").innerHTML = "Buy</br>x2";
    document.getElementById("buy_van_button").innerHTML = "Buy</br>x2";
  } else if (document.getElementById("vitesse").innerHTML == "x2") {
    document.getElementById("vitesse").innerHTML = "x10";
    document.getElementById("buy_nike_button").innerHTML = "Buy</br>x10";
    document.getElementById("buy_pingpong_button").innerHTML = "Buy</br>x10";
    document.getElementById("buy_football_button").innerHTML = "Buy</br>x10";
    document.getElementById("buy_schrimp_button").innerHTML = "Buy</br>x10";
    document.getElementById("buy_chocolate_button").innerHTML = "Buy</br>x10";
    document.getElementById("buy_van_button").innerHTML = "Buy</br>x10";
  } else if (document.getElementById("vitesse").innerHTML == "x10") {
    document.getElementById("vitesse").innerHTML = "max";
    document.getElementById("buy_nike_button").innerHTML = "Buy</br>";
    document.getElementById("buy_pingpong_button").innerHTML = "Buy</br>";
    document.getElementById("buy_football_button").innerHTML = "Buy</br>";
    document.getElementById("buy_schrimp_button").innerHTML = "Buy</br>";
    document.getElementById("buy_chocolate_button").innerHTML = "Buy</br>";
    document.getElementById("buy_van_button").innerHTML = "Buy</br>";
  } else {
    document.getElementById("vitesse").innerHTML = "x1";
    document.getElementById("buy_nike_button").innerHTML = "Buy</br>x1";
    document.getElementById("buy_pingpong_button").innerHTML = "Buy</br>x1";
    document.getElementById("buy_football_button").innerHTML = "Buy</br>x1";
    document.getElementById("buy_schrimp_button").innerHTML = "Buy</br>x1";
    document.getElementById("buy_chocolate_button").innerHTML = "Buy</br>x1";
    document.getElementById("buy_van_button").innerHTML = "Buy</br>x1";
  }
 }

// function timeLeft(temps) {
//   while (temps > 0) {
//     setTimeout(function(){temps - 100}, 100);
//     console.log(temps);
//   }
//   temps = 00;
//   console.log(temps);
// }

var bar_1 = new ProgressBar.Line(bar_nike, 
  {strokeWidth: 12, color: '#2C426D'});
var bar_2 = new ProgressBar.Line(bar_pingpong, 
  {strokeWidth: 12, color: '#2C426D'});
var bar_3 = new ProgressBar.Line(bar_football, 
  {strokeWidth: 12, color: '#2C426D'});
var bar_4 = new ProgressBar.Line(bar_schrimp, 
  {strokeWidth: 12, color: '#2C426D'});
var bar_5 = new ProgressBar.Line(bar_chocolate, 
  {strokeWidth: 12, color: '#2C426D'});
var bar_6 = new ProgressBar.Line(bar_van, 
  {strokeWidth: 12, color: '#2C426D'});

$(".object_icon").click(function (event) {

  var id_logo = $(this)[0].id;
  if(id_logo == "icon_nike") {
    var id = 0;
    document.getElementById("nike_time").innerHTML = currentWorld.products.product[0].vitesse;
    bar_1.set(1);
    bar_1.animate(0, {duration: 1000});
  } else if(id_logo == "icon_pingpong") {
    var id = 1;
    bar_2.set(1);
    bar_2.animate(0, {duration: 1000});
  } else if(id_logo == "icon_football") {
    var id = 2;
    bar_3.set(1);
    bar_3.animate(0, {duration: 1000});
  } else if(id_logo == "icon_schrimp") {
    var id = 3;
    bar_4.set(1);
    bar_4.animate(0, {duration: 1000});
  } else if(id_logo == "icon_chocolate") {
    var id = 4;
    bar_5.set(1);
    bar_5.animate(0, {duration: 1000});
  } else if(id_logo == "icon_van") {
    var id = 5;
    bar_6.set(1);
    bar_6.animate(0, {duration: 1000});
  }
  var product = currentWorld.products.product[id];
});

{
var title_cap = document.getElementById("title_cap");
var indication_modal = document.getElementById("indication_modal");
var managersPage = document.getElementById("managersPage");
var nav_managers = document.getElementById("nav_managers");
var managers_title = document.getElementById("managers_title");
var unlocksPage = document.getElementById("unlocksPage");
var nav_unlocks = document.getElementById("nav_unlocks");
var unlocks_title = document.getElementById("unlocks_title");
var upgradesPage = document.getElementById("upgradesPage");
var nav_upgrades = document.getElementById("nav_upgrades");
var upgrades_title = document.getElementById("upgrades_title");
var investorsPage = document.getElementById("investorsPage");
var nav_investors = document.getElementById("nav_investors");
var investors_title = document.getElementById("investors_title");

// When the user clicks on the button, open the modal
nav_managers.onclick = function() {
    managersPage.style.display = "block";
    managers_title.style.display = "block";
    title_cap.style.display = "block";
    indication_modal.style.display = "block";
}
// When the user clicks on the button, open the modal
nav_unlocks.onclick = function() {
    unlocksPage.style.display = "block";
    unlocks_title.style.display = "block";
    title_cap.style.display = "block";
    indication_modal.style.display = "block";
}
// When the user clicks on the button, open the modal
nav_upgrades.onclick = function() {
    upgradesPage.style.display = "block";
    upgrades_title.style.display = "block";
    title_cap.style.display = "block";
    indication_modal.style.display = "block";
}
// When the user clicks on the button, open the modal
nav_investors.onclick = function() {
    investorsPage.style.display = "block";
    investors_title.style.display = "block";
    title_cap.style.display = "block";
    indication_modal.style.display = "block";
}


document.addEventListener("click", closeModal);
function closeModal(event) {
  if (
    event.pageY < 215
  ) {
    title_cap.style.display = "none";
    indication_modal.style.display = "none";
    managersPage.style.display = "none";
    managers_title.style.display = "none";
    unlocksPage.style.display = "none";
    unlocks_title.style.display = "none";
    upgradesPage.style.display = "none";
    upgrades_title.style.display = "none";
    investorsPage.style.display = "none";
    investors_title.style.display = "none";
  }
}
}