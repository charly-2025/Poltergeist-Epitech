import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const MapClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ setLocalization }) => {
  const [position, setPosition] = useState(null);

  const handleSelect = async (latlng) => {
  const res = await fetch(
    `http://localhost:3000/geocode/reverse?lat=${latlng.lat}&lon=${latlng.lng}`
  );

  const data = await res.json();

  const city =
  data.address.city ||
  data.address.town ||
  data.address.village ||
  data.address.municipality ||
  data.address.hamlet ||
  data.address.suburb ||
  data.address.county ||
  data.address.state ||
  "Unknown location";

  const country = data.address.country || "Unknown country";

  setPosition(latlng);

  setLocalization({
    lat: latlng.lat,
    lon: latlng.lng,
    city,
    country
  });
};


  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onSelect={handleSelect} />
      {position && <Marker position={position} />}
    </MapContainer>
  );
};

export default MapPicker;
