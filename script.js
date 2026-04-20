// Daftar Kode Mata Uang Dunia
const country_list = [
    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRV", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
    "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
    "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR",
    "ZMW", "ZWL"
];

const fromCurr = document.querySelector("#fromCurrency");
const toCurr = document.querySelector("#toCurrency");
const getBtn = document.querySelector("#getBtn");
const amountInput = document.querySelector(".amount input");
const exchangeRateTxt = document.querySelector(".exchange-rate");

// Isi Dropdown secara otomatis
window.addEventListener("load", () => {
    for (let i = 0; i < country_list.length; i++) {
        let code = country_list[i];
        
        // Default: Dari IDR ke USD
        let selectedFrom = code == "IDR" ? "selected" : "";
        let selectedTo = code == "USD" ? "selected" : "";

        let optionTagFrom = `<option value="${code}" ${selectedFrom}>${code}</option>`;
        let optionTagTo = `<option value="${code}" ${selectedTo}>${code}</option>`;
        
        fromCurr.insertAdjacentHTML("beforeend", optionTagFrom);
        toCurr.insertAdjacentHTML("beforeend", optionTagTo);
    }
    getExchangeRate(); // Jalankan kurs saat pertama buka
});

// Event Klik Tombol
getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

// Tombol Tukar (Swap) posisi mata uang
const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;
    getExchangeRate();
});

async function getExchangeRate() {
    const amount = document.querySelector("form input");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Mengambil data kurs...";

    // GANTI 'YOUR_API_KEY' dengan API Key dari exchangerate-api.com
    const API_KEY = "4674ab73367c03b754d1fada"; 
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurr.value}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        let exchangeRate = result.conversion_rates[toCurr.value];
        let totalExRate = (amountVal * exchangeRate).toLocaleString('id-ID', { minimumFractionDigits: 2 });
        exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
    } catch (error) {
        exchangeRateTxt.innerText = "Ada yang salah / API Key belum diisi";
    }
      }
