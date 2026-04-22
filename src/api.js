// api.js - Film verilerini internetten çeken dosya

// OMDB sitesinden aldığımız özel anahtar (şifre)
const API_KEY = "d8a4e364";

// Film ismine göre internette genel bir arama yapar
export const movieSearch = async (name) => {
  // Verilen ismi kullanarak film listesini ister
  const reply = await fetch(
    `https://www.omdbapi.com/?s=${name}&apikey=${API_KEY}`,
  );
  // Gelen cevabı bilgisayarın anlayacağı formata çevirip gönderir
  return await reply.json();
};

// IMDb kimlik numarasına (id) göre filmin tüm detaylarını getirir
export const getMovieDetails = async (id) => {
  // Filmin puanı, konusu, yönetmeni gibi tüm detayları ister
  const reply = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
  );
  // Detaylı bilgileri geri gönderir
  return await reply.json();
};
