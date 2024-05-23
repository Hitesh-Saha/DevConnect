import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    <Footer/>
    </>
  )
}

export default MainLayout;
