import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';


import 'leaflet/dist/leaflet.css';

const greenCarIcon = new L.Icon({
    
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/8308/8308414.png', 
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/8308/8308414.png',
    iconSize: [32, 32],
  iconAnchor: [16, 16], 
  popupAnchor: [0, -16],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

function MapBoundsTracker({ setBounds }) {
  const map = useMap(); 
  useMapEvents({
    moveend: (e) => {
      setBounds(e.target.getBounds());
    },
    resize: () => {
      map.invalidateSize();
    },
  });

 
  useEffect(() => {
    map.invalidateSize();
  }, [map]); 

  return null;
}

export default function DashboardLayout() {
  const orders = useSelector(state => state.dashboard.dashboardItems) || [];
  const [mapBounds, setMapBounds] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  const getRandomLatLng = () => {
    if (!mapBounds) {
      return [37.7749, -100.4194]; 
    }
    const sw = mapBounds.getSouthWest();
    const ne = mapBounds.getNorthEast();

    const lat = Math.random() * (ne.lat - sw.lat) + sw.lat;
    const lng = Math.random() * (ne.lng - sw.lng) + sw.lng;
    return [lat, lng];
  };

  const ordersWithCoords = orders.map((order) => ({
    ...order,
    latitude: order.latitude ?? getRandomLatLng()[0],
    longitude: order.longitude ?? getRandomLatLng()[1],
  }));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1 overflow-auto bg-gray-100 rounded-lg">
          <Outlet />
          <div className="flex gap-4 h-[600px]">
            <div className="bg-black rounded-xl flex-shrink-0" style={{ width: '60%', minWidth: 600, height: '100%' }}>
              <MapContainer
                center={[37.7749, -122.4194]}
                zoom={12}
                style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
                scrollWheelZoom={true}
                whenReady={(map) => {
                  map.target.invalidateSize();
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapBoundsTracker setBounds={setMapBounds} />
                {ordersWithCoords.map((order) => (
                  <Marker
                    key={order.id}
                    position={[order.latitude, order.longitude]}
                    icon={greenCarIcon}
                    eventHandlers={{
                      click: () => setSelectedOrderId(order.id),
                    }}
                  >
                    <Popup>
                      <div>
                        <strong>ID:</strong> {order.id}<br />
                        <strong>Name:</strong> {order.customerName}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div
              className="bg-black rounded-xl p-4 flex-1 overflow-y-auto"
              style={{ maxHeight: '100%' }}
            >
              <h2 className="text-lime-300 font-bold mb-4 text-xl">Orders List</h2>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-black">
           {orders.length === 0 ? (
  <p className="text-gray-400 col-span-2 text-center italic">No orders to display</p>
) : (
  orders.map((order) => (
    <div
      key={order.id}
      className={`bg-[#182332] text-white rounded-2xl p-3 m-1 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700 cursor-pointer
        ${order.id === selectedOrderId ? 'ring-1 ring-green-300' : ''}
      `}
      onClick={() => setSelectedOrderId(order.id)}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-lime-400 font-bold tracking-wider">ID: {order.id}</p>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-yellow-300">
          Pending
        </span>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Customer:</span>
          <span>{order?.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Area:</span>
          <span>{order?.area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Driver:</span>
          <span>{order?.driver}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Number:</span>
          <span>{order?.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">ETA:</span>
          <span className="text-lime-400 font-semibold">{order?.eta}</span>
        </div>
      </div>
    </div>
  ))
)}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}