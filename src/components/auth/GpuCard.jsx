import React from "react";
import moniter from "../../assets/svg/computer-svgrepo-com.svg";
import infoIcon from "../../assets/svg/info-svgrepo-com.svg";

const GpuCard = ({ data,onRent }) => {

  const handleRentClick = () => {
    console.log("click")
    onRent(data); 
    
  };

  const getLocationString = () => {
    return data.locations.map(location => location.fullform).join(', ');
  };

  return (
    <div key={data.id} className="bg-[#211F2A] rounded-lg p-4 flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <img
          className="bg-purple-500 p-2 rounded w-12 h-12"
          src={moniter}
          alt="Monitor"
        />
        <div className="text-left ">
          <h2 className="text-2xl font-semibold">{data.type}</h2>
          <div className="flex  space-x-10 pt-1">
            <div className="text-gray-400 space-y-2">
              <p>Vcpu-count: {data.vcpu_count}</p>
              <p>Ram: {data.ram} MB</p>
            </div>
            <div className="text-gray-400 text-gray-400 space-y-2">
              <p>Disk-count: {data.disk_count}</p>
              <p>Disk: {data.disk}</p>
              
            </div>
            <div className="text-gray-400 text-gray-400 space-y-2">
              <p>Band-width: {data.bandwidth} MB</p>
            </div>
            
          </div>
          <div className="text-gray-400 text-gray-400 space-y-2 mt-1">
              <p>Region: {getLocationString()} </p>
            </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p>
          Average price: <span className="font-bold">${data.monthly_cost} /m</span>
        </p>
        {/* Uncomment if needed */}
        {/* <img className="p-2 w-12 h-12" src={infoIcon} alt="Info" /> */}
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg" onClick={handleRentClick} >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default GpuCard;
