import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import {UserContextData} from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null); // "pickup" or "destination"
  const [suggestions, setSuggestions] = useState([]);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const WaitingForDriverPanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] =
    useState(false);
  const [WaitingForDriverPanelOpen, setWaitingForDriverPanelOpen] =
    useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const {socket} = useContext(SocketContext)
  const {user}=useContext(UserContextData)


  useEffect(() => {
    
    socket.emit("join",{userType:"user",userId:user._id})
  },[user])






  function submitHandler(e) {
    e.preventDefault();
  }

  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    // console.log("Fetching suggestions for:", input);
    // console.log("ii", `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Suggestions:", res.data);

      setSuggestions(res.data || []);
    } catch (err) {
      // console.log("Error fetching suggestions:", err);

      setSuggestions([]);
    }
  };

  // Handle input change for pickup/destination
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "pickup") setPickup(value);
    else setDestination(value);
    setActiveField(field);
    setPanelOpen(true);
    fetchSuggestions(value);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    if (activeField === "pickup") setPickup(suggestion.description);
    else setDestination(suggestion.description);
    // setPanelOpen(false);
    setSuggestions([]);
  };

  useGSAP(
    function () {
      if (!panelRef.current) return;
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (!vehiclePanelRef.current) return;
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (!confirmRidePanelRef.current) return;
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (!lookingForDriverPanelRef.current) return;
      if (lookingForDriverPanelOpen) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0)",
          // opacity: 1,
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
          // opacity: 0,
        });
      }
    },
    [lookingForDriverPanelOpen]
  );

  useGSAP(
    function () {
      if (!WaitingForDriverPanelRef.current) return;
      if (WaitingForDriverPanelOpen) {
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [WaitingForDriverPanelOpen]
  );

  async function findTripHandler() {
    setPanelOpen(false);
    setVehiclePanelOpen(true);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log("Fare response:", response.data.fare);

    setFare(response.data.fare);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Ride response:", response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
      <div className="h-screen w-screen ">
        {/* image for map */}
        <img
          className="h-full w-full object-cover"
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-4 right-6  text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form action="" onSubmit={submitHandler}>
            <div className="line absolute h-14 w-1 top-1/2 left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                fetchSuggestions(pickup);
              }}
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                fetchSuggestions(destination);
              }}
              value={destination}
              onChange={(e) => handleInputChange(e, "destination")}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => {
              findTripHandler();
            }}
            className="bg-black w-full rounded-lg p-3 py-2 m-2 ml-0 text-white"
          >
            {" "}
            Find Trip{" "}
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      {vehiclePanelOpen && (
        <div
          ref={vehiclePanelRef}
          className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3"
        >
          <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      )}
      {confirmRidePanelOpen && (
        <div
          ref={confirmRidePanelRef}
          className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3"
        >
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
           
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          />
        </div>
      )}
      {lookingForDriverPanelOpen && (
        <div
          ref={lookingForDriverPanelRef}
          className="fixed z-10 w-full bottom-0 bg-white py-10 px-3"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          />
        </div>
      )}
      <div
        ref={WaitingForDriverPanelRef}
        className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3"
      >
        <WaitingForDriver
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
        />
      </div>
    </div>
  );
};

export default Home;
