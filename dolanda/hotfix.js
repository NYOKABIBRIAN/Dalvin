(function(){
  const normalize=n=>String(n??'').replace(/\D/g,'').replace(/^0/,'254');
  window.openWhatsApp=function(index,text){
    const c=(window.CONTACTS||[])[index];
    const n=normalize(c&&c.number);
    if(!n){alert('WhatsApp contact is currently unavailable.');return;}
    const msg=text||'Hello Dolanda Company, I would like to enquire about purchasing event equipment.';
    window.location.href='https://api.whatsapp.com/send?phone='+n+'&text='+encodeURIComponent(msg);
  };
  window.addEventListener('DOMContentLoaded',function(){
    const admin=document.querySelector('button.admin');
    if(admin){admin.onclick=function(e){e.preventDefault();if(typeof window.renderAdmin==='function')window.renderAdmin();else if(typeof window.adminLogin==='function')window.adminLogin();};}
  });
})();
