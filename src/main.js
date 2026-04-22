/**
 * main.js - Uygulama Ana Kontrol Merkezi
 * --------------------------------------------------
 * Bu dosya, uygulamanın iş mantığını ve modüller arasındaki
 * veri akışını yöneten ana sinir merkezidir.
 * --------------------------------------------------
 */

import { movieSearch, getMovieDetails } from "/src/api.js";
import { renderSkeleton, renderMovies, showAlert } from "/src/ui.js";
import { saveLastSearch, getLastSearch } from "/src/storage.js";

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search-input");

/**
 * Uygulama genelinde çekilen orijinal film verilerini tutan liste.
 * Filtreleme işlemleri API'ye yük bindirmemek için bu değişken üzerinden yapılır.
 */
let allMovies = [];

// --- 1. ARAMA İŞLEMLERİ ---
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movieName = searchInput.value.trim();

  // Kullanıcı boş arama yaparsa işlemi durdur ve uyarı ver
  if (!movieName) {
    showAlert("Lütfen bir film adı giriniz!");
    return;
  }

  try {
    // Veri beklenirken kullanıcıya yüklenme animasyonunu (Skeleton) göster
    renderSkeleton();

    // API'den temel arama sonuçlarını getir
    const data = await movieSearch(movieName);

    if (data.Response === "True") {
      allMovies = []; // Yeni arama için listeyi sıfırla

      // Her filmin detaylı bilgilerini (Puan, Yönetmen vb.) döngü ile tek tek çek
      for (const item of data.Search) {
        const detail = await getMovieDetails(item.imdbID);
        allMovies.push(detail);
      }

      // Verileri ekrana bas ve son aramayı tarayıcı hafızasına kaydet
      renderMovies(allMovies);
      saveLastSearch(movieName);
    } else {
      // API'den gelen hata mesajını (Film bulunamadı vb.) kullanıcıya yansıt
      showAlert(data.Error);
    }
  } catch (error) {
    // Beklenmedik ağ veya sistem hatalarını yakala
    console.error("Arama hatası:", error);
    showAlert("Bağlantı hatası! Lütfen internetinizi kontrol edin.");
  }
});

// --- 2. FİLTRELEME MANTIĞI ---
/**
 * Mevcut film listesini, kullanıcı kriterlerine (Tür, Yıl, Puan) göre
 * süzgeçten geçiren ve ekranı güncelleyen fonksiyon.
 */
const filterMovies = () => {
  // Arayüzdeki (UI) filtre değerlerini oku
  const genre = document.querySelector("#genre-filter").value;
  const year = document.querySelector("#year-range").value;
  const rating = document.querySelector("#rating-range").value;

  // JavaScript .filter() metodu ile şartlara uyan filmleri ayıkla
  const filteredList = allMovies.filter((movie) => {
    // Sayısal karşılaştırma için değerleri dönüştür
    const movieYear = parseInt(movie.Year);
    const movieRating = parseFloat(movie.imdbRating) || 0;

    // Filtreleme koşullarını kontrol et
    const genreMatch = genre === "" || movie.Genre.includes(genre);
    const yearMatch = movieYear <= year;
    const ratingMatch = movieRating >= rating;

    return genreMatch && yearMatch && ratingMatch;
  });

  // Sonuç varsa göster, yoksa kullanıcıya "Bulunamadı" mesajı dön
  if (filteredList.length > 0) {
    renderMovies(filteredList);
  } else {
    document.querySelector(".grid").innerHTML = `
      <p class="col-span-full text-center py-20 text-gray-400">No movies found.</p>`;
  }
};

// --- 3. EVENT LISTENERS (Olay İzleyiciler) ---

// Filtre panelindeki "Uygula" butonu
document.querySelector("#reset-filter").addEventListener("click", () => {
  filterMovies();
  document.querySelector("#filter-drawer").checked = false; // Paneli kapat
});

// Yıl slider'ı değiştiğinde ekrandaki metni anlık güncelle
document.querySelector("#year-range").addEventListener("input", (e) => {
  document.querySelector("#year-value").textContent = e.target.value;
});

// Puan slider'ı değiştiğinde ekrandaki metni anlık güncelle
document.querySelector("#rating-range").addEventListener("input", (e) => {
  document.querySelector("#rating-value").textContent = parseFloat(
    e.target.value,
  ).toFixed(1);
});

// Arama kutusundaki temizleme (X) butonu
document.querySelector("#clear-btn").addEventListener("click", () => {
  if (searchInput.value === "") {
    showAlert("Silinecek bir değer yok!");
  } else {
    searchInput.value = "";
    searchInput.focus();
  }
});

/**
 * Sayfa ilk açıldığında çalışır.
 * LocalStorage'daki son aramayı hatırlar ve otomatik olarak sonuçları getirir.
 */
window.addEventListener("DOMContentLoaded", () => {
  const lastSearch = getLastSearch();
  if (lastSearch) {
    searchInput.value = lastSearch;
    searchForm.dispatchEvent(new Event("submit"));
  }
});

// --- 4. DETAY PENCERESİ (MODAL) ---
/**
 * Bir film "İncele" butonuna tıklandığında çalışır.
 * IMDb ID üzerinden detayları çeker ve modal yapısını oluşturur.
 */
window.openDetail = async (id) => {
  try {
    const detail = await getMovieDetails(id);
    if (!detail || detail.Response === "False")
      return showAlert("Hata oluştu!");

    // Afiş resmi yoksa yer tutucu (placeholder) bir görsel ata
    const poster =
      detail.Poster !== "N/A"
        ? detail.Poster
        : "https://via.placeholder.com/300x450";

    // Dinamik olarak Modal içeriğini oluştur ve sayfaya enjekte et
    document.querySelector(".modalbox").innerHTML = `
      <dialog id="movie_detail_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box p-0 max-w-3xl bg-base-100 relative">
          <form method="dialog">
            <button class="btn btn-sm btn-circle absolute right-4 top-4 z-50">✕</button>
          </form>
          <div class="flex flex-col md:flex-row">
            <img src="${poster}" class="w-full md:w-2/5 object-cover" alt="${detail.Title}" />
            <div class="p-8">
              <h3 class="text-2xl font-bold leading-tight">${detail.Title}</h3>
              <p class="text-sm text-gray-500 mt-1">${detail.Year} • ${detail.Genre} • ${detail.Runtime}</p>
              <div class="divider"></div>
              <div class="space-y-3">
                <p class="text-sm leading-relaxed text-base-content/80">${detail.Plot}</p>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Yönetmen</span>
                  <span class="text-sm font-semibold">${detail.Director}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">IMDb Puanı</span>
                  <span class="text-sm font-bold text-warning">⭐ ${detail.imdbRating} / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>`;

    // DaisyUI modal bileşenini göster
    document.getElementById("movie_detail_modal").showModal();
  } catch (error) {
    console.error("Detay hatası:", error);
    showAlert("Film detayları yüklenemedi.");
  }
};
