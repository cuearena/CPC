import axios from "../../utils/axiosInstance";
import { noAuthRedirect } from "../../utils/navigateHelper";
import { setSession } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import BarGroup from "../../assets/imgs/BarGroup.png";
import { toast } from "react-toastify";
import DynamicGraph from "../../components/DynamicGraph";

function Stacking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stakedAmount, setStakedAmount] = useState(256.5);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function init() {
      await axios
        .get("/stack")
        .then((res) => {
          console.log(res);
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

    init();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMaxClick = () => {
    setInputValue(stakedAmount);
  };

  let isToastActive = false;

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(inputValue);

    // Check if there is an active toast
    if (!isToastActive) {
      if (withdrawAmount > 0 && withdrawAmount <= stakedAmount) {
        setStakedAmount(stakedAmount - withdrawAmount);
        setInputValue("");

        // Set the flag and show the toast
        isToastActive = true;
        toast.success(`Successfully withdrawn ${withdrawAmount} BUSD`, {
          onClose: () => (isToastActive = false), // Reset the flag when toast closes
        });
      } else {
        // Set the flag and show the error toast
        isToastActive = true;
        toast.error("Invalid withdraw amount.", {
          onClose: () => (isToastActive = false), // Reset the flag on close
        });
      }
    }
  };

  const data = [
    { title: "Total Value Locked:", value: "$7,868,163.54", imgSrc: BarGroup },
    { title: "APY:", value: "158.50%", imgSrc: BarGroup },
    { title: "Number of Stakers:", value: "5699", imgSrc: BarGroup },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen text-white py-8 px-[10px] sm:px-1 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 rounded-lg shadow-lg"
          style={{
            background:
              "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 shadow-md flex flex-col sm:flex-row items-center sm:items-start justify-between w-full border-r border-gray-600 last:border-none"
            >
              <div className="text-center sm:text-left">
                <h2 className="text-base text-white">{item.title}</h2>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </div>
              <img
                src={item.imgSrc}
                alt="Graph Icon"
                className="h-[60px] w-[90px] object-contain mt-2 sm:mt-0"
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 text-white">
          {/* Sidebar */}
          <div
            className="flex-1 py-6 px-4 md:px-10 rounded-lg flex flex-col justify-center gap-4 md:gap-8"
            style={{
              background:
                "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
            }}
          >
            {[
              "Check Point",
              "Amount Stake",
              "Pre-authorization",
              "Confirm",
            ].map((text, idx) => (
              <div
                key={idx}
                className="text-2xl font-bold text-center lg:text-left"
              >
                {text}
              </div>
            ))}
          </div>

          {/* Wallet Status */}
          <div className="w-full lg:w-[300px] flex flex-col gap-6">
            <div
              className="rounded-lg h-auto sm:h-[200px] px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center sm:items-start"
              style={{
                background:
                  "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
              }}
            >
              <div className="text-lg sm:text-xl font-extrabold text-center sm:text-left">
                Connected MetaMask
              </div>
              <p className="text-sm sm:text-base mt-2 text-center sm:text-left">
                If not connected, click the "Connect Wallet" button in the top
                right corner.
              </p>
            </div>
            <div
              className="rounded-lg h-auto sm:h-[200px] px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center sm:items-start"
              style={{
                background:
                  "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
              }}
            >
              <div className="text-lg sm:text-xl font-extrabold text-center sm:text-left">
                Available Balance
              </div>
              <p className="text-sm sm:text-base mt-2 text-center sm:text-left">
                Current Balance: 38.00 <br /> You must have balance in wallet
              </p>
            </div>
          </div>

          {/* Staking Section */}
          <div
            className="flex-1 p-4 rounded-lg flex flex-col space-y-4"
            style={{
              background:
                "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
            }}
          >
            <div className="p-4 pb-6 flex flex-col lg:flex-row justify-between border-b items-center gap-3">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <div className="text-xl font-bold">Your Staked</div>
                <div className="text-4xl font-bold">256.50</div>
              </div>
              <div className=" lg:w-auto mt-4 lg:mt-0">
                <DynamicGraph />
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="p-4 rounded-lg">
              <div className="text-lg font-bold mb-4 text-center lg:text-left">
                Staked: {stakedAmount} BUSD
              </div>
              <div className="flex items-center border border-gray-500 rounded-lg p-2 mb-5">
                <input
                  type="text"
                  placeholder="0.00"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="bg-transparent text-white flex-grow outline-none border-none placeholder-gray-400 focus:ring-0"
                />
                <button
                  onClick={handleMaxClick}
                  className="text-gray-400 font-bold"
                >
                  MAX
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <button
                  onClick={handleWithdraw}
                  className="bg-indigo-700 text-white px-6 py-2 font-bold rounded-lg w-full lg:w-auto mb-4 sm:mb-0"
                >
                  STAKE
                </button>
                <button
                  onClick={handleWithdraw}
                  className="bg-gray-700 text-white px-4 py-2 font-bold rounded-lg w-full lg:w-auto"
                >
                  WITHDRAW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-6 py-6 px-4 md:px-10 rounded-lg shadow-lg"
          style={{
            background:
              "linear-gradient(339deg, #3E196E -29.65%, #1F1728 101.9%)",
          }}
        >
          <p className="text-xl font-extrabold mb-2 text-center lg:text-left">
            Eligible to stake
          </p>
          <p className="text-sm text-center lg:text-left">
            You cannot stake if you have an active unstake/withdrawal request.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export default Stacking;
