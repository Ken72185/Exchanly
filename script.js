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
const exchangeRateTxt = document.querySelector(".exchange-rate");

window.addEventListener("load", () => {
    country_list.forEach(code => {
        let selectedFrom = code == "IDR" ? "selected" : "";
        let selectedTo = code == "USD" ? "selected" : "";
        fromCurr.insertAdjacentHTML("beforeend", `<option value="${code}" ${selectedFrom}>${code}</option>`);
        toCurr.insertAdjacentHTML("beforeend", `<option value="${code}" ${selectedTo}>${code}</option>`);
    });
    getExchangeRate();
});

getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

async function getExchangeRate() {
    const amount = document.querySelector("form input");
    let amountVal = amount.value;
    
    // Validasi input biar gak kosong atau nol
    if (amountVal === "" || amountVal === "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Sabar, lagi ngitung...";

    try {
        const response = await fetch(`/api/convert?from=${fromCurr.value}`);
        const result = await response.json();
        
        // Cek apakah data rates ada dalam response
        if (result.conversion_rates) {
            let rate = result.conversion_rates[toCurr.value];
            let total = (amountVal * rate).toLocaleString('id-ID', { minimumFractionDigits: 2 });
            exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
        } else {
            exchangeRateTxt.innerText = "Data kurs tidak ditemukan.";
        }
    } catch (error) {
        console.error(error);
        exchangeRateTxt.innerText = "Gagal mengambil data.";
    }
} // Titik koma atau koma tadi sudah dihapus di sini
