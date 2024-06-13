const bearbeiten = {was: "Frühlingsrollen", wieviel: 0};
const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
var add = document.getElementById("add");
anzahl = localStorage.getItem("Anzahl");

add.addEventListener("click", addbearbeitung);


            ladenAusstehend();
        
        
        // cluster Laden
        
            for(j = 1; j <= anzahl ; j++){
                
            let bearbeitenObj = JSON.parse(localStorage.getItem("Bearbeiten " + j));
            if(bearbeitenObj != null){
        
            let cluster = document.createElement("div");
            let zubereitungbox = document.getElementById("zubereitungbox");
            zubereitungbox.appendChild(cluster);
            cluster.className = "cluster";
            cluster.id = "cluster" + j;
        
            let timer = document.createElement("p");
            cluster.appendChild(timer);
            timer.textContent = "3:00";
            timer.className = "zubereitung-timer";
        
            let savewas = document.createElement("p");
            cluster.appendChild(savewas);
            savewas.textContent = bearbeitenObj.was;
            savewas.className = "zubereitung-liste";
            savewas.id = "savewas" + j;
        
            let savewieviel = document.createElement("p");
            cluster.appendChild(savewieviel);
            savewieviel.textContent = bearbeitenObj.wieviel;
            savewieviel.className = "zubereitung-liste";
            savewieviel.id = "savewieviel" + j;
        
            let fertig = document.createElement("input");
            fertig.type = "button";
            fertig.className = "fertig";
            fertig.id = j;
            cluster.appendChild(fertig);
            fertig.addEventListener("click", finished);
            }

            }

function addbearbeitung(event){

    let anzahl = Number(localStorage.getItem("Anzahl"));
    if(anzahl == 0){
        const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);
    }
    anzahl += 1;
    localStorage.setItem("Anzahl", anzahl);
    let was = document.getElementById("was");
    let wieviel = document.getElementById("wieviel");

    bearbeiten.was = was.value;
    bearbeiten.wieviel = wieviel.value;
    
    let bearbeitenString = JSON.stringify(bearbeiten);
    localStorage.setItem("Bearbeiten " + anzahl, bearbeitenString);
    
    let cluster = document.createElement("div");
    let zubereitungbox = document.getElementById("zubereitungbox");
    zubereitungbox.appendChild(cluster);
    cluster.className = "cluster";
    cluster.id = "cluster" + anzahl;

    let timer = document.createElement("p");
    cluster.appendChild(timer);
    timer.textContent = "3:00";
    timer.className = "zubereitung-timer";

    let savewas = document.createElement("p");
    cluster.appendChild(savewas);
    savewas.textContent = was.value;
    savewas.className = "zubereitung-liste";
    savewas.id = "savewas" + anzahl;

    let savewieviel = document.createElement("p");
    cluster.appendChild(savewieviel);
    savewieviel.textContent = wieviel.value;
    savewieviel.className = "zubereitung-liste";
    savewieviel.id = "savewieviel" + anzahl;

    let fertig = document.createElement("input");
    fertig.type = "button";
    fertig.className = "fertig";
    fertig.id = anzahl;
    cluster.appendChild(fertig);
    fertig.addEventListener("click", finished);

}


    function finished(event){

        const id = event.target.id;
        let was = document.getElementById("savewas" + id);
        let wieviel = document.getElementById("savewieviel" + id);
        let ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
        let vorhanden = JSON.parse(localStorage.getItem("Vorhanden"));
        let cluster = document.getElementById("cluster" + id);
        let wasString = JSON.stringify(was.textContent)

        

        for(i = 0; i < 6; i++){
            let key = Object.keys(ausstehend)[i];
            if(JSON.stringify(key) == wasString){
                
                ausstehend[key] -= Number(wieviel.textContent);
                vorhanden[key] += Number(wieviel.textContent);
            }
/*
                if((ausstehend[was] -= wieviel.textContent) == null){
                    ausstehend[was] = 0;
                }
                ausstehend[was] -= wieviel.textContent;
                vorhanden[was] += wieviel.textContent;*/
            
        /*for(i = 0; i < 6; i++){
            let key = Object.keys(ausstehend)[i];
            if(key == was){
                ausstehend[key] -= wieviel;
                vorhanden[key] -= wieviel;
            }
            for(i = 0; i < 6; i++){
        let key = Object.keys(aufschrieb)[i];
        let key2 = Object.keys(ausstehend)[i];
        ausstehend[key2] += aufschrieb[key];

    } */
        } 
        let ausstehendString = JSON.stringify(ausstehend);
        localStorage.setItem("Ausstehend", ausstehendString);
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);

        cluster.remove();
        localStorage.removeItem("Bearbeiten " + id);

        let box = document.getElementById("box");
        box.remove();
        ladenAusstehend();
    }

    function ladenAusstehend(event){
        // Ausstehenliste laden
        let ausstehendObj = JSON.parse(localStorage.getItem("Ausstehend"));

        let box = document.createElement("div");
        let küche = document.getElementById("küche");
        box.id = "box";
        küche.appendChild(box);

        for(i = 0; i < Object.keys(ausstehendObj).length; i++){
               
            if(Object.values(ausstehendObj)[i] > 0){
                let kücheTeil = document.createElement("p");
                kücheTeil.textContent = Object.keys(ausstehendObj)[i] + ": " + Object.values(ausstehendObj)[i];
                kücheTeil.className = "küche-liste";
                box.appendChild(kücheTeil);
                box.appendChild(document.createElement("br"));
                
            }
        }
    }
    

    /*
    let cluster = document.createElement("div");
    let zubereitungbox = document.getElementById("zubereitungbox");
    zubereitungbox.appendChild(cluster);
    cluster.className = "cluster";
    
    let timer = document.createElement("p");
    cluster.appendChild(timer);
    timer.textContent = "3:00";
    timer.className = "zubereitung-timer";

    let selector = document.createElement("select");
    cluster.appendChild(selector);
    selector.className = "zubereitung-liste";
    for(i = 0; i < 6; i++){
    let option = document.createElement("option");
    selector.appendChild(option);
    option.textContent = namen[i];
    }

    let anzahl = document.createElement("input");
    anzahl.type = "number";
    anzahl.className = "zubereitung-zahl";
    cluster.appendChild(anzahl);

    let fertig = document.createElement("input");
    fertig.type = "button";
    fertig.className = "fertig";
    cluster.appendChild(fertig);
    */