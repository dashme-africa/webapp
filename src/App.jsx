import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from './features/items/itemsSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Formhead from './components/Formhead';
import Footer from './components/Footer';
import Hero from './components/Hero';
import UploadPage from './components/UploadPage';
import HomeScreen from './screens/HomeScreen';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
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

const App = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [notifications, setNotifications] = useState('');
  // const [unreadCount, setUnreadCount] = useState(0);

  // const fetchNotifications = async () => {
  //   const token = localStorage.getItem('adminToken');
  //   if (!token) return;

  //   try {
  //     const config = { headers: { Authorization: `Bearer ${token}` } };
  //     const { data } = await axios.get(`${apiURL}/notifyAdmin/notifications`, config);
  //     setNotifications(data.data);
  //     setUnreadCount(data.data.filter((notification) => !notification.read).length);
  //   } catch (err) {
  //     console.error('Failed to fetch notifications:', err);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const markNotificationAsRead = async (id) => {
  //   try {
  //     const token = localStorage.getItem('adminToken');
  //     const config = { headers: { Authorization: `Bearer ${token}` } };
  //     await axios.patch(`${apiURL}/notifyAdmin/notifications/${id}/read`, {}, config);

  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification._id === id ? { ...notification, read: true } : notification
  //       )
  //     );
  //     setUnreadCount((prev) => Math.max(prev - 1, 0));
  //   } catch (err) {
  //     console.error('Failed to mark notification as read:', err);
  //   }
  // };

  const { notifications, unreadCount, markNotificationAsRead } = useNotifications(true);

  useEffect(() => {
    // Example: Set initial items
    const sampleItems = ['Item 1', 'Item 2', 'Item 3'];
    dispatch(setItems(sampleItems));
  }, [dispatch]);

  return (
    <div>
      <Router>
        <main>
          <Routes>
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/adminRegister" element={<AdminRegister />} />
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
              <>
                <AdminNotification
                  notifications={notifications}
                  markNotificationAsRead={markNotificationAsRead}
                />
              </>
            }
          />


            <Route path="/" element={<> <Header /> <Hero setSelectedCategory={setSelectedCategory} /> <HomeScreen selectedCategory={selectedCategory} /> </>} />


            <Route path="/upload" element={<><Header /> <UploadPage /></>} />
            <Route path="/profile" element={<><Header /> <Profile /></>} />
            <Route path="/register" element={<><Formhead /> <Register /></>} />
            <Route path="/login" element={<><Formhead /><Login /></>} />
            <Route path="/product/:id" element={<><Header /> <ProductDetails /></>} />
            <Route path="/forgot-password" element={<><Formhead /> <ForgotPwd /></>} />
            <Route path="/checkout" element={<><Header /> <Checkout /></>} />
            <Route path="/goshiip" element={<><Header /> <GoShiip /></>} />
            <Route path="/my-products" element={<><Header /> <MyProducts /></>} />
            <Route path="/transaction-details" element={<><Header /> <TransactionDetails /> </>} />
            <Route path="/tracking" element={<><Header /> <TrackingPage /> </>} />
            <Route path="/confirmationPage" element={<><Header /> <ConfirmationPage /> </>} />
            <Route path="/payment-history" element={<><Header /> <PaymentHistory /> </>} />
            <Route path="/notifications" element={<><Header /> <NotificationPage /> </>} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </div>
  );
};

export default App;


