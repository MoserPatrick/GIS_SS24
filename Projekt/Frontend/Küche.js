const bearbeiten = {id: "", was: "Frühlingsrollen", wieviel: 0};
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
      method: 'PATCH',
      body: jsonString,
    });
  }


  async function deleteBestellung(url) {
    const response = await fetch(url, {
        method: 'DELETE',
      });
  }

add.addEventListener("click", addbearbeitung);

    ladenCluster();
    ladenAusstehend();
          
       

async function addbearbeitung(event){

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
    console.log("OBject: " +was.value);
    console.log("OBject: " +wieviel.value);
   
    //let bearbeitenString = JSON.stringify(bearbeiten);
    //localStorage.setItem("Bearbeiten " + anzahl, bearbeitenString);
    await sendJSONStringWithPOST("http://localhost:3000/Bearbeitungen", JSON.stringify(bearbeiten));
    ladenCluster();
/*
    let bearbeitenString = await requestTextWithGET("http://localhost:3000/Bearbeitungen?id=" + event.target.id);
    let bearbeitenObj = JSON.parse(bearbeitenString);
    
    let cluster = document.createElement("div");
    let zubereitungbox = document.getElementById("zubereitungbox");
    zubereitungbox.appendChild(cluster);
    cluster.className = "cluster";
    cluster.id = "cluster" + bearbeitenObj.id;

    /*let timer = document.createElement("p");
    cluster.appendChild(timer);
    timer.textContent = "3:00";
    timer.className = "zubereitung-timer";

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
*/
}


    async function finished(event){
        console.log("Start");
        const id = event.target.id;
        let was = document.getElementById("savewas" + id);
        let wieviel = document.getElementById("savewieviel" + id);
        let ausstehendString = await requestTextWithGET("http://localhost:3000/Ausstehend");
        let ausstehendObj = JSON.parse(ausstehendString);
        console.log("object " + ausstehendString);
        let vorhandenString = await requestTextWithGET("http://localhost:3000/Vorhanden");
        let vorhandenObj = JSON.parse(vorhandenString);
        let cluster = document.getElementById("cluster" + id);
        let wasString = JSON.stringify(was.textContent)
        console.log("was "+ wasString);
        console.log("---------------------------------------------------------------------");

        

        for(i = 2; i < Object.keys(ausstehendObj).length; i++){
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
        console.log("updated "+ JSON.stringify(vorhandenObj));
        await updatePATCH("http://localhost:3000/Ausstehend", JSON.stringify(ausstehendObj));
        await updatePATCH("http://localhost:3000/Vorhanden", JSON.stringify(vorhandenObj));

        cluster.remove();
        //localStorage.removeItem("Bearbeiten " + id);
        await deleteBestellung("http://localhost:3000/Bearbeitungen?id="+ id);

        let box = document.getElementById("box");
        box.remove();
        ladenAusstehend();
    }

    async function ladenAusstehend(event){
        // Ausstehenliste laden
        console.log("Ausstehend ladne");
        let ausstehendString = await requestTextWithGET("http://localhost:3000/Ausstehend");
        console.log("absturz");
        let ausstehendObj = JSON.parse(ausstehendString);

        let box = document.createElement("div");
        let küche = document.getElementById("küche");
        box.id = "box";
        küche.appendChild(box);

        for(i = 2; i < Object.keys(ausstehendObj).length; i++){
               
            if(Object.values(ausstehendObj)[i] > 0){
                let kücheTeil = document.createElement("p");
                kücheTeil.textContent = Object.keys(ausstehendObj)[i] + ": " + Object.values(ausstehendObj)[i];
                kücheTeil.className = "küche-liste";
                box.appendChild(kücheTeil);
                box.appendChild(document.createElement("br"));
                
            }
        }
        console.log("End");
    }
    
    async function ladenCluster(event){

          // cluster Laden
          console.log("Ladet cluster");
          let listeString = await requestTextWithGET("http://localhost:3000/GetBearbeitungen");
          let liste = JSON.parse(listeString);
          console.log(liste);
         
          liste.forEach(row =>{
                  
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
              savewas.textContent = row.Was;
              savewas.className = "zubereitung-liste";
              savewas.id = "savewas" + row.id;
          
              let savewieviel = document.createElement("p");
              cluster.appendChild(savewieviel);
              savewieviel.textContent = row.Wieviel;
              savewieviel.className = "zubereitung-liste";
              savewieviel.id = "savewieviel" + row.id;
          
              let fertig = document.createElement("input");
              fertig.type = "button";
              fertig.className = "fertig";
              fertig.id = row.id;
              cluster.appendChild(fertig);
              fertig.addEventListener("click", finished);
              //}
  
              });
         

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