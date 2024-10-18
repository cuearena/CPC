import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import axios from "../../utils/axiosInstance";
import { noAuthRedirect } from "../../utils/navigateHelper";
import { setSession } from "../../features/authSlice";
import GpuCard from "../../components/auth/GpuCard";
import ProgressBar from "../../components/ProcessBar";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setUserTempData, clearUserTempData } from "../../features/userTempDataSlice";

function Deploy() {
  const [plan, setPlan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(''); // Add sort state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userTempData.userData);

  const handleSaveData = (newData) => {
    dispatch(setUserTempData(newData));
  };

  const handleClearData = () => {
    dispatch(clearUserTempData());
  };

  useEffect(() => {
    async function init() {
      try {
        const res = await axios.get("/deploy");
        const resDetails = res?.data;
        const { plans } = resDetails?.data?.data;
        setPlan(plans);
      } catch (err) {
        setError("Failed to load plans.");
        if (err.response) {
          const isRedirect = noAuthRedirect(err, () => {
            dispatch(setSession({ email: "", auth: "N" }));
            navigate("/login");
          });
          if (isRedirect === true) return;
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [dispatch, navigate]);

  // Sorting function
  const handleSort = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
    const sortedPlans = [...plan];

    if (criteria === "price") {
      sortedPlans.sort((a, b) => a.monthly_cost - b.monthly_cost);
    } else if (criteria === "interface") {
      sortedPlans.sort((a, b) => a.type.localeCompare(b.type));
    } else if (criteria === "vRAM") {
      sortedPlans.sort((a, b) => a.ram - b.ram);
    }

    setPlan(sortedPlans);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleRentGpu = (gpuData) => {
    handleSaveData(gpuData);
    localStorage.setItem("mech_id",gpuData.id)
    navigate("/deploy/create");
    console.log("Renting GPU:", gpuData);

  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = plan?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(plan.length / itemsPerPage);

  return (
    <AppLayout>
      <Loading show={isLoading} />
      <div className="min-h-screen text-white">
        <ProgressBar currentStep={1} />
        <header className="py-10">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Explore Pricing and Earnings on <span className="text-purple-400">CPC</span>
          </h1>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500">
              GPU Pricing
            </button>
            <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500">
              Usage Pricing Calculator
            </button>
          </div>
        </header>

        <div className="flex justify-between items-center px-6 md:px-20">
          <div className="flex space-x-4">
            <select className="form-select bg-gray-800 border-none text-gray-400 rounded-lg px-4 py-2">
              <option>Region</option>
            </select>
            <select className="form-select bg-gray-800 border-none text-gray-400 rounded-lg px-4 py-2">
              <option>vRAM</option>
            </select>
            <select className="form-select bg-gray-800 border-none text-gray-400 rounded-lg px-4 py-2">
              <option>Interface</option>
            </select>
          </div>

          <select className="form-select bg-gray-800 border-none text-gray-400 rounded-lg px-4 py-2" onChange={handleSort}>
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="interface">Interface</option>
            <option value="vRAM">vRAM</option>
          </select>
        </div>

        <div className="px-6 md:px-20 mt-10">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <GpuCard key={index} data={item} onRent={handleRentGpu} />
            ))
          ) : (
            <p className="text-center text-gray-400">No Device found</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-500"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-4 text-lg">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-500"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

export default Deploy;
