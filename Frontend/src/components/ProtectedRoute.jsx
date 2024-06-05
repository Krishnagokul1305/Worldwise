import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { islogged } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!islogged) navigate("/");
    },
    [islogged, navigate]
  );
  return islogged ? children : null;
}

export default ProtectedRoute;
