// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setItems } from './features/items/itemsSlice';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Header from './components/Header';
// import Formhead from './components/Formhead';
// import Footer from './components/Footer';
// import Hero from './components/Hero';
// import UploadPage from './components/UploadPage';
// import HomeScreen from './screens/HomeScreen';
// import Register from './components/Register';
// import Login from './components/Login';
// import Profile from './components/Profile';
// import AdminLogin from './components/AdminLogin';
// import AdminRegister from './components/AdminRegister';
// import ForgotPwd from './components/ForgotPwd';
// import AdminDashboard from './components/AdminDashboard';
// import EditProduct from './components/EditProduct';
// import ProductDetails from './screens/ProductDetails';
// import Checkout from './screens/Checkout';
// import GoShiip from "./components/GoShiip";
// import MyProducts from "./components/MyProducts";
// import TransactionDetails from "./components/TransactionDetails";
// import TrackingPage from "./components/TrackingPage";
// import ConfirmationPage from "./components/ConfirmationPage";
// import PaymentHistory from './components/PaymentHistory';
// import NotificationPage from './components/NotificationPage';
// import AdminNotification from './components/AdminNotification';
// import useNotifications from './hooks/useNotifications';
// import ResetPassword from "./components/ResetPassword";

// const App = () => {
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const { notifications, unreadCount, markNotificationAsRead, markAllNotificationsAsRead } = useNotifications(true);

//   useEffect(() => {
//     // Example: Set initial items
//     const sampleItems = ['Item 1', 'Item 2', 'Item 3'];
//     dispatch(setItems(sampleItems));
//   }, [dispatch]);

//   return (
//     <div>
//       <Router>
//         <main>
//           <Routes>
//             <Route path="/adminLogin" element={<AdminLogin />} />
//             <Route path="/adminRegister" element={<AdminRegister />} />
//             <Route path="/admin/products/edit/:id" element={<EditProduct />} />

//             <Route
//             path="/adminDashboard"
//             element={
//               <AdminDashboard
//                 notifications={notifications}
//                 unreadCount={unreadCount}
//                 markNotificationAsRead={markNotificationAsRead}
//               />
//             }
//           />

//          <Route
//             path="/admin/notifications"
//             element={
//               <>
//                 <AdminNotification
//                   notifications={notifications}
//                   markNotificationAsRead={markNotificationAsRead}
//                   markAllNotificationsAsRead={markAllNotificationsAsRead}
//                 />
//               </>
//             }
//           />


//             <Route path="/" element={<> <Header /> <Hero setSelectedCategory={setSelectedCategory} /> <HomeScreen selectedCategory={selectedCategory} /> </>} />


//             <Route path="/upload" element={<><Header /> <UploadPage /></>} />
//             <Route path="/profile" element={<><Header /> <Profile /></>} />
//             <Route path="/register" element={<><Formhead /> <Register /></>} />
//             <Route path="/login" element={<><Formhead /><Login /></>} />
//             <Route path="/product/:id" element={<><Header /> <ProductDetails /></>} />
//             <Route path="/forgot-password" element={<><Formhead /> <ForgotPwd /></>} />
//             <Route path="/checkout" element={<><Header /> <Checkout /></>} />
//             <Route path="/goshiip" element={<><Header /> <GoShiip /></>} />
//             <Route path="/my-products" element={<><Header /> <MyProducts /></>} />
//             <Route path="/transaction-details" element={<><Header /> <TransactionDetails /> </>} />
//             <Route path="/tracking" element={<><Header /> <TrackingPage /> </>} />
//             <Route path="/confirmationPage" element={<><Header /> <ConfirmationPage /> </>} />
//             <Route path="/payment-history" element={<><Header /> <PaymentHistory /> </>} />
//             <Route path="/notifications" element={<><Header /> <NotificationPage /> </>} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//           </Routes>
//         </main>
//         <Footer />
//       </Router>

//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from './features/items/itemsSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

import Formhead from './components/Formhead';
import Hero from './components/Hero';
import UploadPage from './components/UploadPage';
import HomeScreen from './screens/HomeScreen';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
// import AdminRegister from './components/AdminRegister';
import ForgotPwd from './components/ForgotPwd';
import AdminDashboard from './components/AdminDashboard';
import EditProduct from './components/EditProduct';
import ProductDetails from './screens/ProductDetails';
import Checkout from './screens/Checkout';
import GoShiip from "./components/GoShiip";
import MyProducts from "./components/MyProducts";
import TransactionDetails from "./components/TransactionDetails";
import TrackingPage from "./components/TrackingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import PaymentHistory from './components/PaymentHistory';
import NotificationPage from './components/NotificationPage';
import AdminNotification from './components/AdminNotification';
import useNotifications from './hooks/useNotifications';
import ResetPassword from "./components/ResetPassword";
import AccountSummary from './components/AccountSummary';

const App = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const { notifications, unreadCount, markNotificationAsRead, markAllNotificationsAsRead } = useNotifications(true);

  useEffect(() => {
    const sampleItems = ['Item 1', 'Item 2', 'Item 3'];
    dispatch(setItems(sampleItems));
  }, [dispatch]);

  return (
    <div>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/adminLogin" element={<AdminLogin />} />
            {/* <Route path="/adminRegister" element={<AdminRegister />} /> */}
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />

            <Route
              path="/adminDashboard"
              element={
                <AdminDashboard
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markNotificationAsRead={markNotificationAsRead}
                />
              }
            />

            <Route
              path="/admin/notifications"
              element={
                <AdminNotification
                  notifications={notifications}
                  markNotificationAsRead={markNotificationAsRead}
                  markAllNotificationsAsRead={markAllNotificationsAsRead}
                />
              }
            />

            <Route
              path="/"
              element={
                <Layout>
                  <Hero setSelectedCategory={setSelectedCategory} />
                  <HomeScreen selectedCategory={selectedCategory} />
                </Layout>
              }
            />

            <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/register" element={<><Formhead /><Register /></>} />
            <Route path="/login" element={<><Formhead /><Login /></>} />
            <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
            <Route path="/forgot-password" element={<><Formhead /><ForgotPwd /></>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/goshiip" element={<Layout><GoShiip /></Layout>} />
            <Route path="/my-products" element={<Layout><MyProducts /></Layout>} />
            <Route path="/transaction-details" element={<Layout><TransactionDetails /></Layout>} />
            <Route path="/tracking" element={<Layout><TrackingPage /></Layout>} />
            <Route path="/confirmationPage" element={<Layout><ConfirmationPage /></Layout>} />
            <Route path="/payment-history" element={<Layout><PaymentHistory /></Layout>} />
            <Route path="/notifications" element={<Layout><NotificationPage /></Layout>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account-summary" element={<Layout><AccountSummary /></Layout>} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
