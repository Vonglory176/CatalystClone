import{j as a,L as p,_,p as u}from"./index-0197721e.js";import"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";import"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import"https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";function h({product:e}){const s=Object.values(e.variants).find(r=>r.isPrimaryVariant),c=e.variantsHaveImages?s.images.image1:e.images.image1;let i=e.universe==="Other"?"":e.universe,d=e.id,t=e.name,l=s.price,n=c.link,m=c.alt;return a.jsxs(p,{to:`/collections/${i}/products/${d}`,className:"product-card",children:[a.jsx("div",{className:"product-card__image-container",children:a.jsx("div",{className:"product-card__image-wrapper",children:a.jsx("div",{className:"product-card__image",children:a.jsx(_,{src:n,placeholder:u,children:(r,o)=>a.jsx("img",{src:r,alt:m,className:o?"imgLoading":"imgLoaded"})})})})}),a.jsxs("div",{className:"product-card__info",children:[a.jsx("div",{className:"product-card__name",children:`${i?i+":":""} ${t}`}),a.jsxs("div",{className:"product-card__price",children:["$",l]})]}),a.jsx("div",{className:"product-card__overlay",children:a.jsx("span",{className:"btn product-card__overlay-btn",children:"View"})})]})}export{h as default};
