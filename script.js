let chatStep = 0;

let visitor = {
    name: "",
    age: "",
    location: "",
    email: "",
    problem: ""
};


// =========================
// OPEN CHAT
// =========================

function openChat() {

    document
        .getElementById("chat-overlay")
        .classList.add("active");

    if (chatStep === 0) {

        addBotMessage(
            "Hey! 👋 I'm Aeron, the Guardian of Voices."
        );

        showTyping(() => {

            addBotMessage(
                "Before we begin, what's your name?"
            );

        });

        chatStep = 1;
    }
}


// =========================
// CLOSE CHAT
// =========================

function closeChat() {

    document
        .getElementById("chat-overlay")
        .classList.remove("active");
}


// =========================
// BOT MESSAGE
// =========================

function addBotMessage(message) {

    const messages =
        document.getElementById("chat-messages");

    const div =
        document.createElement("div");

    div.className =
        "message bot-message";

    div.innerText =
        message;

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;
}


// =========================
// USER MESSAGE
// =========================

function addUserMessage(message) {

    const messages =
        document.getElementById("chat-messages");

    const div =
        document.createElement("div");

    div.className =
        "message user-message";

    div.innerText =
        message;

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;
}


// =========================
// TYPING EFFECT
// =========================

function showTyping(callback) {

    const messages =
        document.getElementById("chat-messages");

    const typing =
        document.createElement("div");

    typing.className =
        "message bot-message typing";

    typing.innerText =
        "Aeron is listening...";

    messages.appendChild(typing);

    messages.scrollTop =
        messages.scrollHeight;

    setTimeout(() => {

        typing.remove();

        callback();

    }, 700);
}


// =========================
// SEND MESSAGE
// =========================

function sendMessage() {

    const input =
        document.getElementById("chat-input");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    addUserMessage(message);

    input.value = "";

    setTimeout(() => {

        processMessage(message);

    }, 400);
}


// =========================
// PROCESS CONVERSATION
// =========================

function processMessage(message) {


    // NAME
    if (chatStep === 1) {

        visitor.name =
            message;

        showTyping(() => {

            addBotMessage(
                `Nice to meet you, ${visitor.name}. How old are you?`
            );

        });

        chatStep = 2;
    }


    // AGE
    else if (chatStep === 2) {

        if (!/^\d{1,3}$/.test(message)) {

            addBotMessage(
                "Please enter your age using numbers. 😊"
            );

            return;
        }

        visitor.age =
            message;

        showTyping(() => {

            addBotMessage(
                "Got it. Where are you reaching me from?"
            );

        });

        chatStep = 3;
    }


    // LOCATION
    else if (chatStep === 3) {

        visitor.location =
            message;

        showTyping(() => {

            addBotMessage(
                "And what's your email address? 📧"
            );

        });

        chatStep = 4;
    }


    // EMAIL
    else if (chatStep === 4) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(message)) {

            addBotMessage(
                "Hmm, that doesn't look like a valid email address. Please try again. 📧"
            );

            return;
        }

        visitor.email =
            message;

        showTyping(() => {

            addBotMessage(
                "Thank you. 💙"
            );

            setTimeout(() => {

                addBotMessage(
                    "So... tell me. How can I help you?"
                );

            }, 500);

        });

        chatStep = 5;
    }


    // PROBLEM / GRIEVANCE
    else if (chatStep === 5) {

        visitor.problem =
            message;

        const submittedTime =
            new Date().toLocaleString();

        showTyping(() => {

            addBotMessage(
                "I hear you. Let me send your request to Aeron's team... 📡"
            );

        });


        // EMAILJS
        emailjs.send(

            "service_ioxlflv",

            "template_cnmvqzw",

            {
                name: visitor.name,

                age: visitor.age,

                location: visitor.location,

                email: visitor.email,

                problem: visitor.problem,

                time: submittedTime
            }

        )

        .then(function(response) {

            console.log(
                "EMAIL SENT:",
                response.status,
                response.text
            );

            setTimeout(() => {

                addBotMessage(
                    "Your request has been sent successfully. 🦸"
                );

                setTimeout(() => {

                    addBotMessage(
                        "Your voice has been heard. Stay strong. 💙"
                    );

                }, 500);

            }, 800);

        })

        .catch(function(error) {

            console.error(
                "EMAILJS ERROR:",
                error
            );

            addBotMessage(
                "I couldn't send your request right now. Please try again. ⚠️"
            );

        });

        chatStep = 6;
    }
}


// =========================
// ENTER KEY
// =========================

function handleKey(event) {

    if (event.key === "Enter") {

        sendMessage();

    }
}