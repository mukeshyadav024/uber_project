
---

# 🚗 Uber Project

A full-stack ride-hailing application inspired by Uber, built with modern web technologies. This project encompasses both frontend and backend components, facilitating real-time ride tracking, user authentication, and ride management.

---

## 📁 Project Structure

```
uber_project/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── .gitignore
└── README.md
```

* **Backend/**: Contains the Express.js server, route definitions, controllers, and data models.
* **Frontend/**: Houses the React.js application with components, pages, and routing configurations.

---

## 🛠️ Tools & Technologies

### Frontend

* **React.js**: JavaScript library for building user interfaces.
* **React Router**: Declarative routing for React applications.
* **Axios**: Promise-based HTTP client for making API requests.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **GSAP**: Animation library for creating high-performance animations.
* **@react-google-maps/api**: Integration of Google Maps into React applications.

### Backend

* **Node.js**: JavaScript runtime environment.
* **Express.js**: Web framework for Node.js.
* **MongoDB**: NoSQL database for storing application data.
* **Mongoose**: ODM for MongoDB, providing a schema-based solution.

---

## 🌐 Routing Overview

### Frontend Routes

* `/`: Home page.
* `/login`: User login page.
* `/register`: User registration page.
* `/captain-home`: Dashboard for ride captains.
* `/captain-riding`: Live tracking and ride management for captains.
* `/finish-ride`: Interface to complete rides.

### Backend API Endpoints

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Authenticate user and return token.
* `GET /api/rides`: Retrieve all rides.
* `POST /api/rides`: Create a new ride.
* `PUT /api/rides/:id`: Update ride details.
* `DELETE /api/rides/:id`: Delete a ride.

---

## 🔄 Data Flow with Axios

Axios is utilized on the frontend to communicate with the backend API. Here's how data flows:

1. **User Authentication**:

   * On login or registration, Axios sends a POST request with user credentials.
   * Backend validates and responds with a JWT token.

2. **Fetching Rides**:

   * Axios sends a GET request to `/api/rides`.
   * Backend responds with a list of rides in JSON format.

3. **Creating a Ride**:

   * Axios sends a POST request with ride details to `/api/rides`.
   * Backend saves the ride and responds with the created ride object.

4. **Updating a Ride**:

   * Axios sends a PUT request with updated data to `/api/rides/:id`.
   * Backend updates the ride and responds with the updated object.

5. **Deleting a Ride**:

   * Axios sends a DELETE request to `/api/rides/:id`.
   * Backend deletes the ride and responds with a success message.

---

## 📍 Live Tracking Feature

The `LiveTracking` component utilizes the browser's Geolocation API and Google Maps to display the user's current location.

**Key Features**:

* **Real-Time Location**: Updates the user's location every 5 seconds.
* **Map Integration**: Displays the current location on Google Maps with a marker.
* **Responsive Design**: Ensures compatibility across various devices.

**Implementation Highlights**:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, 5000);

  return () => clearInterval(intervalId);
}, []);
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js and npm installed.
* MongoDB instance running.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mukeshyadav024/uber_project.git
   cd uber_project
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```bash
   cd ../Frontend
   npm install
   ```

4. **Set Environment Variables**:

   Create a `.env` file in both `Backend` and `Frontend` directories with necessary configurations like database URI and API keys.

5. **Run the Application**:

   * **Backend**:

     ```bash
     cd Backend
     npm start
     ```

   * **Frontend**:

     ```bash
     cd ../Frontend
     npm start
     ```

---

## 📫 Contact

For any inquiries or feedback, please reach out to [mukeshyadav024](https://github.com/mukeshyadav024).

---

