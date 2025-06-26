const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionSelect = document.getElementById("region-filter");

let countries = [];

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population");
  const data = await response.json();
  countries = data;
  renderCountries(data);
}

function renderCountries(data) {
  container.innerHTML = "";
  data.forEach(country => {
    const card = document.createElement("div");
    card.className = "country-card";
    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag" />
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

function filterCountries() {
  const searchValue = searchInput.value.toLowerCase();
  const regionValue = regionSelect.value;

  let filtered = countries;

  if (searchValue) {
    filtered = filtered.filter(c =>
      c.name.common.toLowerCase().includes(searchValue)
    );
  }

  if (regionValue) {
    filtered = filtered.filter(c => c.region === regionValue);
  }

  renderCountries(filtered);
}

// Event listeners for live filtering
searchInput.addEventListener("input", filterCountries);
regionSelect.addEventListener("change", filterCountries);

// Load countries on page load
fetchCountries();
