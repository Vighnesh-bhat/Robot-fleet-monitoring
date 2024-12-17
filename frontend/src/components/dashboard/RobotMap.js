// src/components/dashboard/RobotMap.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import activeIcon from 'leaflet/dist/images/marker-icon-2x.png';

// Leaflet Icon Configuration
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

let ActiveIcon = L.icon({
  iconUrl: activeIcon,
  shadowUrl: iconShadow,
  iconSize: [38, 62],
  iconAnchor: [19, 62]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RobotMap = ({ robots, selectedRobot, onRobotClick }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '100%', 
        width: '100%',
        borderRadius: 2 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Robot Locations
      </Typography>
      <MapContainer 
        center={[0, 0]}  // Center of the globe
        zoom={1}  // Fully zoomed out to show entire globe
        minZoom={1}  // Allow minimum zoom to show full globe
        maxZoom={10}  // Maximum zoom level for detailed view
        worldCopyJump={false}  // Prevent repeating map tiles
        style={{ 
          height: '90%', 
          width: '100%', 
          borderRadius: 8 
        }}
        zoomControl={true}  // Add zoom controls
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {robots.map(robot => (
          <Marker 
            key={robot['Robot ID']} 
            position={robot['Location Coordinates']}
            icon={selectedRobot && selectedRobot['Robot ID'] === robot['Robot ID'] ? ActiveIcon : DefaultIcon}
            eventHandlers={{
              click: () => onRobotClick(robot)
            }}
          />
        ))}
      </MapContainer>
    </Paper>
  );
};

export default RobotMap;