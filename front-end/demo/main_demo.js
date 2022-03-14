var splash_screen = document.getElementById("splash_screen");

let splash_time = setTimeout(() => {
  splash_screen.style.display = "none";
}, 5000);

var serveurUrl = "https://isiscapitalist.kk.kurasawa.fr/"; 
var currentWorld; 

// setInterval(function() {calcScore();}, 100);

$(document).ready(function () {        
  $.getJSON(serveurUrl + "adventureisis/generic/world", function (world) {         
    currentWorld = world;         

    document.getElementById("name").innerHTML = "A Forrest World";
    document.getElementById("score").innerHTML = "Score total : 36,368,961 $";
    document.getElementById("logo_joueur").src = "images/shit_happens.png";

    document.getElementById("money").innerHTML = "87,161 $";
    document.getElementById("activeangels").innerHTML = "6";
    document.getElementById("angelbonus").innerHTML = "2 %";
    document.getElementById("totalangels").innerHTML = "162";

    document.getElementById("icon_nike").src = "images/icon_nike.png";
    document.getElementById("icon_pingpong").src = "images/icon_pingpong.png";
    document.getElementById("icon_football").src = "images/icon_football.png";
    document.getElementById("icon_schrimp").src = "images/icon_schrimp.png";
    document.getElementById("icon_chocolate").src = "images/icon_chocolate.png";
    document.getElementById("icon_van").src = "images/icon_van.png";
    
    document.getElementById("titre_upgrade_one").innerHTML = "Lancement du Macintosh";
    document.getElementById("logo_upgrade_one").innerHTML = world.upgrades.pallier[0].logo;
    document.getElementById("action_upgrade_one").innerHTML = "Bonus : " + world.upgrades.pallier[0].typeratio + " * " + world.upgrades.pallier[0].ratio;
    document.getElementById("cost_upgrade_one").innerHTML = world.upgrades.pallier[0].seuil + " $";
    document.getElementById("titre_upgrade_two").innerHTML = "Lancement de l'iMac";
    document.getElementById("logo_upgrade_two").innerHTML = world.upgrades.pallier[1].logo;
    document.getElementById("action_upgrade_two").innerHTML = "Bonus : " + world.upgrades.pallier[1].typeratio + " * " + world.upgrades.pallier[1].ratio;
    document.getElementById("cost_upgrade_two").innerHTML = world.upgrades.pallier[1].seuil + " $";
    document.getElementById("titre_upgrade_three").innerHTML = "Lancement de l'iPod";
    document.getElementById("logo_upgrade_two").innerHTML = world.upgrades.pallier[2].logo;
    document.getElementById("action_upgrade_three").innerHTML = "Bonus : " + world.upgrades.pallier[2].typeratio + " * " + world.upgrades.pallier[2].ratio;
    document.getElementById("cost_upgrade_three").innerHTML = world.upgrades.pallier[2].seuil + " $";
    document.getElementById("titre_upgrade_four").innerHTML = "Lancement du Macbook";
    document.getElementById("logo_upgrade_four").innerHTML = world.angelupgrades.pallier[0].logo;
    document.getElementById("action_upgrade_four").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[0].ratio;
    document.getElementById("cost_upgrade_four").innerHTML = world.angelupgrades.pallier[0].seuil + " $";
    document.getElementById("titre_upgrade_five").innerHTML = "Lancement de l'iPhone";
    document.getElementById("logo_upgrade_five").innerHTML = world.angelupgrades.pallier[1].logo;
    document.getElementById("action_upgrade_five").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[1].ratio;
    document.getElementById("cost_upgrade_five").innerHTML = world.angelupgrades.pallier[1].seuil + " $";
    document.getElementById("titre_upgrade_six").innerHTML = "Lancement de l'iPad";
    document.getElementById("logo_upgrade_six").innerHTML = world.angelupgrades.pallier[2].logo;
    document.getElementById("action_upgrade_six").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[2].ratio;
    document.getElementById("cost_upgrade_six").innerHTML = world.angelupgrades.pallier[2].seuil + " $";
    document.getElementById("titre_upgrade_seven").innerHTML = "Lancement des Airpods";
    document.getElementById("logo_upgrade_seven").innerHTML = world.angelupgrades.pallier[3].logo;
    document.getElementById("action_upgrade_seven").innerHTML = "Bonus de production : " + world.angelupgrades.pallier[3].ratio;
    document.getElementById("cost_upgrade_seven").innerHTML = world.angelupgrades.pallier[3].seuil + " $";
    
    document.getElementById("logo_upgrade_one").onclick = function() {document.getElementById("logo_upgrade_one").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_two").onclick = function() {document.getElementById("logo_upgrade_two").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_three").onclick = function() {document.getElementById("logo_upgrade_three").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_four").onclick = function() {document.getElementById("logo_upgrade_four").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_five").onclick = function() {document.getElementById("logo_upgrade_five").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_six").onclick = function() {document.getElementById("logo_upgrade_six").style.filter = "brightness(50%)"} 
    document.getElementById("logo_upgrade_seven").onclick = function() {document.getElementById("logo_upgrade_seven").style.filter = "brightness(50%)"} 

    document.getElementById("manager_name_nike").innerHTML = "Forrest Gump";
    document.getElementById("manager_seuil_nike").innerHTML = world.managers.pallier[0].seuil + " $";
    document.getElementById("manager_logo_nike").src = "images/manager_nike.png";
    document.getElementById("manager_name_pingpong").innerHTML = "Lieutenant Dan";
    document.getElementById("manager_seuil_pingpong").innerHTML = world.managers.pallier[1].seuil + " $";
    document.getElementById("manager_logo_pingpong").src = "images/manager_pingpong.png";
    document.getElementById("manager_name_football").innerHTML = "Président JFK";
    document.getElementById("manager_seuil_football").innerHTML = world.managers.pallier[2].seuil + " $";
    document.getElementById("manager_logo_football").src = "images/manager_football.png";
    document.getElementById("manager_name_schrimp").innerHTML = "Bubba";
    document.getElementById("manager_seuil_schrimp").innerHTML = world.managers.pallier[3].seuil + " $";
    document.getElementById("manager_logo_schrimp").src = "images/manager_schrimp.png";
    document.getElementById("manager_name_chocolate").innerHTML = "Madame Gump";
    document.getElementById("manager_seuil_chocolate").innerHTML = world.managers.pallier[4].seuil + " $";
    document.getElementById("manager_logo_chocolate").src = "images/manager_chocolate.png";
    document.getElementById("manager_name_van").innerHTML = "Jenny";
    document.getElementById("manager_seuil_van").innerHTML = world.managers.pallier[5].seuil + " $";
    document.getElementById("manager_logo_van").src = "images/manager_van.png";
    
    document.getElementById("manager_logo_nike").onclick = function() {document.getElementById("manager_logo_nike").style.filter = "brightness(100%)"} 
    document.getElementById("manager_logo_pingpong").onclick = function() {document.getElementById("manager_logo_pingpong").style.filter = "brightness(100%)"} 
    document.getElementById("manager_logo_football").onclick = function() {document.getElementById("manager_logo_football").style.filter = "brightness(100%)"} 
    document.getElementById("manager_logo_schrimp").onclick = function() {document.getElementById("manager_logo_schrimp").style.filter = "brightness(100%)"} 
    document.getElementById("manager_logo_chocolate").onclick = function() {document.getElementById("manager_logo_chocolate").style.filter = "brightness(100%)"} 
    document.getElementById("manager_logo_van").onclick = function() {document.getElementById("manager_logo_van").style.filter = "brightness(100%)"} 

    document.getElementById("icon_first_unlock").src = "images/unlock_van.png";
    document.getElementById("first_unlock_name").innerHTML = "De quoi remplir le van";
    document.getElementById("first_unlock_quota").innerHTML = "7 unités de chaque produit";
    document.getElementById("first_unlock_typebonus").innerHTML = "Type de bonus : " + world.allunlocks.pallier[0].typeratio;
    document.getElementById("first_unlock_bonus").innerHTML = "Valeur du bonus : " + world.allunlocks.pallier[0].ratio;
    document.getElementById("icon_second_unlock").src = "images/unlock_football.png";
    document.getElementById("second_unlock_name").innerHTML = "Une équipe de football US complète";
    document.getElementById("second_unlock_quota").innerHTML = "45 unités de chaque produit";
    document.getElementById("second_unlock_typebonus").innerHTML = "Type de bonus : " + world.allunlocks.pallier[1].typeratio;
    document.getElementById("second_unlock_bonus").innerHTML = "Valeur de bonus : " + world.allunlocks.pallier[1].ratio;
         
    document.getElementById("icon_first_unlock").onclick = function() {document.getElementById("icon_first_unlock").style.filter = "brightness(50%)"} 
    document.getElementById("icon_second_unlock").onclick = function() {document.getElementById("icon_second_unlock").style.filter = "brightness(50%)"} 

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
    var tps_0 = currentWorld.products.product[0].vitesse;
    var id = 0;
    document.getElementById("icon_nike").style.filter = "brightness(50%)";
    document.getElementById("nike_time").innerHTML = tps_0/1000 + " sec";
    bar_1.set(1);
    bar_1.animate(0, {duration: tps_0});
    setTimeout(function(){document.getElementById("icon_nike").style.filter = "brightness(100%)"},tps_0);

  } else if(id_logo == "icon_pingpong") {
    var tps_1 = currentWorld.products.product[1].vitesse;
    var id = 1;
    document.getElementById("icon_pingpong").style.filter = "brightness(50%)";
    document.getElementById("pingpong_time").innerHTML = tps_1/1000 + " sec";
    bar_2.set(1);
    bar_2.animate(0, {duration: tps_1});
    setTimeout(function(){document.getElementById("icon_pingpong").style.filter = "brightness(100%)"},tps_1);
  } else if(id_logo == "icon_football") {
    var tps_2 = currentWorld.products.product[2].vitesse;
    var id = 2;
    document.getElementById("icon_football").style.filter = "brightness(50%)";
    document.getElementById("football_time").innerHTML = tps_2/1000 + " sec";
    bar_3.set(1);
    bar_3.animate(0, {duration: tps_2});
    setTimeout(function(){document.getElementById("icon_football").style.filter = "brightness(100%)"},tps_2);
  } else if(id_logo == "icon_schrimp") {
    var tps_3 = currentWorld.products.product[3].vitesse;
    var id = 3;
    document.getElementById("icon_schrimp").style.filter = "brightness(50%)";
    document.getElementById("schrimp_time").innerHTML = tps_3/1000 + " sec";
    bar_4.set(1);
    bar_4.animate(0, {duration: tps_3});
    setTimeout(function(){document.getElementById("icon_schrimp").style.filter = "brightness(100%)"},tps_3);
  } else if(id_logo == "icon_chocolate") {
    var tps_4 = currentWorld.products.product[4].vitesse;
    var id = 4;
    document.getElementById("icon_chocolate").style.filter = "brightness(50%)";
    document.getElementById("chocolate_time").innerHTML = tps_4/1000 + " sec";
    bar_5.set(1);
    bar_5.animate(0, {duration: tps_4});
    setTimeout(function(){document.getElementById("icon_chocolate").style.filter = "brightness(100%)"},tps_4);
  } else if(id_logo == "icon_van") {
    var tps_5 = currentWorld.products.product[5].vitesse;
    var id = 5;
    document.getElementById("icon_van").style.filter = "brightness(50%)";
    document.getElementById("van_time").innerHTML = tps_5/1000 + " sec";
    bar_6.set(1);
    bar_6.animate(0, {duration: tps_5});
    setTimeout(function(){document.getElementById("icon_van").style.filter = "brightness(100%)"},tps_5);
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