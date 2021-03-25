import React, { useEffect } from 'react'
import firebase from '../firebase'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Assistant = () => {
    const HandelAction = text => {
        switch(text){
            case "turn on light one": 
                firebase.database().ref().update({lightone: 1})
                break;
            case "turn off light one":
                firebase.database().ref().update({lightone: 0})
                break;
            default:
                console.log("Error sending data to firebase :(")
                break;
        }
    }
    useEffect(()=>{
        const toggleBtn = document.getElementById("toggleBtn")
        const content = document.getElementById("content")
        if(typeof SpeechRecognition !== 'undefined'){
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onresult = e => {
                const last = e.results.length - 1;
                const res = e.results[last];
                const text = res[0].transcript;
                if(res.isFinal){
                    console.log("Processing...")
                    console.log("response", text)
                    content.innerHTML = text
                    HandelAction(text);
                }
            }
            let listening = false;
            const toggle = () => {
                if(listening){
                    recognition.stop()
                }else{
                    recognition.start()
                    content.innerHTML = "Listening..."
                }
                listening = !listening
            }
            toggleBtn.addEventListener("click", toggle)
        }
    })
    return (
        <div>
            <h1>{typeof SpeechRecognition !== 'undefined' ? "" : "Browser doesn't support"}</h1>
            <h1 id="content"></h1>
            <button id="toggleBtn">Speak</button>
        </div>
    );
}

export default Assistant