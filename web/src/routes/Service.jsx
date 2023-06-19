import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import AboutImg from "../assets/1.jpg"

function Service() {
    return (
      <>
         <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={AboutImg}
          title="Service"
          btnClass="hide"
        />
      </>
    )
  }
  
  export default Service