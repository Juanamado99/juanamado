async function loadLanguage(lang) {
    const response = await fetch(`/lang/${lang}.json`);
    const translations = await response.json();
    
    document.querySelectorAll("[data-i18n]").forEach(element => {
    const keys = element.getAttribute("data-i18n").split(".");
    let text = translations;

    keys.forEach(key => {
        text = text[key];
    });

    if (text) element.innerText = text;
    });

    localStorage.setItem("language", lang);
}

function detectLanguage() {
    const savedLang = localStorage.getItem("language");
    if (savedLang)
        return savedLang;

    const browserLang = navigator.language.slice(0,2);
    if (["en","es","de"].includes(browserLang))
        return browserLang;

    return "en";
}

document.addEventListener("DOMContentLoaded", () => {
    const lang = detectLanguage();
    loadLanguage(lang);
});