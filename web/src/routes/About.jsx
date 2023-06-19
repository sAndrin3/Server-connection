import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import AboutImg from "../assets/night.jpg"

function About() {
    return (
      <>
        <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={AboutImg}
          title="About"
          btnClass="hide"
        />
      </>
    )
  }
  
  export default About