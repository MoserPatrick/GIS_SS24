
//const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
//const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
counter = localStorage.getItem("counter");



// laden von Vorhanden
    vorhandenfunc();

// laden von Bestellungen
    bestellungen();

    



    function löschNotiz(event){

        let ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
        let target =  JSON.parse(localStorage.getItem("Bestellung " + event.target.id));

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

        let ausstehendString = JSON.stringify(ausstehend);
        localStorage.setItem("Ausstehend", ausstehendString);

        localStorage.removeItem("Bestellung " + event.target.id);
        console.log(event.target.id);
        
        
       bestellungen();
    }
    function abschließnotiz(event){
        
        let target = JSON.parse(localStorage.getItem("Bestellung " + event.target.id));
        
        let vorhanden = JSON.parse(localStorage.getItem("Vorhanden"));
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

        
        
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);

        localStorage.removeItem("Bestellung " + event.target.id);
        

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
        notizen.appendChild(notiz);
        notiz.className = "notiz";
        notiz.id = "notiz" + counter;
    
        let löschen = document.createElement("input")
        löschen.value = "X";
        löschen.className = "löschen";
        löschen.id = j;
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
}

    function vorhandenfunc(event){

        if(localStorage.getItem("Vorhanden") == null){
            const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
                let vorhandenString = JSON.stringify(vorhanden);
                localStorage.setItem("Vorhanden", vorhandenString);
        }
        if(document.getElementById("liste") != null){
            let pastListe = document.getElementById("liste");
            pastListe.remove();
        }
       

        let vorhandenObj = JSON.parse(localStorage.getItem("Vorhanden"));
        
        let liste = document.createElement("div");
        liste.id = "liste";
        let box2 = document.getElementById("box2");
        box2.appendChild(liste);
        for(i = 0; i < Object.keys(vorhandenObj).length; i++){
               
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
    