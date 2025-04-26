import React, { useState, useEffect } from "react";
import HotelCard from './HotelCard.js';
import { dijkstra } from '../../utils/dijkstra.js';



function Dashboard() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [graph, setGraph] = useState({});
  const [location, setLocation] = useState("");
  const [eventFilter, setEventFilter] = useState("");

  const locationsList = [
    "Tilakwadi", "Hanuman Nagar", "Bhagya Nagar", "Ramteerth Nagar",
    "Sadashiv Nagar", "Mahantesh Nagar", "Khasbag", "Nehru Nagar", "Angol",
    "Vaibhav Nagar", "Shree Nagar", "Ganeshpur", "Rani Chennamma Nagar",
    "Sahyadri Nagar", "Azam Nagar", "Auto Nagar", "Shahu Nagar", "Club Road",
    "Gandhi Nagar", "Kangrali", "Sambra", "Kanabargi", "Vinayak Nagar",
    "Manikbag", "Bk kangrali", "Majagaon", "Macche", "main City"
  ];

  // Load hotels and graph
  useEffect(() => {
    fetch("/hotels.json").then(res => res.json()).then(data => {
      setHotels(data);
      setFilteredHotels(data);
    });

    fetch("/graph.json").then(res => res.json()).then(data => {
      setGraph(data);
    });
  }, []);

  // Handle filtering
  const handleSearch = () => {
    if (!location || !graph[location]) {
      alert("Please select a valid location.");
      return;
    }

    const distances = dijkstra(graph, location);

    let updated = [...hotels];

    if (eventFilter) {
      updated = updated.filter(hotel => hotel.supportedEvents.includes(eventFilter));
    }

    updated.sort((a, b) => {
      const d1 = distances[a.area] || Infinity;
      const d2 = distances[b.area] || Infinity;
      return d1 - d2;
    });

    setFilteredHotels(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Event Venue Finder</h1>

      {/* Dropdown for location */}
      <div style={{ marginTop: "20px" }}>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "10px", width: "320px", marginRight: "10px" }}
        >
          <option value="">-- Select Your Location --</option>
          {locationsList.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <button
          style={{ padding: "10px 20px" }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Event Filter Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          style={{ padding: "10px", width: "320px" }}
        >
          <option value="">-- Filter by Event Type --</option>
          <option value="Marriage">Marriage</option>
          <option value="Birthday">Birthday</option>
          <option value="Naming Ceremony">Naming Ceremony</option>
          <option value="Official Meeting">Official Meeting</option>
        </select>
      </div>

      {/* Hotels */}
      <div style={{ marginTop: "40px" }}>
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            distance={graph[location] ? dijkstra(graph, location)[hotel.area] : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
