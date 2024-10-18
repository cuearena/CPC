import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ChevronsLeft,
  ChevronsRight,
  User,
  Rocket,
  House,
  CloudUpload,
  Settings,
  FileText,
  WrenchIcon,
  Layers,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axiosInstance";
import { noAuthRedirect } from "../../utils/navigateHelper";
import { setSession } from "../../features/authSlice";

import { Dropdown, TextInput } from "flowbite-react";
import compute from "../../assets/imgs/compute.jpg";

function AppLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Drawer open/close state

  async function handleLogout() {
    await axios
      .post("/auth/logout")
      .then((res) => {
        dispatch(setSession({ email: "", auth: "N" }));
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          var isRedirect = noAuthRedirect(err, () => {
            dispatch(setSession({ email: "", auth: "N" }));
            navigate("/login");
          });
          if (isRedirect === true) return;
        }
        console.log(err);
      });
  }

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex sticky w-full top-0 bg-white h-[67px] shadow-md z-50">
        <div className="flex items-center justify-between w-full mx-auto px-4 md:px-[21px]">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <a className="inline-block">
              <div className="flex items-center gap-2">
                <img
                  className="w-[30px] sm:w-[35px] rounded-full"
                  src={compute}
                  alt="Compute Credit"
                />
                <h1 className="text-sm sm:text-base font-medium hidden sm:inline">
                  Compute Credit
                </h1>
              </div>
            </a>
          </div>

          {/* Right Side: Buttons and User Icon */}
          <div className="flex items-center ml-auto gap-2 sm:gap-4">
            <button className="text-xs sm:text-sm text-white font-medium h-8 px-3 sm:px-4 w-auto bg-[#851CFF] hover:bg-[#7a3bcc] rounded-full">
              Get Started
            </button>
            <button className="text-xs sm:text-sm text-white font-medium h-8 px-3 sm:px-4 w-auto bg-[#851CFF] hover:bg-[#7a3bcc] rounded-full">
              Connect Wallet
            </button>

            {/* Dropdown User Icon */}
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <button className="flex justify-center items-center h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 hover:bg-gray-300 rounded-full">
                  <User size={20} sm:size={27} />
                </button>
              )}
            >
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </header>
      {/* Drawer Section */}

      <aside
        className={`fixed top-0 left-0 h-full mt-[67px]  ${
          isOpen ? "w-[240px]" : "w-[70px]"
        } bg-black text-white border-r border-white lg:z-auto z-50`}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          {/* Deploy Button */}

          <NavLink
            to="/deploy"
            className="flex items-center gap-2 hover:text-gray-400"
          >
            <button className="bg-purple-600 hover:bg-purple-700 w-full text-white py-2 px-4 rounded my-6 flex items-center justify-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Rocket size={24} />
              </div>
              {isOpen && <span>Deploy</span>}
            </button>
          </NavLink>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 gap-4">
            <NavLink
              to="/home"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <House />
              {isOpen && <span>Home</span>}
            </NavLink>
            <NavLink
              to="/deploy"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <CloudUpload />
              {isOpen && <span>Deployments</span>}
            </NavLink>
            <NavLink
              to="/marketplace"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FileText />
              {isOpen && <span>Marketplace</span>}
            </NavLink>
            <NavLink
              to="/sdlbuilders"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <WrenchIcon />
              {isOpen && <span>SDL Builders</span>}
            </NavLink>
            <NavLink
              to="/stack"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <Layers />
              {isOpen && <span>Stack</span>}
            </NavLink>
            <NavLink
              to="/providers"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <User />
              {isOpen && <span>Providers</span>}
            </NavLink>
          </nav>

          {/* Bottom Links */}
          <div className="pt-6 border-t border-gray-500">
            <NavLink
              to="/settings"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <Settings />
              {isOpen && <span>Settings</span>}
            </NavLink>
          </div>
        </div>

        {/* Toggle Button on the right border */}
        <button
          className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 p-2 rounded-full"
          onClick={toggleDrawer}
        >
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </button>
      </aside>

      {/* Main Content Section */}
      <main
        className={`${isOpen ? "lg:ml-[244px] ml-0" : "ml-[70px]"} py-4 px-2 ${
          isOpen ? "lg:z-auto z-40" : ""
        }`}
      >
        {children}
        <ToastContainer />
      </main>
    </>
  );
}

export default AppLayout;
