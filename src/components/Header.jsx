// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown, Alert } from 'react-bootstrap';
// import { FaUser, FaBell, FaHeart, FaSearch } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// const apiURL = import.meta.env.VITE_API_URL;

// const Header = () => {
//   const { t, i18n } = useTranslation();
//   const [currentLanguage, setCurrentLanguage] = useState('EN');
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');
//   const displayAlert = (message, variant = 'success', duration = 5000) => {
//     setAlertMessage(message);
//     setAlertVariant(variant);
//     setShowAlert(true);
//     setTimeout(() => {
//       setShowAlert(false);
//     }, duration);
//   };

//   const handleLanguageChange = (lang, label) => {
//     i18n.changeLanguage(lang);
//     setCurrentLanguage(label);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const { data } = await axios.get(
//             `${apiURL}/userProfile/profile`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setUserData(data);
//         } catch (error) {
//           console.error('Error fetching user data:', error.response?.data?.message || error.message);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     // Show the logout message
//     displayAlert('Logging you out. Redirecting...');

//     // Clear the token from localStorage
//     localStorage.removeItem('token');
//     setUserData(null);

//     // Redirect after 3 seconds
//     setTimeout(() => {
//       window.location.href = '/login';
//     }, 3000);
//   };


//   return (
//     <header className="bg-white shadow-sm">
//       <Navbar bg="white" expand="md" className="px-3">
//         <Container fluid className="d-flex align-items-center justify-content-space-between">
//           {/* Logo */}
//           <Navbar.Brand href="/" className="d-flex align-items-center me-5">
//             <img
//               src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png"
//               alt="DashMe Logo"
//             />
//           </Navbar.Brand>

//           {/* Toggle for Mobile */}
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />

//           {/* Search Bar */}
//           <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
//             <div className="input-group">
//               <FormControl
//                 type="search"
//                 placeholder={t('searchPlaceholder')}
//                 aria-label="Search"
//                 className="rounded-start"
//                 style={{
//                   border: '1px solid green',
//                   borderTopLeftRadius: '25px',
//                   borderBottomLeftRadius: '25px',
//                 }}
//               />
//               <Button
//                 variant="outline-success"
//                 className="rounded-end"
//                 style={{
//                   backgroundColor: 'green',
//                   color: 'white',
//                   borderTopRightRadius: '25px',
//                   borderBottomRightRadius: '25px',
//                   border: '1px solid green',
//                 }}
//               >
//                 <FaSearch />
//               </Button>
//             </div>
//           </Form>

//           {/* Navbar Links */}
//           <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//             <Nav className="d-flex flex-row align-items-center justify-content-space-between">
//               <Nav.Link href="/notifications" className="me-3">
//                 <FaBell size={30} />
//               </Nav.Link>
//               <Nav.Link href="/favorites" className="me-3">
//                 <FaHeart size={30} />
//               </Nav.Link>
//               <Nav.Link href="/profile" className="me-5 d-flex align-items-center">
//                 {loading ? (
//                   <span>Loading...</span>
//                 ) : userData?.profilePicture ? (
//                   <img
//                     src={userData.profilePicture}
//                     alt="Profile"
//                     className="rounded-circle"
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <FaUser size={30} />
//                 )}
//                 <span>&nbsp;{userData?.username}</span>
//               </Nav.Link>

//               <Nav.Link href="/upload" className="me-4 fs-6 text-dark">
//                 {t('uploadText')}
//               </Nav.Link>

//               {userData ? (
//                 // If user is logged in, show Logout
//                 <Nav.Link onClick={handleLogout} className="me-3 fs-6 text-dark">
//                   {t('logout')}
//                 </Nav.Link>
//               ) : (
//                 // If user is not logged in, show Sign Up
//                 <Nav.Link href="/register" className="me-3 fs-6 text-dark">
//                   {t('signUp')}
//                 </Nav.Link>
//               )}

//               <Dropdown>
//                 <Dropdown.Toggle variant="light" className="fs-6 text-dark">
//                   {currentLanguage}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item onClick={() => handleLanguageChange('en', 'EN')}>EN</Dropdown.Item>
//                   <Dropdown.Item onClick={() => handleLanguageChange('fr', 'FR')}>FR</Dropdown.Item>
//                   <Dropdown.Item onClick={() => handleLanguageChange('es', 'ES')}>ES</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <Alert variant={alertVariant} show={showAlert}>
//         {alertMessage}
//       </Alert>
//     </header>

//   );
// };

// export default Header;

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown, Alert } from 'react-bootstrap';
import { FaUser, FaBell, FaHeart, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const displayAlert = (message, variant = 'success', duration = 5000) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };

  const handleLanguageChange = (lang, label) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(label);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get(`${apiURL}/userProfile/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await axios.get(`${apiURL}/notify/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API response:', data);

        // Assuming notifications are directly in `data.data`
        const notifications = data.data || [];
        setNotifications(notifications);

        // Calculate unread count
        const unread = notifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error.response?.data?.message || error.message);
      }
    };

    // Poll every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);

    // Fetch initially
    fetchNotifications();

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${apiURL}/notify/notifications/mark-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    displayAlert('Logging you out. Redirecting...');
    localStorage.removeItem('token');
    setUserData(null);
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };

  return (
    <header className="bg-white shadow-sm">
      <Navbar bg="white" expand="md" className="px-3">
        <Container fluid className="d-flex align-items-center justify-content-space-between">
          <Navbar.Brand href="/" className="d-flex align-items-center me-5">
            <img
              src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png"
              alt="DashMe Logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="input-group">
              <FormControl
                type="search"
                placeholder={t('searchPlaceholder')}
                aria-label="Search"
                className="rounded-start"
                style={{
                  border: '1px solid green',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '25px',
                }}
              />
              <Button
                variant="outline-success"
                className="rounded-end"
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  border: '1px solid green',
                }}
              >
                <FaSearch />
              </Button>
            </div>
          </Form>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="d-flex flex-row align-items-center justify-content-space-between">
              <Nav.Link href="/notifications" className="me-3" onClick={markAllAsRead}>
                <FaBell size={30} />
                {unreadCount > 0 && (
                  <span className="badge bg-danger">{unreadCount}</span>
                )}
              </Nav.Link>

              <Nav.Link href="/favorites" className="me-3">
                <FaHeart size={30} />
              </Nav.Link>

              <Nav.Link href="/profile" className="me-5 d-flex align-items-center">
                {loading ? (
                  <span>Loading...</span>
                ) : userData?.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : (
                  <FaUser size={30} />
                )}
                <span>&nbsp;{userData?.username}</span>
              </Nav.Link>

              <Nav.Link href="/upload" className="me-4 fs-6 text-dark">
                {t('uploadText')}
              </Nav.Link>

              {userData ? (
                <Nav.Link onClick={handleLogout} className="me-3 fs-6 text-dark">
                  {t('logout')}
                </Nav.Link>
              ) : (
                <Nav.Link href="/register" className="me-3 fs-6 text-dark">
                  {t('signUp')}
                </Nav.Link>
              )}

              <Dropdown>
                <Dropdown.Toggle variant="light" className="fs-6 text-dark">
                  {currentLanguage}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleLanguageChange('en', 'EN')}>EN</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('fr', 'FR')}>FR</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('es', 'ES')}>ES</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Alert variant={alertVariant} show={showAlert}>
        {alertMessage}
      </Alert>
    </header>
  );
};

export default Header;
