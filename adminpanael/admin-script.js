/* ===============================
   TIME BASED GREETING WITH NAME
================================ */

// for demo (signup/login ke baad yeh set hoga)
if(!localStorage.getItem("adminName")){
  localStorage.setItem("adminName","Sahil");
}

const greetingText = document.getElementById("greetingText");
const subGreeting = document.getElementById("subGreeting");

const adminName = localStorage.getItem("adminName") || "Admin";
const hour = new Date().getHours();

let greeting = "";
let subText = "";

if(hour >= 5 && hour < 12){
  greeting = "Good Morning";
  subText = "Start your day with fresh insights 🌱";
}
else if(hour >= 12 && hour < 17){
  greeting = "Good Afternoon";
  subText = "Here’s what’s happening today 📊";
}
else if(hour >= 17 && hour < 21){
  greeting = "Good Evening";
  subText = "Let’s review today’s activity 🌆";
}
else{
  greeting = "Good Night";
  subText = "Time to wrap things up 🌙";
}

greetingText.innerText = `${greeting}, ${adminName} 👋`;
subGreeting.innerText = subText;


/* ===============================
   COUNT UP ANIMATION
================================ */
document.querySelectorAll(".card p").forEach(el=>{
  const target = +el.innerText;
  let count = 0;
  const step = target / 40;

  const counter = setInterval(()=>{
    count += step;
    if(count >= target){
      el.innerText = target;
      clearInterval(counter);
    }else{
      el.innerText = Math.floor(count);
    }
  },20);
});


/* ===============================
   CHARTS
================================ */

// Upload chart
new Chart(document.getElementById("uploadChart"), {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      data: [120,190,300,250,220,340,410],
      borderColor:"#22c55e",
      backgroundColor:"rgba(34,197,94,.25)",
      fill:true,
      tension:.4
    }]
  },
  options:{
    plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true}}
  }
});

// Disease chart
new Chart(document.getElementById("diseaseChart"), {
  type: "bar",
  data: {
    labels:["Blight","Rust","Mildew","Spot","Healthy"],
    datasets:[{
      data:[120,90,60,40,300],
      backgroundColor:"#22c55e"
    }]
  },
  options:{
    plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true}}
  }
});


function logout(){
  if(confirm("Logout from PlantCare Doctor Panel?")){
    window.location.href = "/frontpage/index.html";
  }
}
