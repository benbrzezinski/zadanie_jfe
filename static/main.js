const contentWrapper = document.querySelector(".js-content");
const filterInput = document.querySelector(".filter__input");
const sortRadios = document.querySelectorAll('input[name="sort"]');
const clearBtn = document.querySelector(".button--clear");

let channelsData = [];
let filteredData = [];
let sortDirection = "asc"; // lub "desc"

document.addEventListener("DOMContentLoaded", init);

function init() {}
