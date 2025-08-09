const contentWrapper = document.querySelector(".js-content");
const filterInput = document.querySelector(".filter__input");
const sortRadios = document.querySelectorAll('input[name="sort"]');
const clearBtn = document.querySelector(".clear-btn");
const sortBtn = document.querySelector(".sort-btn");

let channelsData = [];
let filteredChannelsData = [];
let sortDirection = "asc"; // lub "desc"

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await fetchChannels();
  setEventListeners();
}

async function fetchChannels() {
  try {
    const res = await fetch("./channels.json");
    if (!res.ok) throw new Error(`Status code ${res.status}`);
    const data = await res.json();

    channelsData = data.map(channel => ({
      title: channel.title,
      logo: {
        srcMedium: channel.thumbnails.medium.url,
        srcHigh: channel.thumbnails.high.url,
        width: channel.thumbnails.medium.width,
        height: channel.thumbnails.medium.height,
      },
      url: channel.customUrl,
      subscribers: parseNumber(channel.statistics.subscriberCount),
      videos: parseNumber(channel.statistics.videoCount),
      views: parseNumber(channel.statistics.viewCount),
    }));

    filteredChannelsData = [...channelsData];
    renderChannels(channelsData);
  } catch (err) {
    console.error("Error loading channels:", err);
    contentWrapper.innerHTML = "<p>Failed to load channels!</p>";
  }
}

function renderChannels(channels) {
  contentWrapper.innerHTML =
    channels.length > 0
      ? channels
          .map(
            channel => `
    <article class="channel" data-url="${channel.url}">
      <img 
        class="channel__logo"
        src="${channel.logo.srcMedium}"
        srcset="${channel.logo.srcMedium} 1x, ${channel.logo.srcHigh} 2x"
        width="${channel.logo.width}"
        height="${channel.logo.height}"
        alt="${channel.title}" />
      <h2 class="channel__title">${channel.title}</h2>
      <div class="channel__stats">
        <p class="channel__text">SUBSCRIBERS: <span class="channel__value">${formatNumber(
          channel.subscribers
        )}</span></p>
        <p class="channel__text">VIDEOS: <span class="channel__value">${formatNumber(
          channel.videos
        )}</span></p>
        <p class="channel__text">VIEWS: <span class="channel__value">${formatNumber(
          channel.views
        )}</span></p>
      </div>
    </article>
  `
          )
          .join("")
      : "<p>No matching channels</p>";
}

function setEventListeners() {
  clearBtn.addEventListener("click", clearFilters);
  sortBtn.addEventListener("click", toggleSortBtn);
  sortRadios.forEach(radio => radio.addEventListener("change", setSort));
  filterInput.addEventListener("input", handleFilterInput);
}

function setSort() {
  const selectedRadio = document.querySelector("input[name='sort']:checked");

  if (selectedRadio) {
    const radioSortingMethod = selectedRadio.id.replace("sort-", "");
    sortBtn.disabled = false;

    filteredChannelsData.sort((a, b) => {
      const methodA = a[radioSortingMethod];
      const methodB = b[radioSortingMethod];

      if (typeof methodA === "string") {
        return sortDirection === "asc"
          ? methodA.localeCompare(methodB)
          : methodB.localeCompare(methodA);
      } else {
        return sortDirection === "asc" ? methodA - methodB : methodB - methodA;
      }
    });
  }

  clearBtn.disabled = filterInput.value || selectedRadio ? false : true;
  renderChannels(filteredChannelsData);
}

function toggleSortBtn() {
  const selectedRadio = document.querySelector("input[name='sort']:checked");

  if (selectedRadio) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
    sortBtn.innerText = `${sortDirection} ↑↓`;
    setSort();
  }
}

function handleFilterInput() {
  const filterInputText = normalizeText(filterInput.value);

  filteredChannelsData = channelsData.filter(channel =>
    normalizeText(channel.title).includes(filterInputText)
  );

  setSort();
}

function clearFilters() {
  const selectedRadio = document.querySelector("input[name='sort']:checked");

  if (filterInput.value || selectedRadio) {
    filterInput.value = "";
    sortRadios.forEach(radio => (radio.checked = false));
    sortDirection = "asc";
    sortBtn.innerText = `${sortDirection} ↑↓`;
    sortBtn.disabled = true;
    clearBtn.disabled = true;
    filteredChannelsData = [...channelsData];
    renderChannels(filteredChannelsData);
  }
}

function parseNumber(value) {
  if (typeof value === "number") return value;

  return Number(
    String(value).replace(/\s/g, "").replace(/\./g, "").replace(/,/g, "")
  );
}

function formatNumber(number) {
  return number.toLocaleString("en-US");
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/ł/g, "l")
    .replace(/[\u0300-\u036f]/g, "");
}
