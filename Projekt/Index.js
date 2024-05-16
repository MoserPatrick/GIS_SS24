
//const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
//const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
counter = localStorage.getItem("counter");



// laden von Vorhanden
if(localStorage.getItem("Vorhanden") == null){
    const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);
}
let vorhandenObj = JSON.parse(localStorage.getItem("Vorhanden"));

for(i = 0; i < Object.keys(vorhandenObj).length; i++){
       
    if(Object.values(vorhandenObj)[i] > 0){
        let vorhandenListe = document.createElement("p");
        let liste = document.getElementById("liste");
        vorhandenListe.textContent = Object.keys(vorhandenObj)[i] + ": " + Object.values(vorhandenObj)[i];
        vorhandenListe.className = "vorhanden-liste";
        liste.appendChild(vorhandenListe);
        liste.appendChild(document.createElement("br"));
        
    }
}

// laden von Bestellungen
for(j = 1; j <= counter; j++) {
   
    if(JSON.parse(localStorage.getItem("Bestellung " + j)) != null){
    let aufschriebObj = JSON.parse(localStorage.getItem("Bestellung " + j));
    
    let empty = true;

    for(l = 0; l < Object.keys(aufschriebObj).length; l++){
        if(Object.values(aufschriebObj)[l] > 0){
            empty = false;
        }
    }
    if(empty == false){
    let notiz = document.createElement("div");
    let bestellungen = document.getElementById("bestellungen");
    bestellungen.appendChild(notiz);
    notiz.className = "notiz";
    notiz.id = "notiz" + counter;

    let löschen = document.createElement("input")
    löschen.value = "X";
    löschen.className = "löschen";
    löschen.dataset.pressed = false;
    löschen.type = "button";
    löschen.addEventListener("click", löschNotiz);
    notiz.appendChild(löschen);

    let notizliste = document.createElement("div");
    notiz.appendChild(notizliste);
    notizliste.className = "notizliste";

    //<h2 id="notiztitel">Bestellung 1</h2>
    let notiztitel = document.createElement("h2");
    notiztitel.id = "notiztitel";
    notiztitel.innerText = "Bestellung " + j;
    notizliste.appendChild(notiztitel);
   

    //mit objekten arbeiten
    
    for(i = 0; i < Object.keys(aufschriebObj).length; i++){
       
        if(Object.values(aufschriebObj)[i] > 0){
            let notizTeil = document.createElement("p");
            notizTeil.textContent = Object.keys(aufschriebObj)[i] + ": " + Object.values(aufschriebObj)[i];
            notizTeil.className = "notiztext";
            notizliste.appendChild(notizTeil);
            notizliste.appendChild(document.createElement("br"));
            
        }
    }

    let abschließen = document.createElement("input")
    abschließen.value = "Abschließen";
    abschließen.className = "abschließen";
    abschließen.id = j;
    abschließen.type = "button";
    abschließen.addEventListener("click", abschließnotiz);
    notizliste.appendChild(abschließen);
    
    // zu der Liste der Austehenden hinzufügen
    
}

}
}





    function löschNotiz(event){
        let vorhanden = document.getElementsByClassName("vorhanden-liste");
        let notiz = document.getElementsByClassName("notiztext");
    }
    function abschließnotiz(event){
        
        let target = localStorage.getItem("Bestellung " + event.target.id);
        let ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
        let vorhanden = JSON.parse(localStorage.getItem("Vorhanden"));
        let ready = true;

        for(i = 0; i < 6; i++){
            let key = Object.keys(target)[i];
            if(vorhanden[key] < target[key]){
                ready = false;
            }
        }
        if(ready = true){
        for(i = 0; i < 6; i++){
            let key = Object.keys(target)[i];
            vorhanden[key] -= target[key];
        }



        localStorage.removeItem("Bestellung " + event.target.id);
        console.log(event.target.id);
        let cluster = document.getElementById("notiz" + event.target.id);
        cluster.remove();
        }
}
            
        //let vorhanden = document.getElementsByClassName("vorhanden-liste");
        //let notiz = document.getElementsByClassName("notiztext");
    