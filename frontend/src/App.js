import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginPage from "./Components/LoginPage";
import ErrorPage from "./Components/ErrorPage";
import Merchantmain from "./Components/Merchantmain";
import MerchantRegister from './Components/MerchantRegister';

function App() {
  const navigate = useNavigate();

  useEffect(() => {

    const expTime = () => {

      const token = localStorage.getItem('token');

      if (token) {

        try {
          const jwtDecodeToken = jwtDecode(token);
          // converting milliseconds becoz exp time in seconds to match the current time(iat) we use 1000 to convert the milliseconds
          const expToken = jwtDecodeToken.exp * 1000;
          const iatToken = Date.now();
          if (expToken < iatToken) {
            localStorage.removeItem('token');
            navigate('/');
          } else {
            setTimeout(() => {
              localStorage.removeItem('token');
              navigate('/');
            }, expToken - iatToken);
          }
        }
        catch (err) {
          console.error("Token decoding error", err);
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };

    expTime();

  }, [navigate]);



  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path='/register' element={<MerchantRegister />} />
        <Route path="/merchant/*" element={<Merchantmain />} />
      </Routes>
    </div>
  );
}

export default App;
