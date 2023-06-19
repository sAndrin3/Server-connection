import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import AboutImg from "../assets/2.jpg"

function Contact() {
    return (
      <>
      <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={AboutImg}
          title="Contact"
          btnClass="hide"
        />
      </>
    )
  }
  
  export default Contact