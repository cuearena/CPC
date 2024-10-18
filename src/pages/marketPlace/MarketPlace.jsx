import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppLayout from "../layout/AppLayout";

import axios from "../../utils/axiosInstance";
import { noAuthRedirect } from "../../utils/navigateHelper";
import { setSession } from "../../features/authSlice";
import ComingSoon from "../../components/ComingSoon";

function MarketPlace() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      await axios
        .get("/marketplace")
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
  return (
    <AppLayout>
      <ComingSoon />
    </AppLayout>
  );
}

export default MarketPlace;
