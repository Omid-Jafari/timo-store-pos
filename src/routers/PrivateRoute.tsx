import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }: any) {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  if (!isLoggedIn || !token) navigate("/login", { replace: true });
  else return children;
}

export default PrivateRoute;
