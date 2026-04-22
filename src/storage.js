// storage.js - Sitenin hafıza işlemlerini yöneten dosya

// Hafızaya kaydedilecek verinin anahtar ismi
const SEARCH_KEY = "lastSearch";

// Aranan film adını tarayıcının hafızasına kaydeder
export const saveLastSearch = (movieName) => {
  try {
    // Eğer bir isim girilmişse hafızaya yaz
    if (movieName) {
      localStorage.setItem(SEARCH_KEY, movieName);
    }
  } catch (error) {
    // Hafıza doluysa veya bir sorun çıkarsa hatayı yazdır
    console.error("Kayıt hatası oluştu:", error);
  }
};

// Hafızada kayıtlı olan son film adını geri getirir
export const getLastSearch = () => {
  try {
    return localStorage.getItem(SEARCH_KEY);
  } catch (error) {
    // Okurken bir sorun çıkarsa uygulamayı bozmamak için boş dön
    console.error("Okuma hatası oluştu:", error);
    return null;
  }
};

// Hafızadaki kayıtlı aramayı siler
export const clearStorage = () => {
  try {
    localStorage.removeItem(SEARCH_KEY);
  } catch (error) {
    console.error("Silme hatası oluştu:", error);
  }
};
