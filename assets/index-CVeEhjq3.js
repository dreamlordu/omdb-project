(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`d8a4e364`,t=async t=>await(await fetch(`https://www.omdbapi.com/?s=${t}&apikey=${e}`)).json(),n=async t=>await(await fetch(`https://www.omdbapi.com/?i=${t}&apikey=${e}`)).json(),r=()=>{let e=document.querySelector(`.grid`);e.innerHTML=``;for(let t=0;t<6;t++)e.innerHTML+=`
      <div class="group bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
        <div class="relative aspect-[2/3] w-full skeleton rounded-none">
          <div class="absolute top-2 right-2 bg-gray-300 h-5 w-12 rounded-lg opacity-50"></div>
        </div>
        <div class="p-3 flex flex-col flex-grow">
          <hr class="border-gray-100" />
          <div class="mt-2 space-y-2">
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-3/4"></div>
          </div>
          <div class="mt-auto pt-4">
            <div class="skeleton h-8 md:h-10 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    `},i=e=>{let t=document.querySelector(`.grid`);t.innerHTML=``,e.forEach(e=>{let n=e.Poster===`N/A`?`https://via.placeholder.com/300x450`:e.Poster;t.innerHTML+=`
      <div class="group bg-white border border-gray-400 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full">
        <div class="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src="${n}"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt="${e.Title}"
          />
          <div class="absolute top-2 right-2 bg-black/80 text-amber-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg border border-amber-500/30 uppercase">
            ${e.Type}
          </div>
        </div>
        <div class="p-3 flex flex-col flex-grow">
          <hr class="border-gray-200" />
          <h2 class="text-black font-extrabold text-xs md:text-sm leading-tight line-clamp-2 mt-2">
            ${e.Title}
            <span class="text-gray-400 font-normal ml-1 text-[10px] md:text-xs">(${e.Year})</span>
          </h2>
          <div class="mt-auto pt-4">
            <button
              class="btn btn-xs md:btn-sm btn-outline border-gray-200 text-black hover:text-white bg-yellow-300 hover:border-amber-400 w-full font-bold uppercase rounded-lg transition-all"
              onclick="openDetail('${e.imdbID}')"
            >
              İncele
            </button>
          </div>
        </div>
      </div>
    `})},a=e=>{let t=document.querySelector(`.warning`);t.innerHTML=``,t.innerHTML=`
    <div role="alert" class="alert alert-error alert-soft">
      <span>${e}</span>
    </div>
  `,setTimeout(()=>{t.innerHTML=``},3e3)},o=`lastSearch`,s=e=>{try{e&&localStorage.setItem(o,e)}catch(e){console.error(`Kayıt hatası oluştu:`,e)}},c=()=>{try{return localStorage.getItem(o)}catch(e){return console.error(`Okuma hatası oluştu:`,e),null}},l=document.querySelector(`form`),u=document.querySelector(`#search-input`),d=[];l.addEventListener(`submit`,async e=>{e.preventDefault();let o=u.value.trim();if(!o){a(`Lütfen bir film adı giriniz!`);return}try{r();let e=await t(o);if(e.Response===`True`){d=[];for(let t of e.Search){let e=await n(t.imdbID);d.push(e)}i(d),s(o)}else a(e.Error)}catch(e){console.error(`Arama hatası:`,e),a(`Bağlantı hatası! Lütfen internetinizi kontrol edin.`)}});var f=()=>{let e=document.querySelector(`#genre-filter`).value,t=document.querySelector(`#year-range`).value,n=document.querySelector(`#rating-range`).value,r=d.filter(r=>{let i=parseInt(r.Year),a=parseFloat(r.imdbRating)||0;return(e===``||r.Genre.includes(e))&&i<=t&&a>=n});r.length>0?i(r):document.querySelector(`.grid`).innerHTML=`
      <p class="col-span-full text-center py-20 text-gray-400">No movies found.</p>`};document.querySelector(`#reset-filter`).addEventListener(`click`,()=>{f(),document.querySelector(`#filter-drawer`).checked=!1}),document.querySelector(`#year-range`).addEventListener(`input`,e=>{document.querySelector(`#year-value`).textContent=e.target.value}),document.querySelector(`#rating-range`).addEventListener(`input`,e=>{document.querySelector(`#rating-value`).textContent=parseFloat(e.target.value).toFixed(1)}),document.querySelector(`#clear-btn`).addEventListener(`click`,()=>{u.value===``?a(`Silinecek bir değer yok!`):(u.value=``,u.focus())}),window.addEventListener(`DOMContentLoaded`,()=>{let e=c();e&&(u.value=e,l.dispatchEvent(new Event(`submit`)))}),window.openDetail=async e=>{try{let t=await n(e);if(!t||t.Response===`False`)return a(`Hata oluştu!`);let r=t.Poster===`N/A`?`https://via.placeholder.com/300x450`:t.Poster;document.querySelector(`.modalbox`).innerHTML=`
      <dialog id="movie_detail_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box p-0 max-w-3xl bg-base-100 relative">
          <form method="dialog">
            <button class="btn btn-sm btn-circle absolute right-4 top-4 z-50">✕</button>
          </form>
          <div class="flex flex-col md:flex-row">
            <img src="${r}" class="w-full md:w-2/5 object-cover" alt="${t.Title}" />
            <div class="p-8">
              <h3 class="text-2xl font-bold leading-tight">${t.Title}</h3>
              <p class="text-sm text-gray-500 mt-1">${t.Year} • ${t.Genre} • ${t.Runtime}</p>
              <div class="divider"></div>
              <div class="space-y-3">
                <p class="text-sm leading-relaxed text-base-content/80">${t.Plot}</p>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Yönetmen</span>
                  <span class="text-sm font-semibold">${t.Director}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">IMDb Puanı</span>
                  <span class="text-sm font-bold text-warning">⭐ ${t.imdbRating} / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>`,document.getElementById(`movie_detail_modal`).showModal()}catch(e){console.error(`Detay hatası:`,e),a(`Film detayları yüklenemedi.`)}};