import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievements,
  Contact,
  Experience,
  GitHub,
  Hero,
  Navbar,
  Philosophy,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Hero section with own background */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        {/* Main content sections */}
        <About />
        <Experience />
        <Works />
        <Tech />
        <GitHub />
        <Achievements />
        <Philosophy />

        {/* Contact with stars */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
