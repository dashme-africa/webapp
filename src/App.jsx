import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from './features/items/itemsSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import UploadPage from './components/UploadPage';
import HomeScreen from './screens/HomeScreen';


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
        <Header />
        <main>
          <Routes>
            <Route path="/" element={ <><Hero /> <HomeScreen /></>} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </div>
  );
};

export default App;


