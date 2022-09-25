const result = document.querySelector('.countries-container')
const btnSort = document.querySelectorAll('.btnSort')
let countries = [];
let sortMethod = "maxToMin"

async function countriesFetch() {
    await fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => countries = data);
    // console.log(countries);
}

async function countriesDisplay() {
    await countriesFetch();
    result.innerHTML = countries
        .filter((country) => 
        country.translations.fra.common
                .toLowerCase()
                .includes(inputSearch.value.toLowerCase())
            )
        .sort((a, b) => {
            if (sortMethod === "maxToMin") {
                return b.population - a.population;
            } else if (sortMethod === "minToMax") {
                return a.population - b.population;
            } else if (sortMethod === "alpha") {
                return a.translations.fra.common.localeCompare(b.translations.fra.common);
            }
          })
        .slice(0, inputRange.value)
        .map((country) => {
            return `
            <div class="card">
                <img src=${country.flags.svg} alt="drapeau de ${country.translations.fra.common}}">
                <h2>${country.translations.fra.common}</h2>
                <h4>${country.capital}</h4>
                <p>${country.population.toLocaleString()}</p>
            </div>
            `
        })
        .join('')
}
countriesDisplay()

// window.addEventListener("load", countriesFetch);
inputSearch.addEventListener('input', countriesDisplay);
inputRange.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value;
    countriesDisplay();
});
btnSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        sortMethod = e.target.id;
        countriesDisplay()
    });
});
