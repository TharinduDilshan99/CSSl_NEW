import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// render - home page
const Dashboard = Loadable(lazy(() => import('pages/home/dashboard')));
const MemberDashboard = Loadable(lazy(() => import('pages/home/member-dashboard')));
const FormCreate = Loadable(lazy(() => import('pages/forms/create/create')));
const ApplicationDetailsForm = Loadable(lazy(() => import('pages/forms/updateForm/ApplicationDetails/list')));
const EmploymentDetailsForm = Loadable(lazy(() => import('pages/forms/updateForm/EmployementDetails/list')));
const AcademicQualificationForm = Loadable(lazy(() => import('pages/forms/updateForm/AcademicQualification/list')));
const ProffesionalQualificationForm = Loadable(lazy(() => import('pages/forms/updateForm/ProffesionalMembership/list')));

const Application = Loadable(lazy(() => import('pages/forms/application')));
const NewApplication = Loadable(lazy(() => import('pages/home/new-application')));
const ApplicantDashboard = Loadable(lazy(() => import('pages/home/applicant-dashboard')));
const SecondNewApplication = Loadable(lazy(() => import('pages/home/second-new-application')));
const NewMemberDetails = Loadable(lazy(() => import('pages/new-forms/create/create')));

const SignUp = Loadable(lazy(() => import('pages/auth-new/SignUp')));
const SignIn = Loadable(lazy(() => import('pages/auth-new/SignIn')));
const PasswordResetMember = Loadable(lazy(() => import('pages/auth-new/Password-Reset-Member')));
const ForgotPasswordMember = Loadable(lazy(() => import('pages/auth-new/Forgot-Password-Member')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'home',
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            {
              path: 'member-dashboard',
              element: <MemberDashboard />
            },
            {
              path: 'applicant-dashboard',
              element: <ApplicantDashboard />
            },
            {
              path: 'new-application',
              element: <NewApplication />
            },
            {
              path: 'second-new-application',
              element: <SecondNewApplication />
            },
            {
              path: 'create',
              element: <FormCreate />
            },
            {
              path: 'new-forms',
              element: <NewMemberDetails />
            }
          ]
        },
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    },
    {
      path: '/auth-new',
      element: <CommonLayout />,
      children: [
        {
          path: 'register',
          element: <SignUp />
        },
        {
          path: 'login',
          element: <SignIn />
        },
        {
          path: 'reset-password',
          element: <PasswordResetMember />
        },
        {
          path: 'forgot-password',
          element: <ForgotPasswordMember />
        }
      ]
    },
    {
      path: 'forms',
      children: [
        {
          path: 'create',
          element: <FormCreate />
        },
        {
          path: 'application',
          element: <Application />
        },
        {
          path: 'updateform',
          children: [
            {
              path: 'application-details',
              element: <ApplicationDetailsForm />
            },
            {
              path: 'employee-details',
              element: <EmploymentDetailsForm />
            },
            {
              path: 'academic-qualification',
              element: <AcademicQualificationForm />
            },
            {
              path: 'proffesional-qualification',
              element: <ProffesionalQualificationForm />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;