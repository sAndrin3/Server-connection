import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewTours.css';

function ViewTours() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');

  const FetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:8081/tours');
console.log(response.data.tours);
      setTours(response.data.tours);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchTours();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit tour with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete tour with id: ${id}`);
  };

  return (
    <div className="ap">
      <div className="view-tours">
        <h2>View Tours</h2>
        <div className="tour-cards">
          {Array.isArray(tours) && tours.length > 0 ? (
            tours.map((tour) => (
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
            ))
          ) : (
            <div>No tours found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTours;
