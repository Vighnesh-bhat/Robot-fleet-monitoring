// src/components/dashboard/RobotCards.jsx
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress, 
  Chip, 
  CardActionArea 
} from '@mui/material';
import { 
  Battery20 as BatteryIcon, 
  Memory as CPUIcon, 
  Storage as RAMIcon,
  Backup as StatusIcon 
} from '@mui/icons-material';

const RobotCards = ({ 
  robots, 
  onRobotSelect, 
  robotCardsRef, 
  selectedRobot 
}) => {
  const renderBatteryColor = (percentage) => {
    if (percentage < 20) return 'error';
    if (percentage < 50) return 'warning';
    return 'success';
  };

  return (
    <Grid container spacing={3}>
      {robots.map((robot) => (
        <Grid item xs={12} sm={6} md={4} key={robot['Robot ID']}>
          <Card 
            ref={(el) => robotCardsRef.current[robot['Robot ID']] = el}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              ...(selectedRobot && selectedRobot['Robot ID'] === robot['Robot ID'] 
                ? {
                    boxShadow: '0 0 0 3px #1976d2, 0 4px 20px rgba(0,0,0,0.1)',
                    transform: 'translateY(-4px)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 1,
                      border: '2px solid #1976d2',
                      animation: 'pulse 2s infinite'
                    }
                  }
                : {
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }
              ),
              '@keyframes pulse': {
                '0%': {
                  opacity: 1,
                  transform: 'scale(1)'
                },
                '50%': {
                  opacity: 0.5,
                  transform: 'scale(1.02)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)'
                }
              }
            }}
          >
            <CardActionArea 
              onClick={() => onRobotSelect(robot)}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Robot {robot['Robot ID']}
                </Typography>
                
                {/* Status Chip */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip 
                    icon={<StatusIcon />}
                    label={robot['Online/Offline'] ? 'Online' : 'Offline'}
                    color={robot['Online/Offline'] ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>

                {/* Battery */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BatteryIcon 
                    color={renderBatteryColor(robot['Battery Percentage'])} 
                    sx={{ mr: 2 }} 
                  />
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2">Battery</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={robot['Battery Percentage']}
                      color={renderBatteryColor(robot['Battery Percentage'])}
                    />
                    <Typography variant="caption">
                      {robot['Battery Percentage']}%
                    </Typography>
                  </Box>
                </Box>

                {/* CPU Usage */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CPUIcon color="primary" sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2">CPU Usage</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={robot['CPU Usage']}
                      color="primary"
                    />
                    <Typography variant="caption">
                      {robot['CPU Usage']}%
                    </Typography>
                  </Box>
                </Box>

                {/* RAM Consumption */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RAMIcon color="secondary" sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2">RAM Consumption</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(robot['RAM Consumption'] / 1024) * 100}
                      color="secondary"
                    />
                    <Typography variant="caption">
                      {robot['RAM Consumption']} MB
                    </Typography>
                  </Box>
                </Box>

                {/* Last Updated */}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary">
                    Last Updated: {robot['Last Updated']}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RobotCards;