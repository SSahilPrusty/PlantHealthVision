/* ===== MAGNETIC BUTTON EFFECT ===== */
document.querySelectorAll('.magnet').forEach(btn=>{
    btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.setProperty('--tx', `${x * 0.25}px`);
        btn.style.setProperty('--ty', `${y * 0.25}px`);
    });

    btn.addEventListener('mouseleave', ()=>{
        btn.style.setProperty('--tx','0px');
        btn.style.setProperty('--ty','0px');
    });
});

/* ===== INTERACTIVE CANVAS BACKGROUND ===== */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const COUNT = 80;
const mouse = { x:null, y:null };

window.addEventListener("mousemove", e=>{
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener("mouseout", ()=>{
    mouse.x = null;
    mouse.y = null;
});

class Particle{
    constructor(){
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random()-0.5)*0.6;
        this.vy = (Math.random()-0.5)*0.6;
        this.size = 2;
    }
    move(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.x<0||this.x>w) this.vx*=-1;
        if(this.y<0||this.y>h) this.vy*=-1;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle="rgba(76,175,80,0.6)";
        ctx.fill();
    }
}

for(let i=0;i<COUNT;i++) particles.push(new Particle());

function connect(){
    for(let i=0;i<particles.length;i++){
        for(let j=i;j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx*dx+dy*dy);
            if(d<120){
                ctx.strokeStyle="rgba(76,175,80,0.08)";
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function mouseEffect(){
    if(!mouse.x) return;
    particles.forEach(p=>{
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<120){
            p.x += dx/d;
            p.y += dy/d;
        }
    });
}

function animate(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{ p.move(); p.draw(); });
    connect();
    mouseEffect();
    requestAnimationFrame(animate);
}
animate();
