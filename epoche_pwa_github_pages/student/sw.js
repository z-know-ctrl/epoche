
const CACHE='epoche-student-v4';
const ASSETS=['./','./index.html','./manifest.webmanifest','../icon-192.png','../icon-512.png','../data/sentences.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('message',e=>{ if(e.data && e.data.type==='SKIP_WAITING'){ self.skipWaiting(); }});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method==='GET' && url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
