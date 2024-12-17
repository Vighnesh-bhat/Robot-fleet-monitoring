import eventlet
# Patch for eventlet
eventlet.monkey_patch()

from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

import os
from dotenv import load_dotenv

load_dotenv()

from utils.robot_data_manager import RobotDataManager

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Flask-SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize Robot Data Manager
fleet_manager = RobotDataManager()

@app.route('/robots', methods=['GET'])
def get_robots():
    """
    REST API endpoint to get current robot fleet data
    """
    return jsonify(fleet_manager.robots)

@socketio.on('connect')
def handle_connect():
    """
    WebSocket connection handler
    """
    print('Client connected')
    emit('robot_update', fleet_manager.robots)

@socketio.on('request_update')
def handle_update_request():
    """
    WebSocket endpoint for real-time robot data updates
    """
    updated_robots = fleet_manager.update_robot_data()
    emit('robot_update', updated_robots)

def broadcast_updates():
    """
    Background task to broadcast robot updates every 5 seconds
    """
    while True:
        eventlet.sleep(5)
        updated_robots = fleet_manager.update_robot_data()
        socketio.emit('robot_update', updated_robots)

if __name__ == '__main__':
    # Get the port from environment variables (default to 5000)
    port = int(os.getenv('PORT', 5000))

    # Spawn the background task
    eventlet.spawn(broadcast_updates)

    # Run the application
    socketio.run(app, debug=False, port=port)
