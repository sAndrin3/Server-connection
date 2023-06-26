import React, { useEffect, useState } from 'react';
import "./ViewTours.css";

function ViewTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      // Perform API call to fetch tour data from the server
      const response = await fetch('api/tours');
      const data = await response.json();

      setTours(data);
    } catch (error) {
      console.log('Error fetching tours:', error);
    }
  };

  const handleEdit = (id) => {
    // Logic to handle edit action for the tour with the given id
    console.log(`Edit tour with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to handle delete action for the tour with the given id
    console.log(`Delete tour with id: ${id}`);
  };

  return (
    <div className='ap'>
       <div className="view-tours">
      <h2>View Tours</h2>
      <div className="tour-cards">
        {tours.map((tour) => (
          <div className="tour-card" key={tour.id}>
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
            <p>Duration: {tour.duration}</p>
            <p>Price: {tour.price}</p>
            <div className="actions">
              <button onClick={() => handleEdit(tour.id)}>Edit</button>
              <button onClick={() => handleDelete(tour.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
}

export default ViewTours;
