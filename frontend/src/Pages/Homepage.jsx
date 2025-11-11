import { useLocation, useNavigate } from 'react-router-dom';
import Banners from '../Components/Banner'
import Footer from '../Components/Footer'
import NavigationBar from '../Components/Navbar'
import { useEffect } from 'react';


function Homepage() {
    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("scrollTo");

    if (section) {
      // Small delay to ensure elements are rendered
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Remove query param so it doesn't trigger again
        params.delete("scrollTo");
        navigate({ pathname: "/", search: params.toString() }, { replace: true });
      }, 200); // 200ms delay is safer
    }
  }, [location.search, navigate]);

  return (
    <>
    <NavigationBar/>
    <Banners/>
    <Footer/>
    </>
  )
}

export default Homepage