(function () {
  const lat = -31.627816;
  const lng = -60.7044499;
  const mapa = L.map("mapa").setView([lat, lng], 16);
  let marker;

  // Establecer el mapa
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  //   Pin de movimiento
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  //   Detectar movimiento del Pin
  marker.on("moveend", function (e) {
    marker = e.target;
    const position = marker.getLatLng();
    mapa.panTo(new L.LatLng(position.lat, position.lng));
  });
})();
