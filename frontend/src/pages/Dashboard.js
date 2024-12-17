
import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import RobotMap from '../components/dashboard/RobotMap';
import RobotCards from '../components/dashboard/RobotCards';
import { fetchRobots } from '../services/robotService';
import { initializeSocket } from '../services/socketService';

const Dashboard = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const mapRef = useRef(null);
  const robotCardsRef = useRef({});

  useEffect(() => {
    const socket = initializeSocket();

    // Initial fetch
    fetchRobots().then(setRobots);

    // Listen for updates
    socket.on('robot_update', (updatedRobots) => {
      setRobots(updatedRobots);
    });

    return () => socket.disconnect();
  }, []);

  const handleRobotSelect = (robot) => {
    setSelectedRobot(robot);
    
    // Only scroll to map
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  };

  const handleMapRobotClick = (robot) => {
    setSelectedRobot(robot);
    
    // When clicking on map marker, scroll to corresponding card
    if (robotCardsRef.current[robot['Robot ID']]) {
      robotCardsRef.current[robot['Robot ID']].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
     <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 4 
        }}
      >
        Robot Fleet Monitoring Dashboard
      </Typography>
      
      {/* Map Section */}
      <Grid 
        item 
        xs={12} 
        ref={mapRef}
        sx={{ 
          width: '90%', 
          height: '50vh', 
          margin: 'auto', 
          marginBottom: 10
        }}
      >
        <RobotMap 
          robots={robots} 
          selectedRobot={selectedRobot}
          onRobotClick={handleMapRobotClick}
        />
      </Grid>

      {/* Robot Cards Section */}
      <RobotCards 
        robots={robots} 
        onRobotSelect={handleRobotSelect}
        robotCardsRef={robotCardsRef}
        selectedRobot={selectedRobot}
      />
    </Container>
  );
};

export default Dashboard;