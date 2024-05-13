
var save = document.getElementById("save");

const vorhanden = [0, 0, 0, 0, 0, 0];
const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "Phad Thai", "Tagesessen"];




save.addEventListener("click", addNotiz);

function addNotiz(event){
    
    var aufnehmen = document.getElementsByClassName("aufnehmen");
    for(i = 0; i < aufnehmen.length; i++){
        localStorage.setItem(namen[i], aufnehmen[i].value);
    }
    

    var notiz = document.createElement("div");
    document.Bestellungen.appendChild(notiz);
    notiz.className = "notiz";

    var löschen = document.createElement("input")
    löschen.innerText = "X";
    löschen.id = "löschen";
    löschen.addEventListener("click", löschNotiz);
    document.notiz.appendChild(löschen);

    var notizliste = document.createElement("div");
    document.notiz.appendChild(notizliste);
    notizliste.className = "notizliste";

    for(i = 0; i < aufnehmen.length - 1; i++){
    var notizTeil = document.createElement("p");
    notizTeil.textContent = namen[i] + ": " + aufnehmen[i].value;
    notizTeil.className = "notiztext";
    document.notiz.appendChild(notizTeil);
    }

    var abschließen = document.createElement("input")
    abschließen.innerText = "Abschließen";
    abschließen.id = "abschließen";
    abschließen.addEventListener("click", abschließnotiz);
    notiz.appendChild(abschließen);
    
}   

function löschNotiz(event){

}
function abschließnotiz(event){

}


