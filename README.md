# Robot Fleet Monitoring Dashboard

This project is a **Robot Fleet Monitoring Dashboard** built using **React** and **Material UI** for the frontend, and **Flask** with **Socket.IO** for real-time communication on the backend. The dashboard displays a list of robots with various parameters such as battery percentage, CPU usage, RAM consumption, and more. It includes a map to visualize the robots' locations and their statuses.

## Features

- **Robot Dashboard:** Displays a list of robots with their status, battery percentage, CPU usage, and RAM consumption.
- **Map Integration:** A map that shows the location of each robot with interactive markers.
- **Real-Time Updates:** Socket-based communication for real-time robot status updates.
- **Card Selection:** Clickable robot cards that highlight the selected robot and scroll to relevant details.
- **Smooth Scrolling:** Scroll smoothly between the map and robot cards when selecting a robot.

## Tools Used

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces.
  - **Material UI:** A popular React UI framework that provides components and styles for faster development.
  - **Leaflet:** A library for embedding interactive maps in web applications.
  - **React Leaflet:** A React wrapper for Leaflet to integrate maps in React applications.

- **Backend:**
  - **Flask:** A lightweight WSGI web application framework in Python.
  - **Flask-SocketIO:** Enables real-time bi-directional communication between the frontend and backend.
  - **Eventlet:** A networking library for real-time, scalable applications.
  - **Flask-CORS:** Handles Cross-Origin Resource Sharing (CORS) for the Flask API.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Python 3.x**
- **Node.js** 

### Clone the repository

```bash
git clone https://github.com/Vighnesh-bhat/Robot-fleet-monitoring.git
cd robot-fleet-dashboard
```

### Backend Setup

Navigate to the backend directory and install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file to store environment variables such as the server port.

Run the Flask server:

```bash
python app.py
```

This will start the Flask backend with Socket.IO support on `http://localhost:5000`.

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required Node.js dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

## WebSocket Communication:
- The frontend and backend communicate using Socket.IO for real-time updates.
- The backend uses **Eventlet** for asynchronous processing, emitting robot data updates every 5 seconds using a background task (`broadcast_updates`).
- On client connection, the initial robot data is sent via the `robot_update` event.


## Conclusion

This Robot Fleet Monitoring Dashboard is a real-time, interactive solution to monitor robot fleets. With features like smooth scrolling, real-time updates, and an interactive map, this dashboard provides a user-friendly interface to manage and track robots.


