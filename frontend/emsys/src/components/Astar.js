import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './homepage/common.css';

const cityGraph = {
  "Tilakwadi": { "Ganeshpur": 6.8, "Rani Chennamma Nagar": 3, "Angol": 2.3, "Bhagya Nagar": 1.7, "Shahapur": 3, "Sadashiv Nagar": 6.4, "Club Road": 5.4 },
  "Hanuman Nagar": { "Ganeshpur": 3.6, "Sahyadri Nagar": 1.3, "Club Road": 2.7 },
  "Bhagya Nagar": { "Tilakwadi": 1.7, "Angol": 1.4, "Adarsh Nagar": 1.5, "Shahapur": 3 },
  "Ramateerth Nagar": { "Auto Nagar": 1, "Shahapur": 7.8 },
  "Sadashiv Nagar": { "Tilakwadi": 6.4, "Shahapur": 5.5, "Nehru Nagar": 1.2, "Vaibhav Nagar": 1.5, "Azam Nagar": 1.1 },
  "Adarsh Nagar": { "Bhagya Nagar": 1.5, "Shahapur": 2.3 },
  "Shahapur": { "Tilakwadi": 3, "Bhagya Nagar": 3, "Adarsh Nagar": 2.3, "Ramateerth Nagar": 7.8, "Sadashiv Nagar": 5.5 },
  "Nehru Nagar": { "Shree Nagar": 1.4, "Vaibhav Nagar": 2.8, "Sadashiv Nagar": 1.2 },
  "Angol": { "Tilakwadi": 2.3, "Rani Chennamma Nagar": 2.5, "Bhagya Nagar": 1.4 },
  "Vaibhav Nagar": { "Shahu Nagar": 1, "Azam Nagar": 1.5, "Sadashiv Nagar": 1.5, "Nehru Nagar": 2.8, "Shree Nagar": 5.5 },
  "Shree Nagar": { "Nehru Nagar": 1.4, "Auto Nagar": 3.1, "Vaibhav Nagar": 5.5 },
  "Ganeshpur": { "Tilakwadi": 6.8, "Hanuman Nagar": 3.6 },
  "Rani Chennamma Nagar": { "Tilakwadi": 3, "Angol": 2.5 },
  "Sahyadri Nagar": { "Hanuman Nagar": 1.3, "Shahu Nagar": 4.9 },
  "Azam Nagar": { "Shahu Nagar": 1.4, "Club Road": 2.8, "Vaibhav Nagar": 1.5 },
  "Auto Nagar": { "Shree Nagar": 3.1, "Ramateerth Nagar": 1 },
  "Shahu Nagar": { "Sahyadri Nagar": 4.9, "Club Road": 3.7, "Azam Nagar": 1.4, "Vaibhav Nagar": 1 },
  "Club Road": { "Hanuman Nagar": 2.7, "Shahu Nagar": 3.7, "Azam Nagar": 2.8 }
};

const venueMap = {
  "Tilakwadi": ["Native Hotel", "Milleniun Garden"],
  "Hanuman Nagar": ["Green Garden"],
  "Ramateerth Nagar": ["Sankalp Garden", "Harsha Hotel"],
  "Sadashiv Nagar": ["Dharmanth Bhavan", "The Party vibes"],
  "Shahapur": ["Shivam Functional hall"],
  "Nehru Nagar": ["UK 27", "Ayodha Nagar"],
  "Vaibhav Nagar": ["Mezbaan Functional hall"],
  "Angol": ["Ashriwad Mangal Karayal", "Uday Bhavan"],
  "Ganeshpur": ["The Palladium banquet"],
  "Shree Nagar": ["KPTCL", "Presidency hotel"],
  "Bhagya Nagar": ["City Hall"],
  "Auto Nagar": ["Malli Munch", "Pradise garden"],
  "Club Road": ["EEFA Hotel"],
  "Azam Nagar": ["Killedar Functinal hall"]
};

