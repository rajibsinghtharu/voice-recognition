// Select DOM elements: button, content display, and voice indicator
let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

// Function to speak a given text using SpeechSynthesis API
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    Window.speechSynthesis.speak(text_speak)
}

// Function to greet the user based on current time
function wishMe() {
    let today = new Date();
    let hours = today.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternon sir")
    } else {
        speak("Good evening sir")

    }
}

// Call wishMe function when the window loads
window.addEventListener('load', () => {
    wishMe();
})

// Setup SpeechRecognition API for voice input
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

// Event handler when speech recognition returns a result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())

};

// When the button is clicked, start speech recognition
btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

// speak function
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to process voice commands and respond accordingly
function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hey hey")) {
        speak("Hello sir, what can I help you ");
    }
    else if (message.toLowerCase().includes("who are you")) {
        speak("I'am loyal assistant, create by Rajib Singh")
    }
    else if (message.toLowerCase().includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://www.youtube.com/")
    }
    else if (message.toLowerCase().includes("open google")) {
        speak("opening google...")
        window.open("http://google.com/")
    }
    else if (message.toLowerCase().includes("open instagram")) {
        speak("opening instagram...")
        window.open("http://instagram.com/")
    }

    else if (message.toLowerCase().includes("open github")) {
        speak("opening github...")
        window.open("https://github.com/")
    }

    else if (message.toLowerCase().includes("open facebook")) {
        speak("opening facebook...")
        window.open("https://www.facebook.com/")
    }

    else if (message.toLowerCase().includes("open whatsapp")) {
        speak("opening whatsapp...")
        window.open("https://www.whatsapp.com/")
    }

    else if (message.toLowerCase().includes("open calculator")) {
        speak("opening calculator...")
        window.open("calculator://")
    }

    else if (message.toLowerCase().includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    }
    else if (message.toLowerCase().includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
        speak("The current date is " + date);
    }

    else {
        // Remove both "rajib" and "rajiv" from the message
        let cleanedMessage = message.replace(/rajib|rajiv/gi, "").trim();
        let finalText = "this is what I found on the internet regarding " + cleanedMessage;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanedMessage)}`);
    }

}

