// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');

//       if (token) {
//         try {
//           const response = await axios.get('https://dashmeafrica-backend.vercel.app/api/userProfile/profile', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data);
//         } catch (error) {
//           console.error('Failed to fetch user profile', error);
//         }
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!user) {
//     return <div className='text-center p-5 m-5'>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>User Profile</h2>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://dashmeafrica-backend.vercel.app/api/userProfile/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (!user) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
        <div className="row g-0">
          {/* Left Column - User Profile */}
          <div className="col-md-4 bg-light text-center p-4">
            <div className="mb-4">
              <img
                src={image || user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="rounded-circle img-fluid"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-primary btn-sm">
                Upload Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                />
              </label>
            </div>
            <h3 className="fw-bold">{user.username || 'Buzz Brain'}</h3>
            <div className="text-warning mb-2">★★★★★</div>
            <p className="text-muted mb-1">54 reviews</p>
            <p className="mb-2">
              <strong>Followers:</strong> 16 | <strong>Following:</strong> 4
            </p>
          </div>

          {/* Right Column - Profile Form */}
          <div className="col-md-8 p-4">
            <h4 className="fw-bold">Edit Your Profile</h4>
            <form className="mt-4">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.firstName || 'Chinomso'}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.lastName || 'Nduoma'}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user.username || 'Buzz Brain'}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={user.email || 'chinomsnduoma@gmail.com'}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.address || 'Rumuolumeni, Port Harcourt, Rivers State'}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  rows="3"
                  defaultValue={user.bio || "I'm a student who sells random stuff for extra cash"}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Profile;
