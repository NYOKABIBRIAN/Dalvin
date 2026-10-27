(function(){
  const FALLBACK_CONTACTS=[{name:'Kanana Muikas',number:'0794342949'},{name:'Frank Warui',number:'+254797326156'}];
  const normalize=n=>{let v=String(n??'').replace(/\D/g,'');if(v.startsWith('00'))v=v.slice(2);if(v.startsWith('0'))v='254'+v.slice(1);return v;};
  const contacts=()=>Array.isArray(window.CONTACTS)&&window.CONTACTS.length?window.CONTACTS:FALLBACK_CONTACTS;
  window.openWhatsApp=function(index,text){
    const c=contacts()[Number(index)];
    const n=normalize(c&&c.number);
    if(!/^254\d{9}$/.test(n)){alert('WhatsApp contact is not configured correctly.');return;}
    const msg=text||'Hello Dolanda Company, I would like to enquire about purchasing event equipment.';
    const url='https://wa.me/'+n+'?text='+encodeURIComponent(msg);
    const w=window.open(url,'_blank');
    if(!w)window.location.href=url;
  };
  function bindAdmin(){
    const admin=document.querySelector('button.admin');
    if(!admin)return;
    admin.onclick=function(e){
      e.preventDefault();e.stopPropagation();
      try{
        if(typeof window.renderAdmin==='function'){window.renderAdmin();}
        else if(typeof window.adminLogin==='function'){window.adminLogin();}
        else{alert('Admin panel is still loading. Please try again in a moment.');}
      }catch(err){console.error(err);if(typeof window.adminLogin==='function')window.adminLogin();}
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAdmin);else bindAdmin();
  window.addEventListener('load',bindAdmin);
  setTimeout(bindAdmin,500);
})();