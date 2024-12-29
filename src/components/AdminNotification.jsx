import React from 'react';

const AdminNotification = ({ notifications, markNotificationAsRead }) => {
    console.log(notifications)
    return (
      <div className="container my-5">
        <h1>Admin Notifications</h1>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul className="list-group">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`list-group-item ${notification.read ? '' : 'list-group-item-warning'}`}
                onClick={() => markNotificationAsRead(notification._id)}
              >
                {notification.message}
                {!notification.read && <span className="badge bg-secondary ms-2">Unread</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default AdminNotification;
  