const eventVenues = {
  "Birthday": ["Presidency hotel", "Sankam Hotel", "Pai Resort", "Uday Bhavan", "City Hall"],
  "Wedding": ["Dharmanth Bhavan", "KPTCL", "Ashriwad Mangal Karayal"],
  "Naming Ceremony": ["Ayodha Nagar", "Presidency hotel"],
  "Kitty Party": ["Green Garden", "The Party vibes"],
  "Official Meetings": ["UK 27", "EEFA Hotel", "KPTCL"],
  "Concerts and Parties": ["The Palladium banquet", "Milleniun Garden", "Sankalp Garden"]
};

const dijkstra = (start) => {
  const distances = {};
  const visited = {};
  const pq = [[0, start]];

  for (const node in cityGraph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [currentDist, currentNode] = pq.shift();

    if (visited[currentNode]) continue;
    visited[currentNode] = true;

    for (const neighbor in cityGraph[currentNode]) {
      const distance = cityGraph[currentNode][neighbor];
      const newDist = currentDist + distance;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }

  return distances;
};

const Astar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventType = queryParams.get("event") || "";

  const [userCity, setUserCity] = useState("");
  const [nearestVenue, setNearestVenue] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [availableVenues, setAvailableVenues] = useState([]);

  useEffect(() => {
    const normalizedEvent = eventType.trim();
    const venues = [];

    for (const [area, venueList] of Object.entries(venueMap)) {
      for (const venue of venueList) {
        if (eventVenues[normalizedEvent]?.includes(venue)) {
          venues.push({ name: venue, area });
        }
      }
    }

    setAvailableVenues(venues);
    setNearestVenue(null);
    setErrorMessage("");
  }, [eventType]);

  const handleSearch = () => {
    const trimmedCity = userCity.trim();

    if (!trimmedCity || !cityGraph[trimmedCity]) {
      setErrorMessage('⚠️ Please enter a valid area from the city map.');
      return;
    }

    if (!eventType || !eventVenues[eventType]) {
      setErrorMessage('⚠️ Please select a valid event type.');
      return;
    }

    const distances = dijkstra(trimmedCity);
    let minDist = Infinity;
    let closest = null;

    for (const venue of availableVenues) {
      const dist = distances[venue.area];
      if (dist < minDist) {
        minDist = dist;
        closest = { ...venue, distance: dist };
      }
    }

    if (closest) {
      setNearestVenue(closest);
      setErrorMessage("");
    } else {
      setNearestVenue(null);
      setErrorMessage('No matching venue found nearby.');
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0d19', minHeight: '100vh', color: 'white', padding: '30px' }}>
      <h1 style={{ textAlign: 'center', color: '#8ac7ff', fontSize: '36px', marginBottom: '30px' }}>
        🎉 Explore Venues for {eventType}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter your area..."
          value={userCity}
          onChange={(e) => setUserCity(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            width: '250px',
            boxShadow: '0 0 8px rgba(255,255,255,0.1)'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4f46e5',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          🔍 Search
        </button>
      </div>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{errorMessage}</p>}

      {nearestVenue && (
        <div style={{
          backgroundColor: '#1c1f2b',
          padding: '20px',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto 30px',
          textAlign: 'center',
          boxShadow: '0 0 12px rgba(255,255,255,0.05)'
        }}>
          <h3 style={{ color: '#8ac7ff' }}>🎯 Nearest Venue: {nearestVenue.name}</h3>
          <p>📍 Area: {nearestVenue.area}</p>
          <p>📏 Distance: {nearestVenue.distance.toFixed(2)} km</p>
        </div>
      )}

      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>Available Venues:</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '25px',
        padding: '0 40px'
      }}>
        {availableVenues.map((venue, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/venue/${venue.name.replace(/\s+/g, "_")}`)}
            style={{
              backgroundColor: '#1e2233',
              borderRadius: '15px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src="/bir4.jpg"
              alt={venue.name}
              style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/250x160?text=No+Image'}
            />
            <div style={{ padding: '15px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', margin: '10px 0', color: '#f9fafb' }}>{venue.name}</h3>
              <p style={{ color: '#a0aec0' }}>📍 {venue.area}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Astar;
