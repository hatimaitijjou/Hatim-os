const db = firebase.database();
const messagesDiv = document.getElementById("messages");
const msgInput = document.getElementById("msg");

function send(){
  if(!msgInput.value) return;
  db.ref("chat").push({
    text: msgInput.value,
    user: firebase.auth().currentUser.uid,
    time: new Date().toISOString()
  });
  msgInput.value="";
}

db.ref("chat").limitToLast(50).on("child_added", s=>{
  const d = s.val();
  const div = document.createElement("div");
  div.textContent = `[${new Date(d.time).toLocaleTimeString()}] ${d.text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
