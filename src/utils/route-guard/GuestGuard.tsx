import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

// types
import { GuardProps } from 'types/auth';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(user);


  useEffect(() => {
    if (isLoggedIn) {
      //  navigate(location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH, {
      navigate(location?.state?.from ? location?.state?.from : user?.userRoleID == 21 ? "/home/applicant-dashboard" : user?.userRoleID == 22 ? "/home/member-dashboard" : APP_DEFAULT_PATH, {
        state: {
          from: ''
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

export default GuestGuard;
