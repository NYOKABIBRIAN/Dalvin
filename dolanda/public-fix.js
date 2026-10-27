(function(){
  const cleanNumber=n=>String(n??'').replace(/\D/g,'').replace(/^0/,'254');
  const whatsapp=(number,text)=>{
    const n=cleanNumber(number);
    if(!n){alert('WhatsApp contact is not configured yet.');return;}
    window.open('https://wa.me/'+n+'?text='+encodeURIComponent(text||'Hello Dolanda, I would like to enquire about purchasing event equipment.'),'_blank','noopener');
  };
  window.openWhatsApp=function(index,text){
    const contacts=window.CONTACTS||[];
    const c=contacts[index];
    if(!c){alert('This WhatsApp contact is currently unavailable.');return;}
    whatsapp(c.number,text);
  };
  function esc(s){return String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
  window.render=function(){
    const products=window.PRODUCTS||[];
    const cats=document.getElementById('cats'),grid=document.getElementById('grid');
    if(!cats||!grid)return;
    const categories=['All',...new Set(products.map(p=>p.category).filter(Boolean))];
    const active=window.__dolandaFilter||'All';
    cats.innerHTML=categories.map(c=>'<button class="cat '+(c===active?'active':'')+'" onclick="window.__dolandaFilter='+JSON.stringify(c)+';render()">'+esc(c)+'</button>').join('');
    const shown=active==='All'?products:products.filter(p=>p.category===active);
    if(!shown.length){grid.innerHTML='<div class="empty">No products are currently available.</div>';return;}
    grid.innerHTML=shown.map((p,i)=>{
      const idx=products.indexOf(p);
      const img=p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':'<div>'+esc(p.icon||'◆')+'</div>';
      const message='Hello Dolanda, I would like to enquire about purchasing '+p.name+' for '+(p.price||'the listed price')+'. Please confirm availability and purchase details.';
      return '<article class="card"><div class="visual">'+img+'</div><div class="body"><span class="tag">'+esc(p.category||'Equipment')+'</span><span class="sale">FOR SALE</span><h3>'+esc(p.name)+'</h3><p class="muted">'+esc(p.description||'Dolanda Company equipment for sale.')+'</p><div class="price">'+esc(p.price||'Contact for price')+'</div><div class="card-actions"><button class="btn primary" onclick="openWhatsApp(0,'+JSON.stringify(message)+')">WhatsApp Kanana</button><button class="btn light" onclick="openWhatsApp(1,'+JSON.stringify(message)+')">WhatsApp Frank</button></div></div></article>';
    }).join('');
  };
  function refreshPublicDetails(){
    const s=window.__dolandaSettings||{};
    const contacts=window.CONTACTS||[];
    const name=s.name||'Dolanda Company';
    const loc=s.location||'Mombasa Road, Kenya';
    const desc=s.description||'Dolanda Company supplies professional event equipment for sale in Kenya.';
    document.title=name+' | Event Equipment for Sale';
    const company=document.getElementById('navCompany');if(company)company.textContent=name;
    const footer=document.getElementById('footerCompany');if(footer)footer.textContent=name;
    const hero=document.getElementById('heroDescription');if(hero)hero.textContent=desc+' Purchase enquiries are handled directly through WhatsApp.';
    const hl=document.getElementById('heroLocation');if(hl)hl.textContent=loc;
    const ad=document.getElementById('aboutDescription');if(ad)ad.textContent=desc;
    const al=document.getElementById('aboutLocation');if(al)al.textContent=loc;
    const fc=document.getElementById('footerContact');if(fc)fc.innerHTML=esc(loc)+'<br>WhatsApp: '+esc(contacts[0]?.number||'')+' / '+esc(contacts[1]?.number||'');
    const c0=document.getElementById('contact0');if(c0)c0.textContent='WhatsApp '+(contacts[0]?.name||'Kanana');
    const c1=document.getElementById('contact1');if(c1)c1.textContent='WhatsApp '+(contacts[1]?.name||'Frank');
    const logo=s.logo;
    if(logo){const n=document.getElementById('navLogo');if(n)n.src=logo;const alogo=document.querySelector('.adminbrand .logo');if(alogo)alogo.src=logo;}
  }
  const originalLoadPublic=window.loadPublic;
  window.__dolandaFilter='All';
  window.addEventListener('load',function(){
    setTimeout(function(){
      const old=window.__dolandaState;
      if(window.CONTACTS||window.PRODUCTS){
        refreshPublicDetails();
        render();
        if(typeof renderPortfolio==='function')renderPortfolio();
      }
    },50);
  });
  const originalApiLoad=window.loadPublic;
  // backend-ui keeps its state private, so observe the globals it publishes and refresh after its load completes.
  const timer=setInterval(function(){
    if(window.PRODUCTS&&window.CONTACTS){
      refreshPublicDetails();
      render();
      if(typeof renderPortfolio==='function')renderPortfolio();
      clearInterval(timer);
    }
  },100);
  setTimeout(()=>clearInterval(timer),10000);
})();