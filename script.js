



const input = document.querySelector(".user-input");
const enterButton = document.querySelector(".image");
const ipAddressInsert = document.querySelector(".ip-address");
const location1 = document.querySelector(".location");
const timeZone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");



const reloadMap = function (lat, lng) {
    let latitude = lat;
    let longitude = lng;

    var map = L.map("map").setView([latitude, longitude], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
}



const locateData = function (arr) {
    ipAddressInsert.innerText = arr[0];
    location1.innerText = arr[2];
    timeZone.innerText = "UTC" + arr[4];
    isp.innerText = arr[1];
}

const dataCollection = function (apiData) {
    const ip = apiData.ip;
    const is = apiData.isp;
    const city = apiData.location.city;
    const country = apiData.location.country;
    const time = apiData.location.timezone;
    const lat = apiData.location.lat;
    const lng = apiData.location.lng;
    const arr = [ip, is, city, country, time];
    locateData(arr);
    reloadMap(lat, lng);
}

const getApi = async function (url) {
    const response = await fetch(url);
    let apiData = await response.json();
    dataCollection(apiData);
}
enterButton.addEventListener("click", function () {
    let ipAddress = input.value;
    input.value = "";
    const url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_bu1AXM4VLPmmYUkyd8hbEWU6f8nUJ&ipAddress=" + ipAddress;
    console.log(url);
    getApi(url);
})

reloadMap(51.505, -0.09);
