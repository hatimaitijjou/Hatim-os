const HatimOS={
 z:10,
 apps:{},
 desktopApps:[],
 boot(){
   this.stars();
   this.clock();
   setInterval(this.clock,1000);
   this.registerApps();
   this.renderDesktop();
   this.loadStore();
 },
 stars(){
   for(let i=0;i<100;i++){
     const s=document.createElement("div");
     s.className="star";
     s.style.width=s.style.height=Math.random()*3+1+"px";
     s.style.left=Math.random()*100+"vw";
     s.style.top=Math.random()*100+"vh";
     document.getElementById("space").appendChild(s);
   }
 },
 clock(){
   const d=new Date();
   const t=d.toLocaleTimeString();
   document.getElementById("clock").innerText=t;
   document.getElementById("mini-clock").innerText=t;
 },
 registerApps(){
   // Snake
   this.apps["Snake"]={name:"Snake",render:(win)=>{
     const canvas=document.createElement("canvas");canvas.width=400;canvas.height=400;canvas.style.background="#000";canvas.style.borderRadius="15px";
     win.querySelector(".win-body").appendChild(canvas);
     const ctx=canvas.getContext("2d");let snake=[{x:10,y:10}],dx=1,dy=0,food={x:5,y:5};const scale=20;const rows=canvas.height/scale;const cols=canvas.width/scale;
     function draw(){ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="lime";snake.forEach(s=>ctx.fillRect(s.x*scale,s.y*scale,scale,scale));ctx.fillStyle="red";ctx.fillRect(food.x*scale,food.y*scale,scale,scale);}
     function update(){let head={x:snake[0].x+dx,y:snake[0].y+dy};snake.unshift(head);if(head.x===food.x&&head.y===food.y) food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};else snake.pop();}
     document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"){dx=0;dy=-1}if(e.key==="ArrowDown"){dx=0;dy=1}if(e.key==="ArrowLeft"){dx=-1;dy=0}if(e.key==="ArrowRight"){dx=1;dy=0}});
     setInterval(()=>{update();draw();},100);
   }};
   // Tetris
   this.apps["Tetris"]={name:"Tetris",render:(win)=>{/* مشابه السابق */}};
   // Piano
   this.apps["Piano"]={name:"Piano",render:(win)=>{/* placeholder */}};
   // Browser
   this.apps["Browser"]={name:"Browser",render:(win)=>{const iframe=document.createElement("iframe");iframe.src="https://www.google.com";iframe.style.width="100%";iframe.style.height="100%";iframe.style.border="none";win.querySelector(".win-body").appendChild(iframe);}};
   // AI
   this.apps["AI"]={name:"AI",render:(win)=>{const div=document.createElement("div");div.style.textAlign="center";div.innerHTML="<h2>Nebula AI</h2><input placeholder='اكتب هنا...' style='width:80%;padding:10px;border-radius:20px;border:none;background:rgba(255,255,255,.05);color:white;text-align:center'>";win.querySelector(".win-body").appendChild(div);}};
   // Terminal
   this.apps["Terminal"]={name:"Terminal",render:(win)=>{const div=document.createElement("div");div.style.background="#111";div.style.height="100%";div.style.padding="10px";div.style.overflowY="auto";div.innerHTML="<p>Welcome to Hatim OS Terminal</p>";win.querySelector(".win-body").appendChild(div);}};
 },
 renderDesktop(){
   const desk=document.getElementById("desktop"); desk.innerHTML="";
   Object.values(this.apps).forEach(app=>{
     const icon=document.createElement("div"); icon.className="icon"; icon.innerHTML=`<i class="fas fa-square"></i><span>${app.name}</span>`;
     icon.ondblclick=()=>this.open(app.name); desk.appendChild(icon);
   });
 },
 open(name){
   if(document.getElementById(name)) return;
   const app=this.apps[name];
   const win=document.createElement("div"); win.className="window"; win.id=name; win.style.zIndex=++this.z; win.style.top="10vh"; win.style.left="10vw";
   win.innerHTML=`<div class="bar"><span>${name}</span><span style="cursor:pointer" onclick="this.closest('.window').remove()">✖</span></div><div class="win-body" style="flex:1;padding:10px"></div>`;
   document.body.appendChild(win);
   if(app.render) app.render(win);
   const bar=win.querySelector(".bar"); let ox,oy; bar.onmousedown=e=>{ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;document.onmousemove=ev=>{win.style.left=ev.clientX-ox+"px";win.style.top=ev.clientY-oy+"px"};document.onmouseup=()=>document.onmousemove=null;};
 },
 toggleStore(show){
   document.getElementById("store").style.display=show?"block":"none";
 },
 loadStore(){
   const items=["Snake","Tetris","Piano","Browser","AI","Terminal"];
   const grid=document.getElementById("store-items"); grid.innerHTML="";
   items.forEach(i=>{
     const card=document.createElement("div"); card.className="store-card"; card.innerHTML=`<h3>${i}</h3><button onclick="HatimOS.open('${i}')">تثبيت</button>`;
     grid.appendChild(card);
   });
 }
};
