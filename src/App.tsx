import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Users from './pages/Users/Users';
 
 
 
import ViewAllProperties from './pages/AllProperites/ViewAllPropeties';
import Vendor from './pages/Vandor/Vendor';
 
import ApproveVendorProfile from './pages/PendingApprove/ApprovelVandorProfiles';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Out Admin - Tailwind CSS Admin Dashboard Template" />

              <ECommerce />
            </>
          }
        />
         <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
        />
        <Route
          path="/vendor"
          element={
            <>
              <PageTitle title="vendor | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Vendor />
            </>
          }
        />
         <Route
          path="/ApproveVendorProfile"
          element={
            <>
              <PageTitle title="Approve vendor Profile | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <ApproveVendorProfile />
            </>
          }
        />
        <Route
          path="/ViewAllProperties"
          element={
            <>
              <PageTitle title="View all Properties | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <ViewAllProperties />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
       
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Out Admin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
