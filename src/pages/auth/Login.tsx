import { useSearchParams } from "react-router-dom";
import LoginWithOtpFirstStep from "../../components/login/loginWithOtpFirstStep";
import LoginWithOtpSecondStep from "../../components/login/loginWithOtpSecondStep";

const Login = () => {
  const [searchParams] = useSearchParams();
  const loginActiveSec = searchParams.get("loginActiveSec") || "getNumber";

  return (
    <div className="w-full h-full flex justify-center items-center bg-[url(/shape01.png)] bg-center bg-no-repeat bg-auto">
      {loginActiveSec === "getNumber" ? (
        <LoginWithOtpFirstStep />
      ) : (
        <LoginWithOtpSecondStep />
      )}
    </div>
  );
};

export default Login;
