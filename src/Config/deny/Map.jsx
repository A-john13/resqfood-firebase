import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  return (
    <div style={{width:'100dvh',height:'100dvh'}}>
    <MapContainer center={[9.51048, 76.55079]} zoom={13} style={{ height: '400px', width: '600px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>Postal Code: 12345</Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default MapComponent;