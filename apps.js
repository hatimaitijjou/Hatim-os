const HatimOS={
  z:10,
  apps:{},
  boot(){
    this.clock();
    setInterval(this.clock,1000);
    this.registerApps();
    this.renderDesktop();
    this.loadStore();
  },
  clock(){
    const t=new Date().toLocaleTimeString();
    document.getElementById("clock").innerText=t;
    document.getElementById("mini-clock").innerText=t;
  },
  registerApps(){
    this.apps["Snake"]={name:"Snake",render:(win)=>{
      win.querySelector(".body").innerHTML="<p>لعبة Snake هنا</p>";
    }};
    this.apps["Tetris"]={name:"Tetris",render:(win)=>{
      win.querySelector(".body").innerHTML="<p>لعبة Tetris هنا</p>";
    }};
    this.apps["Browser"]={name:"Browser",render:(win)=>{
      const iframe=document.createElement("iframe");
      iframe.src="https://www.google.com";
      iframe.style.width="100%";
      iframe.style.height="100%";
      iframe.style.border="none";
      win.querySelector(".body").appendChild(iframe);
    }};
    this.apps["AI"]={name:"AI Assistant",render:(win)=>{
      win.querySelector(".body").innerHTML="<p>مساعد AI هنا</p>";
    }};
  },
  renderDesktop(){
    const desk=document.getElementById("desktop");
    desk.innerHTML="";
    Object.values(this.apps).forEach(app=>{
      const icon=document.createElement("div");
      icon.className="icon";
      icon.innerHTML=`<span>${app.name}</span>`;
      icon.ondblclick=()=>this.open(app.name);
      desk.appendChild(icon);
    });
  },
  open(name){
    if(document.getElementById(name)) return;
    const app=this.apps[name];
    const win=document.createElement("div");
    win.className="window";
    win.id=name;
    win.style.zIndex=++this.z;
    win.style.top="50px";win.style.left="50px";
    win.innerHTML=`<div class="bar"><span>${name}</span><span onclick="this.closest('.window').remove()">✖</span></div><div class="body"></div>`;
    document.body.appendChild(win);
    if(app.render) app.render(win);
    const bar=win.querySelector(".bar");
    let ox,oy;
    bar.onmousedown=e=>{
      ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;
      document.onmousemove=ev=>{
        win.style.left=ev.clientX-ox+"px";
        win.style.top=ev.clientY-oy+"px";
      };
      document.onmouseup=()=>document.onmousemove=null;
    };
  },
  toggleStore(show){
    document.getElementById("store").style.display=show?"block":"none";
  },
  loadStore(){
    const items=["Snake","Tetris","Browser","AI"];
    const grid=document.getElementById("store-items");
    grid.innerHTML="";
    items.forEach(i=>{
      const card=document.createElement("div");
      card.className="store-card";
      card.innerHTML=`<h3>${i}</h3><button onclick="HatimOS.open('${i}')">فتح التطبيق</button>`;
      grid.appendChild(card);
    });
  }
};
