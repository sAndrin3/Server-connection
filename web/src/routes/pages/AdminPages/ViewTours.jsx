import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewTours.css';

function ViewTours() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:8081/tours');
      setTours(response.data.tours);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit tour with id: ${id}`);
    // Perform the necessary update/edit operations
    // For example, you can navigate to an edit page or open a modal for editing
    navigate(`/admin/createtours/${id}`); // Replace with the appropriate edit route
  };

  const handleDelete = async (id) => {
    console.log(`Delete tour with id: ${id}`);
    // Perform the necessary delete operations
    try {
      await axios.delete(`http://localhost:8081/tours/${id}`);
      // Update the tours list after successful deletion
      fetchTours();
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
