const vorhanden = [0, 0, 0, 0, 0, 0];
const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "Phad Thai", "Tagesessen"];



let notiz = document.createElement("div");
let bestellungen = document.getElementById("bestellungen");
    bestellungen.appendChild(notiz);
    notiz.className = "notiz";

    let löschen = document.createElement("input")
    löschen.value = "X";
    löschen.id = "löschen";
    löschen.type = "button";
    löschen.addEventListener("click", löschNotiz);
    notiz.appendChild(löschen);

    let notizliste = document.createElement("div");
    notiz.appendChild(notizliste);
    notizliste.className = "notizliste";

    //<h2 id="notiztitel">Bestellung 1</h2>
    let notiztitel = document.createElement("h2");
    notiztitel.id = "notiztitel";
    notiztitel.innerText = "Bestellung" ;
    notizliste.appendChild(notiztitel);


    //mit objekten arbeiten
    for(i = 0; i < namen.length; i++){
        console.log(namen[i]);
        console.log(localStorage.getItem(namen[i]));
        if(localStorage.getItem(namen[i]) > 0){
            let notizTeil = document.createElement("p");
            notizTeil.textContent = namen[i] + ": " + localStorage.getItem(namen[i]);
            notizTeil.className = "notiztext";
            notizliste.appendChild(notizTeil);
            notizliste.appendChild(document.createElement("br"));
            
        }
    }

    let abschließen = document.createElement("input")
    abschließen.value = "Abschließen";
    abschließen.id = "abschließen";
    abschließen.type = "button";
    abschließen.addEventListener("click", abschließnotiz);
    notizliste.appendChild(abschließen);
    
    // zu der Liste der Austehenden hinzufügen

   


    function löschNotiz(event){
        let vorhanden = document.getElementsByClassName("vorhanden-liste");
        let notiz = document.getElementsByClassName("notiztext");
    }
    function abschließnotiz(event){
        console.log(event.target.id);
        let vorhanden = document.getElementsByClassName("vorhanden-liste");
        let notiz = document.getElementsByClassName("notiztext");
    }