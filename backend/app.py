from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import eventlet
import os

from dotenv import load_dotenv

load_dotenv()
# Patch for eventlet
eventlet.monkey_patch()

from utils.robot_data_manager import RobotDataManager

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize robot data manager
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
    port = int(os.getenv('PORT', 5000)) 
    eventlet.spawn(broadcast_updates)
    socketio.run(app, debug=True, port=port)