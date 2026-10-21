'use strict';
const modules=JSON.parse(document.getElementById('module-data').textContent);
const tabs=[...document.querySelectorAll('[role="tab"]')];
const panel=document.getElementById('module-panel');
const img=document.getElementById('module-image');
const imageButton=document.getElementById('module-image-button');
let selected=0;
function selectModule(index,focus=false){
 selected=index;
 const item=modules[index];
 tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
 document.getElementById('module-name').textContent=item.headline;
 document.getElementById('module-kicker').textContent=item.name;
 document.getElementById('module-description').textContent=item.description;
 panel.setAttribute('aria-labelledby',`tab-${index}`);
 img.src=`assets/${item.image}`;img.alt=item.alt;
 imageButton.className=`module-image-button ${item.kind}`;
 imageButton.setAttribute('aria-label',`Ampliar captura de ${item.name}`);
 if(focus)tabs[index].focus();
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>selectModule(i));
 tab.addEventListener('keydown',event=>{
 let next=i;
 if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(i+1)%tabs.length;
 else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=tabs.length-1;
 else return;
 event.preventDefault();selectModule(next,true);
 });
});
const dialog=document.getElementById('image-dialog');
imageButton.addEventListener('click',()=>{
 const m=modules[selected];
 document.getElementById('dialog-title').textContent=m.name;
 const full=document.getElementById('dialog-image');full.src=`assets/${m.image}`;full.alt=m.alt;
 document.getElementById('dialog-viewport').className=m.kind;
 dialog.showModal();document.body.style.overflow='hidden';
});
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';imageButton.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const questions=[...document.querySelectorAll('.accordion details')];
questions.forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)questions.forEach(other=>{if(other!==detail)other.open=false;});}));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
