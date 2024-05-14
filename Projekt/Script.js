
var save = document.getElementById("save");

const vorhanden = [0, 0, 0, 0, 0, 0];
const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "Phad Thai", "Tagesessen"];




save.addEventListener("click", addNotiz);

function addNotiz(event){
    
    var aufnehmen = document.getElementsByClassName("aufnehmen");
    for(i = 0; i < namen.length; i++){
        localStorage.setItem(namen[i], aufnehmen[i].value);
    }
    //seite wechseln
    window.location = "index.html";

    
}   




