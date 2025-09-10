var map = L.map('map').setView([4.6665620082695645, -74.13198905022493], 13);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([4.6665620082695645, -74.13198905022493]).addTo(map);
var marker = L.marker([4.291401649833343, -70.61174617967207]).addTo(map);
