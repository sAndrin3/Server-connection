import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTours.css';
import { useLocation } from 'react-router-dom';

function CreateTours() {
  const location = useLocation()
const [tours,setTours] = useState([]);
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    duration: '',
    price: ''
  });
  let pathname = location.pathname.split('/')[3]
  console.log(pathname);
  console.log(tours)
  const tour = tours.find((tour)=>tour.id == pathname)
console.log(tour);
  useEffect(() => {
    getaData();
    if (tourId) {
      // Fetch the tour details if tourId exists
      fetchTourDetails();
    }
  }, [tourId]);

 
    const getaData = async()=>{
      const res = await fetch('http://localhost:8081/tours');
      const data = await res.json();
      setTours(data.tours);

    }
    // console.log(tours)

// console.log(tourData)
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
      console.log(tour)
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
        console.log(tourData);
        // Update an existing tour
        //response = await axios.put(`http://localhost:8081/tours/${tourId}`, tourData);
        response = await fetch(`http://localhost:8081/tour/${tourId}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(tourData)
        })
        let data = await response.json();
        console.log(data);
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
              placeholder={tour?.title}
            />
          </div>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Description:</label>
            <textarea
              name="description"
              value={tourData.description}
              onChange={handleChange}
              className="create-tours__textarea"
              placeholder={tour?.description}
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
              placeholder={tour?.duration}
            />
          </div>
          <div className="create-tours__form-group">
            <label className="create-tours__label">Price:</label>
            <input
              type="text"
              name="price"
              value={tourData.price}
              onChange={handleChange}
              placeholder={tour?.price}
              className="create-tours__input"
            
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
