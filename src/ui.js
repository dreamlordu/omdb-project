// ui.js - Sitenin görüntüsünü ve ekran değişimlerini yöneten dosya

// İnternet yavaşken filmler yükleniyormuş gibi görünen boş gri kutuları oluşturur
export const renderSkeleton = () => {
  // Filmlerin dizileceği ana kutuyu seç
  const box = document.querySelector(".grid");

  // Ekranı temizle
  box.innerHTML = "";

  // 6 tane hareketli (animasyonlu) boş kutu ekle
  for (let i = 0; i < 6; i++) {
    box.innerHTML += `
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
    `;
  }
};

// API'den gelen film listesini ekrana kartlar halinde basar
export const renderMovies = (movies) => {
  const box = document.querySelector(".grid");

  // Önceki aramadan kalanları veya yükleme kutularını temizle
  box.innerHTML = "";

  movies.forEach((movie) => {
    // Eğer filmin afiş resmi yoksa boş kalmasın diye yedek resim koy
    const poster =
      movie.Poster === "N/A"
        ? "https://via.placeholder.com/300x450"
        : movie.Poster;

    // Her film için bir kart tasarımı oluştur ve ekrana ekle
    box.innerHTML += `
      <div class="group bg-white border border-gray-400 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full">
        <div class="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src="${poster}"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt="${movie.Title}"
          />
          <div class="absolute top-2 right-2 bg-black/80 text-amber-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg border border-amber-500/30 uppercase">
            ${movie.Type}
          </div>
        </div>
        <div class="p-3 flex flex-col flex-grow">
          <hr class="border-gray-200" />
          <h2 class="text-black font-extrabold text-xs md:text-sm leading-tight line-clamp-2 mt-2">
            ${movie.Title}
            <span class="text-gray-400 font-normal ml-1 text-[10px] md:text-xs">(${movie.Year})</span>
          </h2>
          <div class="mt-auto pt-4">
            <button
              class="btn btn-xs md:btn-sm btn-outline border-gray-200 text-black hover:text-white bg-yellow-300 hover:border-amber-400 w-full font-bold uppercase rounded-lg transition-all"
              onclick="openDetail('${movie.imdbID}')"
            >
              İncele
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

// Ekranın bir köşesinde kullanıcıya hata veya uyarı mesajı gösterir
export const showAlert = (message) => {
  const warning = document.querySelector(".warning");

  // Eski uyarıları sil
  warning.innerHTML = "";

  // Yeni uyarıyı ekrana bas
  warning.innerHTML = `
    <div role="alert" class="alert alert-error alert-soft">
      <span>${message}</span>
    </div>
  `;

  // Mesaj 3 saniye sonra ekrandan otomatik kaybolsun
  setTimeout(() => {
    warning.innerHTML = "";
  }, 3000);
};
