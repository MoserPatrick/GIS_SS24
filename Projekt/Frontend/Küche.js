const bearbeiten = {was: "Frühlingsrollen", wieviel: 0};
const namen = ["Frühlingsrollen", "Frühlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
var add = document.getElementById("add");
//anzahl = localStorage.getItem("Anzahl");

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
      method: 'POST',
      body: jsonString,
    });
  }


  async function deleteBestellung(url) {
    const response = await fetch(url, {
        method: 'DELETE',
      });
  }

add.addEventListener("click", addbearbeitung);

            
            ladenAusstehend();
        
        
        // cluster Laden
        let liste = JSON.parse(requestTextWithGET("http://localhost:3000/GetBearbeitung"));
        console.log(liste);
        liste.foreach(row =>{
                
            //let bearbeitenObj = JSON.parse(r);
            //if(bearbeitenObj != null){
        
            let cluster = document.createElement("div");
            let zubereitungbox = document.getElementById("zubereitungbox");
            zubereitungbox.appendChild(cluster);
            cluster.className = "cluster";
            cluster.id = "cluster" + row.id;
        
            /*let timer = document.createElement("p");
            cluster.appendChild(timer);
            timer.textContent = "3:00";
            timer.className = "zubereitung-timer";*/
        
            let savewas = document.createElement("p");
            cluster.appendChild(savewas);
            savewas.textContent = row.was;
            savewas.className = "zubereitung-liste";
            savewas.id = "savewas" + row.id;
        
            let savewieviel = document.createElement("p");
            cluster.appendChild(savewieviel);
            savewieviel.textContent = row.wieviel;
            savewieviel.className = "zubereitung-liste";
            savewieviel.id = "savewieviel" + row.id;
        
            let fertig = document.createElement("input");
            fertig.type = "button";
            fertig.className = "fertig";
            fertig.id = row.id;
            cluster.appendChild(fertig);
            fertig.addEventListener("click", finished);
            //}

            })

function addbearbeitung(event){

    /*let anzahl = Number(localStorage.getItem("Anzahl"));
    if(anzahl == 0){
        const vorhanden = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);
    }
    anzahl += 1;
    localStorage.setItem("Anzahl", anzahl);*/
    

    let was = document.getElementById("was");
    let wieviel = document.getElementById("wieviel");

    bearbeiten.was = was.value;
    bearbeiten.wieviel = wieviel.value;
    
    //let bearbeitenString = JSON.stringify(bearbeiten);
    //localStorage.setItem("Bearbeiten " + anzahl, bearbeitenString);
    sendJSONStringWithPOST("http://localhost:3000/Bearbeitungen", JSON.stringify(bearbeiten));

    let bearbeitenObj = requestTextWithGET("http://localhost:3000/Bearbeitungen/" + event.target.id);
    
    let cluster = document.createElement("div");
    let zubereitungbox = document.getElementById("zubereitungbox");
    zubereitungbox.appendChild(cluster);
    cluster.className = "cluster";
    cluster.id = "cluster" + bearbeitenObj.id;

    /*let timer = document.createElement("p");
    cluster.appendChild(timer);
    timer.textContent = "3:00";
    timer.className = "zubereitung-timer";*/

    let savewas = document.createElement("p");
    cluster.appendChild(savewas);
    savewas.textContent = was.value;
    savewas.className = "zubereitung-liste";
    savewas.id = "savewas" + bearbeitenObj.id;

    let savewieviel = document.createElement("p");
    cluster.appendChild(savewieviel);
    savewieviel.textContent = wieviel.value;
    savewieviel.className = "zubereitung-liste";
    savewieviel.id = "savewieviel" + bearbeitenObj.id;

    let fertig = document.createElement("input");
    fertig.type = "button";
    fertig.className = "fertig";
    fertig.id = bearbeitenObj.id;
    cluster.appendChild(fertig);
    fertig.addEventListener("click", finished);

}


    function finished(event){

        const id = event.target.id;
        let was = document.getElementById("savewas" + id);
        let wieviel = document.getElementById("savewieviel" + id);
        let ausstehendObj = JSON.parse(requestTextWithGET("http://localhost:3000/Ausstehend"));
        let vorhandenObj = JSON.parse(requestTextWithGET("http://localhost:3000/Vorhanden"));
        let cluster = document.getElementById("cluster" + id);
        let wasString = JSON.stringify(was.textContent)

        

        for(i = 1; i < Object.keys(ausstehendObj).length; i++){
            let key = Object.keys(ausstehendObj)[i];
            if(JSON.stringify(key) == wasString){
                
                ausstehendObj[key] -= Number(wieviel.textContent);
                vorhandenObj[key] += Number(wieviel.textContent);
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
        /*
        let ausstehendString = JSON.stringify(ausstehend);
        localStorage.setItem("Ausstehend", ausstehendString);
        let vorhandenString = JSON.stringify(vorhanden);
        localStorage.setItem("Vorhanden", vorhandenString);*/
        updatePATCH("http://localhost:3000/Ausstehend", JSON.stringify(ausstehendObj));
        updatePATCH("http://localhost:3000/Vorhanden", JSON.stringify(vorhandenObj));

        cluster.remove();
        //localStorage.removeItem("Bearbeiten " + id);
        deleteBestellung("http://localhost:3000/Bearbeitungen"+ target.id);

        let box = document.getElementById("box");
        box.remove();
        ladenAusstehend();
    }

    function ladenAusstehend(event){
        // Ausstehenliste laden
        let ausstehendObj = JSON.parse(requestTextWithGET("http://localhost:3000/Ausstehend"));

        let box = document.createElement("div");
        let küche = document.getElementById("küche");
        box.id = "box";
        küche.appendChild(box);

        for(i = 1; i < Object.keys(ausstehendObj).length; i++){
               
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