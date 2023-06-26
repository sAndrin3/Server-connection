import React, { useState } from 'react';
import './CreateTours.css';

function CreateTours() {
  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleChange = (e) => {
    setTourData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      });

      if (response.ok) {
        // Tour successfully created in the database
        console.log('Tour created');
        // Reset the form
        setTourData({
          title: '',
          description: '',
          duration: '',
          price: '',
        });
      } else {
        // Error creating the tour
        console.log('Error creating tour');
      }
    } catch (error) {
      console.log('Error creating tour:', error);
    }
  };

  return (
    <div className='ap'>
      <div className="create-tours">
        <h2 className="create-tours__heading">Create Tour</h2>
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
          <button type="submit" className="create-tours__button">Create Tour</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTours;
