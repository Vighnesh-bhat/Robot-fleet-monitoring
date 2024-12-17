import json
import random
import uuid
from datetime import datetime
import os

class RobotDataManager:
    def __init__(self, data_path='data/fake_robot_data.json'):
        """
        Initialize RobotDataManager with data from JSON file
        """
        self.data_path = os.path.join(os.path.dirname(__file__), '..', data_path)
        self.robots = self.load_robot_data()
    
    def load_robot_data(self):
        """
        Load robot data from JSON file
        """
        try:
            with open(self.data_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: Robot data file not found at {self.data_path}")
            return []
    
    def update_robot_data(self):
        """
        Periodically update robot telemetry data with some randomization
        """
        for robot in self.robots:
            # Simulate dynamic updates
            robot['Online/Offline'] = random.choice([True, False]) if random.random() < 0.1 else robot['Online/Offline']
            
            # Adjust battery percentage
            robot['Battery Percentage'] = max(0, min(100, 
                robot['Battery Percentage'] + random.randint(-5, 5)))
            
            # Adjust CPU and RAM usage
            robot['CPU Usage'] = max(0, min(100, 
                robot['CPU Usage'] + random.randint(-2, 2)))
            robot['RAM Consumption'] = max(0, min(10000, 
                robot['RAM Consumption'] + random.randint(-500, 500)))
            
            # Update location with small variations
            robot['Location Coordinates'][0] += random.uniform(-0.1, 0.1)
            robot['Location Coordinates'][1] += random.uniform(-0.1, 0.1)
            
            # Update timestamp
            robot['Last Updated'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        return self.robots