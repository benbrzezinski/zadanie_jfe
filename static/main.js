const contentWrapper = document.querySelector(".js-content");
const filterInput = document.querySelector(".filter__input");
const sortRadios = document.querySelectorAll('input[name="sort"]');
const clearBtn = document.querySelector(".button--clear");

let channelsData = [];
let filteredData = [];
let sortDirection = "asc"; // lub "desc"

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadChannels();
}

async function loadChannels() {
  try {
    const res = await fetch("./channels.json");
    if (!res.ok) throw new Error(`Status code ${res.status}`);
    const data = await res.json();

    channelsData = data.map(channel => ({
      title: channel.title,
      logo: channel.thumbnails.high.url,
      url: channel.customUrl,
      subscribers: parseNumber(channel.statistics.subscriberCount),
      videos: parseNumber(channel.statistics.videoCount),
      views: parseNumber(channel.statistics.viewCount),
    }));

    renderChannels(channelsData);
  } catch (err) {
    console.error("Błąd podczas pobierania kanałów:", err);
    contentWrapper.innerHTML = "<p>Nie udało się wczytać kanałów.</p>";
  }
}

function renderChannels(channels) {
  contentWrapper.innerHTML = channels
    .map(
      channel => `
    <article class="channel" data-url="${channel.url}">
      <img class="channel__logo" src="${channel.logo}" alt="${channel.title}">
      <h2 class="channel__title">${channel.title}</h2>
      <p class="channel__stats">
        SUBSCRIBERS: ${formatNumber(channel.subscribers)}<br>
        VIDEOS: ${formatNumber(channel.videos)}<br>
        VIEWS: ${formatNumber(channel.views)}
      </p>
    </article>
  `
    )
    .join("");
}

function parseNumber(value) {
  if (typeof value === "number") return value;

  return Number(
    String(value).replace(/\s/g, "").replace(/\./g, "").replace(/,/g, "")
  );
}

function formatNumber(n) {
  return n.toLocaleString("en-US");
}
