
//const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
//const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
//counter = localStorage.getItem("counter");

//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('example.db');
const db = "datenbank.db";

// laden von Vorhanden
    vorhandenfunc();

// laden von Bestellungen
    bestellungen();

    
    async function requestTextWithGET(url) {
        const response = await fetch(url);
        const text = await response.text();
        return text;
      }
    
    async function sendJSONStringWithPOST(url, jsonString) {
        const response = await fetch(url, {
          method: 'POST',
          body: jsonString,
        });
      }

    async function updatePATCH(url, jsonString) {
        const response = await fetch(url, {
          method: 'PATCH',
          body: jsonString,
        });
      }

    async function deleteBestellung(url) {
        const response = await fetch(url, {
            method: 'DELETE',
          });
      }

    function löschNotiz(event){
        let ausstehend = JSON.parse(requestTextWithGET("http://localhost:3000/Ausstehend"));
       // let ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
        //let target =  JSON.parse(localStorage.getItem("Bestellung " + event.target.id));
        let target = JSON.parse(requestTextWithGET("http://localhost:3000/Bestellungen/"+ event.target.id));

        for(i = 0; i < 6; i++){
            let key = Object.keys(target)[i];
            /*if((ausstehend[key] -= target[key]) < 0){
                ausstehend[key] = 0;
            }
            else{
            ausstehend[key] -= target[key];
            }*/
            ausstehend[key] -= target[key];
        }

        //let ausstehendString = JSON.stringify(ausstehend);
        //localStorage.setItem("Ausstehend", ausstehendString);
        //{dataChange}
        updatePATCH("http://localhost:3000/Vorhanden", JSON.stringify(vorhanden));

        //localStorage.removeItem("Bestellung " + event.target.id);
        deleteBestellung("http://localhost:3000/Bestellungen/"+ event.target.id);
        
        
       bestellungen();
    }
    function abschließnotiz(event){
        
        //let target = JSON.parse(localStorage.getItem("Bestellung " + event.target.id));
        let target = JSON.parse(requestTextWithGET("http://localhost:3000/Bestellungen/"+ event.target.id));
        
        let vorhanden = JSON.parse(requestTextWithGET("http://localhost:3000/Vorhanden"));
        let ready = true;

        for(i = 0; i < 6; i++){
            let key = Object.keys(target)[i];
            if(vorhanden[key] < target[key]){
                ready = false;
            }
        }
        if(ready == true){
        for(i = 0; i < 6; i++){
            let key = Object.keys(target)[i];
            vorhanden[key] -= target[key];
        }

        
        
        //let vorhandenString = JSON.stringify(vorhanden);
        //localStorage.setItem("Vorhanden", vorhandenString);
       updatePATCH("http://localhost:3000/Vorhanden", JSON.stringify(vorhanden));

        //localStorage.removeItem("Bestellung " + event.target.id);
        //Delete Func
        deleteBestellung("http://localhost:3000/Bestellungen/" + event.target.id);

        bestellungen();
        
        vorhandenfunc();
        }
}
           
function bestellungen(event){
        
    if(document.getElementById("notizen") != null){
    let pastNotizen = document.getElementById("notizen");
    pastNotizen.remove();
    }


    let notizen = document.createElement("div");
        let bestellungen = document.getElementById("bestellungen");
        notizen.id = "notizen";
        bestellungen.appendChild(notizen);

    //let anz = db.get('SELECT COUNT FROM Auswahl WHERE Art = "Bestellung"');
    //let target = db.get('SELECT columns FROM Auswahl ORDER BY row.id WHERE Art = "Bestellung"');
    //for(j = 1; j <= anz; j++) {
    db.each('Select * FROM Auswahl WHERE Art = ?', ["Bestellungen"], (err, row) => {
        //if(JSON.parse(localStorage.getItem("Bestellung " + j)) != null){
        let aufschriebObj = JSON.parse(row);
        
        let empty = true;
    
        for(l = 1; l < Object.keys(aufschriebObj).length; l++){
            if(Object.values(aufschriebObj)[l] > 0){
                empty = false;
            }
        }
        if(empty == false){
        
        let notiz = document.createElement("div");
        notizen.appendChild(notiz);
        notiz.className = "notiz";
        notiz.id = "notiz" + row.id;
    
        let löschen = document.createElement("input")
        löschen.value = "X";
        löschen.className = "löschen";
        löschen.id = row.id;
        löschen.type = "button";
        löschen.addEventListener("click", löschNotiz);
        notiz.appendChild(löschen);
    
        let notizliste = document.createElement("div");
        notiz.appendChild(notizliste);
        notizliste.className = "notizliste";
    
        //<h2 id="notiztitel">Bestellung 1</h2>
        let notiztitel = document.createElement("h2");
        notiztitel.id = "notiztitel";
        notiztitel.innerText = "Bestellung " + row.id;
        notizliste.appendChild(notiztitel);
       
    
        //mit objekten arbeiten
       // let ready = true;
        
        for(i = 1; i < Object.keys(aufschriebObj).length; i++){
           
            if(Object.values(aufschriebObj)[i] > 0){
                let notizTeil = document.createElement("p");
                notizTeil.textContent = Object.keys(aufschriebObj)[i] + ": " + Object.values(aufschriebObj)[i];
                notizTeil.className = "notiztext";
                notizliste.appendChild(notizTeil);
                notizliste.appendChild(document.createElement("br"));
                
              /*  if(vorhanden[i] < Object.values(aufschriebObj)[i]){
                    ready = false;
                }*/
            }
        }
    
        let abschließen = document.createElement("input")
        abschließen.value = "Abschließen";
        abschließen.className = "abschließen";
        abschließen.id = row.id;
        abschließen.type = "button";
        abschließen.addEventListener("click", abschließnotiz);
        notizliste.appendChild(abschließen);
        
        // zu der Liste der Austehenden hinzufügen
        
        /*if(ready == true){
            let anzeige = document.createElement("p");
            notiz.appendChild(anzeige);
            anzeige.textContent = "Bereit";
            anzeige.className = "ready";
        }*/

    }
    
   // }
    });
}

    function vorhandenfunc(event){

        /*if(localStorage.getItem("Vorhanden") == null){
            const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
                let vorhandenString = JSON.stringify(vorhanden);
                localStorage.setItem("Vorhanden", vorhandenString);
        }*/
        if(document.getElementById("liste") != null){
            let pastListe = document.getElementById("liste");
            pastListe.remove();
        }
       // hier war Localstorage
        let vorhandenObj = JSON.parse(requestTextWithGET("http://localhost:3000/Vorhanden"));
        
        let liste = document.createElement("div");
        liste.id = "liste";
        let box2 = document.getElementById("box2");
        box2.appendChild(liste);
        for(i = 1; i < Object.keys(vorhandenObj).length; i++){
               
            if(Object.values(vorhandenObj)[i] > 0){
                let vorhandenListe = document.createElement("p");
                vorhandenListe.textContent = Object.keys(vorhandenObj)[i] + ": " + Object.values(vorhandenObj)[i];
                vorhandenListe.className = "vorhanden-liste";
                liste.appendChild(vorhandenListe);
                liste.appendChild(document.createElement("br"));
                
            }
        }
    }
        //let vorhanden = document.getElementsByClassName("vorhanden-liste");
        //let notiz = document.getElementsByClassName("notiztext");
    