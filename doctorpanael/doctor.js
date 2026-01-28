/* GREETING */
const greet = document.getElementById("greeting");
const hour = new Date().getHours();
let msg = "Good Evening";

if(hour < 12) msg = "Good Morning";
else if(hour < 17) msg = "Good Afternoon";

greet.innerText = `${msg}, Dr. R. Sharma 👨‍⚕️`;

/* USER SCANS (DEMO DATA) */
const scanList = document.getElementById("scanList");

const consultUsers = [
  {
    name:"Rahul Kumar",
    disease:"Early Blight",
    img:"https://cdn-icons-png.flaticon.com/512/2909/2909769.png"
  },
  {
    name:"Anita Sharma",
    disease:"Leaf Rust",
    img:"https://cdn-icons-png.flaticon.com/512/2909/2909769.png"
  }
];

consultUsers.forEach(u=>{
  scanList.innerHTML += `
    <div class="scan-card">
      <img src="${u.img}">
      <div class="scan-info">
        <p><b>User:</b> ${u.name}</p>
        <p><b>Disease:</b> ${u.disease}</p>
        <span class="tag">Consultation Shared</span>
      </div>
    </div>
  `;
});

/* IMAGE PREVIEW */
const imgInput = document.getElementById("diseaseImage");
const previewBox = document.getElementById("imageBox");
const previewImg = document.getElementById("previewImg");

imgInput.onchange = ()=>{
  previewImg.src = URL.createObjectURL(imgInput.files[0]);
  previewBox.style.display = "block";
};

/* SAVE */
document.getElementById("saveDisease").onclick = ()=>{
  alert("✔ Disease & solution saved\n✔ Ready for AI training (Prototype)");
};

function logout(){
  if(confirm("Logout from PlantCare Doctor Panel?")){
    window.location.href = "/frontpage/index.html";
  }
}
