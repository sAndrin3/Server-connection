import React, { useState, useEffect } from 'react';
import './Bookings.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data from the database
    // Replace this with your actual API request or database query
    const fetchBookings = async () => {
      try {
        const response = await fetch('api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className='ap'>
          <div className="bookings">
      <h2 className="bookings__heading">Bookings</h2>
      {bookings.length > 0 ? (
        <div className="bookings__cards">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3 className="booking-card__title">{booking.tourTitle}</h3>
              <p className="booking-card__details">Number of People: {booking.numberOfPeople}</p>
              <p className="booking-card__details">Date: {booking.date}</p>
              <p className="booking-card__details">Status: {booking.status}</p>
              {/* Add more booking details as needed */}
              <button className="booking-card__button">Edit</button>
              <button className="booking-card__button">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="bookings__placeholder">No bookings found.</p>
      )}
    </div>
    </div>

  );
}

export default Bookings;
