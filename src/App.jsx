import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Finexo from "./pages/Finexo";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";
import HealNet from "./pages/HealNet";
import HomeAutomation from "./pages/HomeAutomation";
import OfficeAutomation from "./pages/OfficeAutomation";
import ComingSoon from "./pages/ComingSoon";
import TermsAndConditions from "./pages/TermsAndConditions";
import "./index.css";
import PrivacyPolicyFinexo from "./pages/PrivacyPolicyFinexo";
import IOT_Driven_Automation from "./sub-pages/IOT_Driven_Automation";
import Ai_and_Genrative_Solutions from "./sub-pages/Ai_and_Genrative_Solutions";
import Video_Analytics_and_Computer_Vision from "./sub-pages/Video_Analytics_and_Computer_Vision";
import ARVR_and_Immersive_technologies from "./sub-pages/ARVR_and_Immersive_technologies";
import Digital_Transformation_Systems from "./sub-pages/Digital_Transformation_Systems";
import SmartHomeAutomation from "./articles/SmartHomeAutomation";
import AIOT from "./articles/AIOT";
import IndustrialIOT from "./articles/IndustrialIOT";
import FinexoArticle from "./articles/Finexo";
import Healnet from "./articles/Healnet";
import DeleteAccFinexo from "./pages/DeleteAccFinexo";
import Agentra from "./pages/Agentra";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/finexo" element={<Finexo />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/healnet" element={<HealNet />} />
        <Route path="/agentra" element={<Agentra />} />
        <Route path="/home-automation" element={<HomeAutomation />} />
        <Route path="/office-automation" element={<OfficeAutomation />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route
          path="/privacy-policy-finexo"
          element={<PrivacyPolicyFinexo />}
        />
        <Route
          path="/delete-account-policy-finexo"
          element={<DeleteAccFinexo />}
        />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        <Route
          path="/iot-driven-automation"
          element={<IOT_Driven_Automation />}
        />
        <Route
          path="/ai-and-genrative-solutions"
          element={<Ai_and_Genrative_Solutions />}
        />
        <Route
          path="/video-analytics-and-computer-vision"
          element={<Video_Analytics_and_Computer_Vision />}
        />
        <Route
          path="/arvr-and-immersive-technologies"
          element={<ARVR_and_Immersive_technologies />}
        />
        <Route
          path="/digital-transformation-systems"
          element={<Digital_Transformation_Systems />}
        />

        <Route
          path="/smart-home-automation"
          element={<SmartHomeAutomation />}
        />
        <Route path="/aiot" element={<AIOT />} />
        <Route path="/industrial-iot" element={<IndustrialIOT />} />
        <Route path="/finexo-article" element={<FinexoArticle />} />
        <Route path="/healnet-article" element={<Healnet />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}

export default App;
