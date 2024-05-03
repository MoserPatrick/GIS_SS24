
var save = document.getElementById("save");
console.log(document.getElementById("save"));
save.addEventListener("click", addNotiz);
const liste = ["Fühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "Phad Thai", "Tagesessen"];

function addNotiz(event){
    console.log(Funkt9ion);
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

    for(var i; i < liste.length - 1; i++){
    var notizTeil = document.createElement("p");
    notizTeil.textContent = liste(i) + ": " + document.getElementsByClassName("aufnehmen"[i]);
    notizTeil.className = "notiztext";
    document.notiz.appendChild(notizTeil);
    console.log(Loop);
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

