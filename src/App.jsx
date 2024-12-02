import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from './features/items/itemsSlice';
// import RecommendedItems from './components/RecommendedItems';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import UploadPage from './components/UploadPage';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Container from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Example: Set initial items
    const sampleItems = ['Item 1', 'Item 2', 'Item 3'];
    dispatch(setItems(sampleItems));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <HomeScreen />
              <UploadPage />
            </main>
          } />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
