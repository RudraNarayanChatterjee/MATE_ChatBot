eel.expose(displayFunc);
function displayFunc(e) {
  document.getElementById("changleableText").innerHTML = e;
}

eel.expose(senderText);
function senderText(message) {
  var chatBox = document.getElementById("chat-canvas-body");
  if (message.trim() !== "") {
    chatBox.innerHTML += `<div class="bootstp1">
            <div class = "width-size">
            <div class="sender_message">${message}</div>
        </div>`;

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

eel.expose(receiverText);
function receiverText(message) {
  var chatBox = document.getElementById("chat-canvas-body");
  if (message.trim() !== "") {
    chatBox.innerHTML += `<div class="bootstp2">
            <div class = "width-size">
            <div class="receiver_message">${message}</div>
            </div>
        </div>`;

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

eel.expose(micreverse);
function micreverse() {
  const siriContainer = document.getElementById("siri-container");
  siriContainer.setAttribute("hidden", ""); // Hide the siri-container
  document.getElementById("MicBtn-on").setAttribute("hidden", "");
  document.getElementById("MicBtn-off").removeAttribute("hidden");
}
