(() => {
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  const hideLoader = () => {
    const loader = $('.loader');
    if (!loader) return;
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 900);
  };
  // Never allow the loading screen to block the portfolio.
  window.addEventListener('load', () => setTimeout(hideLoader, 450), { once: true });
  setTimeout(hideLoader, 2200);

  // Theme
  const themeBtn = $('#themeToggle');
  const savedTheme = localStorage.getItem('govind-theme');
  if (savedTheme === 'light') document.body.classList.add('light');
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('govind-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    themeBtn.textContent = document.body.classList.contains('light') ? '☾' : '☼';
  });

  // Mobile navigation
  const menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu');
  menuBtn?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Typewriter
  const typed = $('#typed');
  const roles = ['PHP Backend Developer','Web Application Developer','MySQL & API Developer','IT Instructor'];
  let ri=0, ci=0, deleting=false;
  function typeLoop(){
    if(!typed) return;
    const word=roles[ri];
    typed.textContent=word.slice(0,ci);
    if(!deleting && ci < word.length){ci++;setTimeout(typeLoop,75)}
    else if(!deleting){deleting=true;setTimeout(typeLoop,1700)}
    else if(ci>0){ci--;setTimeout(typeLoop,38)}
    else{deleting=false;ri=(ri+1)%roles.length;setTimeout(typeLoop,400)}
  }
  typeLoop();

  // Smooth scroll / GSAP motion
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({duration:1.15,smoothWheel:true,lerp:.08});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf)} requestAnimationFrame(raf);
  }
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on('scroll', ScrollTrigger.update);
    gsap.from('.hero-copy > *',{y:35,opacity:0,duration:1,stagger:.08,ease:'power3.out',delay:.7});
    gsap.from('.hero-art',{x:55,opacity:0,duration:1.25,ease:'power3.out',delay:.8});
    gsap.to('.portrait-wrap',{y:-12,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
    gsap.to('.orbital-1',{rotation:360,duration:24,repeat:-1,ease:'none'});
    gsap.to('.orbital-2',{rotation:-360,duration:32,repeat:-1,ease:'none'});
    gsap.to('.orbital-3',{rotation:360,duration:40,repeat:-1,ease:'none'});
    gsap.to('.floating-chip',{y:-12,duration:1.7,stagger:.25,repeat:-1,yoyo:true,ease:'sine.inOut'});
    $$('.reveal').forEach(el=>gsap.fromTo(el,{y:45,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
    gsap.to('.hero-art',{yPercent:8,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:1}});
    gsap.to('.ticker-track',{xPercent:-18,ease:'none',scrollTrigger:{trigger:'.skill-ticker',start:'top bottom',end:'bottom top',scrub:1}});
  } else {
    $$('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }

  // Active navigation
  const sections = ['home','about','education','projects','experience','certifications','contact'].map(id=>document.getElementById(id)).filter(Boolean);
  const navLinks = $$('.nav-links a');
  const updateActive = () => {
    let current='home';
    sections.forEach(sec=>{ if(window.scrollY >= sec.offsetTop - 180) current=sec.id; });
    navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
  };
  window.addEventListener('scroll', updateActive, {passive:true}); updateActive();

  // Progress
  const progress=$('.scroll-progress');
  window.addEventListener('scroll',()=>{
    const h=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
  },{passive:true});

  // Cursor
  if(matchMedia('(min-width:1100px)').matches){
    const cur=$('.cursor'),dot=$('.cursor-dot'); let mx=0,my=0,dx=0,dy=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
    function cursorRaf(){dx+=(mx-dx)*.16;dy+=(my-dy)*.16;cur.style.left=dx+'px';cur.style.top=dy+'px';requestAnimationFrame(cursorRaf)} cursorRaf();
    $$('.magnetic').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cur.style.width='58px';cur.style.height='58px'});
      el.addEventListener('mouseleave',()=>{cur.style.width='36px';cur.style.height='36px';el.style.transform=''});
      el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*.12,y=(e.clientY-(r.top+r.height/2))*.12;el.style.transform=`translate(${x}px,${y}px)`});
    });
  }

  // Tilt cards
  $$('.vip-card,.journey-card,.project-card,.cert-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(window.innerWidth<1000)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });


  // Duplicate horizontal tracks for seamless continuous movement.
  $$('.project-track,.journey-track').forEach(track=>{
    if(track.dataset.duplicated) return;
    const items=[...track.children];
    items.forEach(item=>{ const copy=item.cloneNode(true); copy.setAttribute('aria-hidden','true'); track.appendChild(copy); });
    track.dataset.duplicated='true';
  });

  // Social placeholders are intentionally non-navigating until personal URLs are supplied.
  $$('.placeholder-link[data-placeholder="true"]').forEach(link=>link.addEventListener('click',e=>{
    e.preventDefault();
  }));

  // Direct message -> mail client
  $('#messageForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(e.currentTarget), name=fd.get('name'), email=fd.get('email'), subject=fd.get('subject'), message=fd.get('message');
    const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href=`mailto:govindkolhi2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#formNote').textContent='Opening your email client…';
  });

  // Subscribe: mailto fallback without requiring a backend service
  $('#subscribeForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const email=e.currentTarget.querySelector('input').value;
    localStorage.setItem('govind-subscribe-email',email);
    window.location.href=`mailto:govindkolhi2002@gmail.com?subject=${encodeURIComponent('Portfolio Updates Subscription')}&body=${encodeURIComponent('Please add this email to the portfolio updates list: '+email)}`;
    $('#subscribeNote').textContent='Opening email client…';
  });
})();
