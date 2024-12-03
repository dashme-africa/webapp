import React, { useEffect } from 'react';
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
// import Home from './components/Home';


const App = () => {
  const dispatch = useDispatch();

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
            <Route path="/" element={ <> <Header /> <Hero /> <HomeScreen /> </> } />
            <Route path="/upload" element={<><Header /> <UploadPage /></>} />
            <Route path="/profile" element={<><Header /> <Profile /></>} />
            <Route path="/register" element={<><Formhead /> <Register /></>} />
            <Route path="/login" element={<><Formhead /><Login /></>} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </div>
  );
};

export default App;


