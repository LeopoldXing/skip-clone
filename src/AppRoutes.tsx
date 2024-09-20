import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoutes from "@/auth/ProtectedRoutes.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import RestaurantDetailPage from "@/pages/RestaurantDetailPage.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path='/search/:city' element={<Layout><SearchPage/></Layout>}/>
        <Route path='/detail/:restaurantId' element={<Layout><RestaurantDetailPage/></Layout>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
          <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage/></Layout>}/>
        </Route>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
  );
};

export default AppRoutes;
