
var save = document.getElementById("save");

//const namen = ["Fruehlingsrollen", "Fruehlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
const aufschrieb = {id: 0, Art: "Bestellung", Frühlingsrollen: 60, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};



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


save.addEventListener("click", addNotiz);

async function addNotiz(event){
   /*let counter = Number(localStorage.getItem("counter"));

    if(counter == 0){
        const ausstehend = {Frühlingsrollen: 0, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};
        let ausstehendString = JSON.stringify(ausstehend);
        localStorage.setItem("Ausstehend", ausstehendString);
    }
    counter += 1;
   
    localStorage.setItem("counter", counter);*/

    /*
    let i = 0;
    aufschrieb.Frühlingsrollen = aufnehmen[i].value;
    i++;
    aufschrieb.Frühlingsecken = aufnehmen[i].value;
    i++;
    aufschrieb.Wantan = aufnehmen[i].value;
    i++;
    aufschrieb.Muslitos = aufnehmen[i].value;
    i++;
    aufschrieb.PhadThai = aufnehmen[i].value;
    i++;
    aufschrieb.Tagesessen = aufnehmen[i].value;
    
    
    for (let [key, value] of Object.entries(aufschrieb)){
        console.log(value);
        value = aufnehmen[i].value;
        i++;
        console.log(value);
    }   */

    let aufnehmen = document.getElementsByClassName("aufnehmen");
    aufschrieb[Object.keys(aufschrieb)[0]] = "";
    aufschrieb[Object.keys(aufschrieb)[1]] = "Bestellung";
    for(i = 2; i < 8; i++){
        let key = Object.keys(aufschrieb)[i];
        //aufschrieb[key] = Number(aufnehmen[i-2].value);
        aufschrieb[key] = Number(aufnehmen[i-2].value);
        console.log("reading: " + Number(aufnehmen[i-2].value));
    }   
    console.log("POst: " + aufschrieb);
    console.log("POststring: " + JSON.stringify(aufschrieb));
    sendJSONStringWithPOST("http://localhost:3000/Bestellungen", JSON.stringify(aufschrieb));
    
    //let aufschriebString = JSON.stringify(aufschrieb);
    //localStorage.setItem("Bestellung "+ counter, aufschriebString);

    //zu ausstehen hinzufügen
    //const ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
    let ausstehendString = await requestTextWithGET("http://localhost:3000/Ausstehend");
    console.log("----------------------------------------------------------");
    let ausstehend = JSON.parse(ausstehendString)
    console.log("Updated: " + ausstehend);
    for(i = 2; i < 8; i++){
        let key = Object.keys(aufschrieb)[i];
        let key2 = Object.keys(ausstehend)[i];
        ausstehend[key2] += aufschrieb[key];
    } 
    console.log("Updated: " + ausstehend);
    ausstehendString = JSON.stringify(ausstehend);
    updatePATCH("http://localhost:3000/Ausstehend", ausstehendString);
    window.location = "index.html";
    //let ausstehendString = JSON.stringify(ausstehend);
    //localStorage.setItem("Ausstehend", ausstehendString);
/*
    ausstehend.Frühlingsrollen += aufschrieb.Frühlingsrollen;
    ausstehend.Frühlingsecken += aufschrieb.Frühlingsecken;
    ausstehend.Wantan += aufschrieb.Wantan;
    ausstehend.Muslitos += aufschrieb.Muslitos;
    ausstehend.PhadThai += aufschrieb.PhadThai;
    ausstehend.Tagesessen += aufschrieb.Tagesessen;
    
   for(i = 0; i < 6; i++){
        ausstehend.keys[i] = aufschrieb.keys[i];
   }

    let ausstehendString = JSON.stringify(ausstehend);
    localStorage.setItem("Ausstehend", ausstehendString);
*/
    //seite wechseln
   

    
}   




