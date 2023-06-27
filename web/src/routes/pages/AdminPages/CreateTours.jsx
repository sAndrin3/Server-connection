import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTours.css';

function CreateTours() {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    duration: '',
    price: ''
  });

  useEffect(() => {
    if (tourId) {
      // Fetch the tour details if tourId exists
      fetchTourDetails();
    }
  }, [tourId]);

  const fetchTourDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/tours/${tourId}`);
      const tour = response.data.tour;
      setTourData({
        title: tour.title,
        description: tour.description,
        duration: tour.duration,
        price: tour.price
      });
    } catch (error) {
      console.log('Error fetching tour details:', error);
    }
  };
  

  const handleChange = (e) => {
    setTourData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (tourId) {
        // Update an existing tour
        response = await axios.put(`http://localhost:8081/tours/${tourId}`, tourData);
      } else {
        // Create a new tour
        response = await axios.post('http://localhost:8081/tours', tourData);
      }

      if (response.status === 201 || response.status === 200) {
        // Tour successfully created or updated in the database
        console.log('Tour saved:', response.data);
        // Redirect to view tours page or perform any other action
        navigate('/admin/viewtours');
      } else {
        // Error creating or updating the tour
        console.log('Error saving tour:', response.data);
      }
    } catch (error) {
      console.log('Error saving tour:', error);
    }
  };

  return (
    <div className="ap">
      <div className="create-tours">
        <h2 className="create-tours__heading">{tourId ? 'Update Tour' : 'Create Tour'}</h2>
        <form className="create-tours__form" onSubmit={handleSubmit}>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Title:</label>
            <input
              type="text"
              name="title"
              value={tourData.title}
              onChange={handleChange}
              className="create-tours__input"
              required
            />
          </div>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Description:</label>
            <textarea
              name="description"
              value={tourData.description}
              onChange={handleChange}
              className="create-tours__textarea"
              required
            ></textarea>
          </div>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Duration:</label>
            <input
              type="text"
              name="duration"
              value={tourData.duration}
              onChange={handleChange}
              className="create-tours__input"
              required
            />
          </div>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Price:</label>
            <input
              type="text"
              name="price"
              value={tourData.price}
              onChange={handleChange}
              className="create-tours__input"
              required
            />
          </div>
          <button type="submit" className="create-tours__button">
            {tourId ? 'Update Tour' : 'Create Tour'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTours;
