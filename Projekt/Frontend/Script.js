
var save = document.getElementById("save");

//const namen = ["Fruehlingsrollen", "Fruehlingsecken", "Wantan", "Muslitos", "PhadThai", "Tagesessen"];
const aufschrieb = {Art: "Bestellung", Frühlingsrollen: 60, Frühlingsecken: 0, Wantan: 0, Muslitos: 0, PhadThai: 0, Tagesessen: 0};

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

function addNotiz(event){
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

    for(i = 1; i < 7; i++){
        let key = Object.keys(aufschrieb)[i];
        aufschrieb[key] = Number(aufnehmen[i-1].value);
    }   
    
    sendJSONStringWithPOST("http://localhost:3000/Bestellungen", JSON.stringify(aufschrieb));
    //let aufschriebString = JSON.stringify(aufschrieb);
    //localStorage.setItem("Bestellung "+ counter, aufschriebString);

    //zu ausstehen hinzufügen
    //const ausstehend = JSON.parse(localStorage.getItem("Ausstehend"));
    const ausstehend = requestTextWithGET("http://localhost:3000/Ausstehend");
    for(i = 1; i < 7; i++){
        let key = Object.keys(aufschrieb)[i];
        let key2 = Object.keys(ausstehend)[i];
        ausstehend[key2] += aufschrieb[key];
    } 
    updatePATCH("http://localhost:3000/Ausstehend", JSON.stringify(ausstehend));
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
    window.location = "index.html";

    
}   




