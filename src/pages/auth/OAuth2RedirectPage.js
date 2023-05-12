import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginOAuthFailed, loginOAuthSuccess } from "../../store/login/action";

function OAuth2RedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const error = searchParams.get("error");

  const redirect = (userInfo) => {
    if (accessToken || refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(loginOAuthSuccess());
      navigate("/", { userInfo });
    } else {
      dispatch(loginOAuthFailed("Authenticate failed!"));
      navigate("/login", { state: { error } });
    }
  };

  useEffect(() => {
    redirect(location);
  }, [location.search]);

  return <div>Redirect...</div>;
}

export default OAuth2RedirectPage;
