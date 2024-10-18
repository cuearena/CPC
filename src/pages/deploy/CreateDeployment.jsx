import React, { useState ,useEffect,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserTempData, clearUserTempData } from "../../features/userTempDataSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { noAuthRedirect } from "../../utils/navigateHelper";
import Loading from "../../components/Loading";
import AppLayout from "../layout/AppLayout";
import DepolyCard from "../../components/DepolyCard";
import ProgressBar from "../../components/ProcessBar";


const CreateDeployment = () => {
  const [sshKeys, setSshKeys] = useState([{ name: "", key: "" }]);
  const [serverName, setServerName] = useState("");
  const [osList, setOsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOS, setSelectedOS] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    backup: false,
    vpc: false,
    
  });

  const errorMessageTimerId = useRef(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userTempData.userData);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });
  };


  // Handle input changes for SSH keys
  const handleInputChange = (index, field, value) => {
    const newSshKeys = [...sshKeys];
    newSshKeys[index][field] = value;
    setSshKeys(newSshKeys);
  };

  
  const handleAddSshKey = () => {
    if (sshKeys.length < 5) {
      setSshKeys([...sshKeys, { name: "", key: "" }]);
    }
  };

  // Remove SSH key input
  const handleRemoveSshKey = (index) => {
    const newSshKeys = sshKeys.filter((_, i) => i !== index);
    setSshKeys(newSshKeys);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };
  const handleSelectOS = (os) => {
    console.log("os==>",os)
    setSelectedOS(os);
  };

  const resetError = ()=>{

    if(errorMessageTimerId.current == null){

      errorMessageTimerId.current = setTimeout(() => {
        setError(""); 
      }, 3000);
    }else{
      clearTimeout(errorMessageTimerId.current);
      errorMessageTimerId.current = setTimeout(() => {
        setError(""); 
      }, 3000);
    }
    

  }


  const handleSubmit = async () => {
    // Validation
    if (!serverName) {
      setError("Server name is required.");

      scrollToTop();
      resetError()
       

      return;
    }
    if (!sshKeys[0].name || !sshKeys[0].key) {
      setError("At least one SSH key with both name and key is required.");
      scrollToTop();
      resetError()
      return;
    }
    if (!selectedOS) {
      setError("You must select an OS.");
      scrollToTop();
      resetError()
      return;
    }

    setError(""); 

    // TODO: need to encryt the user data
    
    let mech_id = localStorage.getItem("mech_id")
    
    const deploymentData = {
      serverName,
      sshKeys,
      os: selectedOS,
      options: selectedOptions,
      mech_id:mech_id
    };
    

    try {
      console.log("deploymentData",deploymentData)
      const response = await axios.post("/deploy/create", deploymentData);
      console.log(response.data); // Handle response
    } catch (error) {    
      console.log("error",error)
    }
  };


  useEffect(() => {
    async function init() {
      try {
        const res = await axios.get("/deploy/get-os");
        const resDetails = res?.data;
        const { availableOS } = resDetails?.data;
        setOsList(availableOS);
      } catch (err) {
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
    

    return () => clearTimeout(errorMessageTimerId.current);
  }, [dispatch, navigate]);


  return (
    <AppLayout>
      <div className="min-h-screen p-8 text-white ">
        {/* Progress Bar */}
        <ProgressBar currentStep={2} />
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 w-1/2 mx-auto">
            {error}
          </div>
        )}

        {/* Server Name Section */}
        <div className="flex justify-center mb-4 p-4">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Choose Your <span className="text-purple-400">Server Name</span>
          </h1>
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-600 block w-full p-2.5 max-w-md"
            placeholder="Enter server name"
            required
          />
        </div>

        {/* Create Deployment Heading */}
        <div className="flex justify-center mb-2 p-2">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Choose Your <span className="text-purple-400">OS</span>
          </h1>
        </div>

        {/* Deployment Options */}
        <div className="flex justify-center p-4 m-2">
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto max-w-screen-xl mx-auto p-2">
            {osList.map((item, index) => (
              <DepolyCard
                key={index}
                icon={item.logo}
                family={item.family}
                fullName={item.name}
                checked={false}
                code={item.code}
                onCheck={handleSelectOS} 
              />
            ))}
          </div>
        </div>

        {/* Access via SSH Heading */}
        <div className="flex justify-center mb-4 p-2">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Access using Your <span className="text-purple-400">SSH</span>
          </h1>
        </div>

        {/* SSH Key Inputs with Scroll */}
        <div className="flex justify-center mb-4">
          <div className="grid gap-4 w-full max-w-xl p-6 bg-gray-800 border border-gray-700 rounded-lg" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {sshKeys.map((ssh, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                {/* SSH Key Name */}
                <div className="flex items-center text-sm text-white font-bold">
                  <label htmlFor={`ssh_name_${index}`} className="block mr-4">Name:</label>
                  <input
                    type="text"
                    id={`ssh_name_${index}`}
                    value={ssh.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-600 block w-full p-2.5"
                    placeholder="My SSH Key"
                    required
                  />
                </div>

                {/* SSH Key */}
                <div className="flex items-center text-sm text-white font-bold">
                  <label htmlFor={`ssh_key_${index}`} className="block mr-4">Key:</label>
                  <input
                    type="text"
                    id={`ssh_key_${index}`}
                    value={ssh.key}
                    onChange={(e) => handleInputChange(index, "key", e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-600 block w-full p-2.5"
                    placeholder="ssh-rsa AAAAB..."
                    required
                  />
                </div>

                {/* Remove SSH Key Button */}
                {sshKeys.length > 1 && (
                  <button
                    onClick={() => handleRemoveSshKey(index)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300 w-1/4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {/* Add SSH Key Button */}
            {sshKeys.length < 5 && (
              <button
                onClick={handleAddSshKey}
                className="bg-purple-600 text-white px-3 py-2 text-xs rounded-lg hover:bg-purple-900 focus:ring-4 focus:ring-purple-600 w-1/5"
              >
                Add SSH Key
              </button>
            )}
          </div>
        </div>

        {/* Instance Options Heading */}
        <div className="flex justify-center mb-4 p-2">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Choose Your Options For The <span className="text-purple-400">Instance</span>
          </h1>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid gap-4 w-full max-w-xl p-6 bg-gray-800 border border-gray-700 rounded-lg" style={{ maxHeight: "350px", overflowY: "auto" }}>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="backup"
                  type="checkbox"
                  checked={selectedOptions.backup}
                  onChange={() => handleOptionChange("backup")}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:border-purple-600 checked:bg-purple-600 checked:border-purple-600"
                />
                <label htmlFor="backup" className="ml-2 text-sm font-medium text-gray-300">Backup</label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="vpc"
                  type="checkbox"
                  checked={selectedOptions.vpc}
                  onChange={() => handleOptionChange("vpc")}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:border-purple-600 checked:bg-purple-600 checked:border-purple-600"
                />
                <label htmlFor="vpc" className="ml-2 text-sm font-medium text-gray-300">Enable VPC</label>
              </div>
              {/* Add more options here as needed */}
            </div>
          </div>
        </div>

        {/* Deploy Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-900 focus:ring-4 focus:ring-purple-900" onClick={()=>{handleSubmit()}}>
            Deploy
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateDeployment;
