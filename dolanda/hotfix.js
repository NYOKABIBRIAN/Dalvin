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
    window.location.href=url;
  };

  function showFallbackLogin(){
    if(typeof window.adminLogin==='function'){window.adminLogin();return;}
    let box=document.getElementById('dolanda-admin-fallback');
    if(!box){
      box=document.createElement('div');box.id='dolanda-admin-fallback';
      box.style='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.65);display:grid;place-items:center;padding:20px;font-family:Arial,sans-serif';
      box.innerHTML='<div style="background:#fff;border-radius:18px;padding:28px;width:min(420px,100%);box-shadow:0 20px 60px #0005"><h2 style="margin-top:0;color:#087443">Dolanda Company Admin</h2><p style="color:#60756b">Sign in to open the private dashboard.</p><label style="display:block;font-weight:700;margin:12px 0 6px">Username</label><input id="dolandaAdminUser" autocomplete="username" style="width:100%;padding:12px;border:1px solid #d5e4dc;border-radius:10px;box-sizing:border-box"><label style="display:block;font-weight:700;margin:12px 0 6px">Password</label><input id="dolandaAdminPass" type="password" autocomplete="current-password" style="width:100%;padding:12px;border:1px solid #d5e4dc;border-radius:10px;box-sizing:border-box"><button id="dolandaAdminLogin" style="width:100%;margin-top:16px;padding:12px;border:0;border-radius:10px;background:#087443;color:#fff;font-weight:800">Sign in</button><button id="dolandaAdminClose" style="width:100%;margin-top:8px;padding:10px;border:0;border-radius:10px;background:#eef5f1;color:#087443;font-weight:800">Cancel</button><div id="dolandaAdminStatus" style="margin-top:10px;text-align:center;color:#a21b1b"></div></div>';
      document.body.appendChild(box);
      document.getElementById('dolandaAdminClose').onclick=()=>box.remove();
      document.getElementById('dolandaAdminLogin').onclick=async()=>{
        const u=document.getElementById('dolandaAdminUser').value.trim();
        const p=document.getElementById('dolandaAdminPass').value;
        const status=document.getElementById('dolandaAdminStatus');
        if(!u||!p){status.textContent='Enter your username and password.';return;}
        try{
          const r=await fetch('/api/login',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})});
          const d=await r.json();
          if(!r.ok)throw new Error(d.error||'Login failed');
          box.remove();
          if(typeof window.renderAdmin==='function')await window.renderAdmin();
          else window.location.reload();
        }catch(e){status.textContent=e.message||'Login failed';}
      };
      document.getElementById('dolandaAdminUser').focus();
    }
  }

  function bindAdmin(){
    document.querySelectorAll('button.admin').forEach(admin=>{
      admin.onclick=function(e){
        e.preventDefault();e.stopImmediatePropagation();
        try{showFallbackLogin();}catch(err){console.error(err);alert('The admin login could not be opened. Please refresh the page and try again.');}
      };
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAdmin);else bindAdmin();
  window.addEventListener('load',bindAdmin);
  setTimeout(bindAdmin,100);
  setTimeout(bindAdmin,500);
})();