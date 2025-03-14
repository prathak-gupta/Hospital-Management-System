import React, { useState } from 'react';
import { Bell, Calendar, Pill, FileText, CreditCard, Check } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types';

const NotificationList: React.FC = () => {
  const { user } = useAuth();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  
  // Filter notifications for the current user
  const userNotifications = mockNotifications.filter(
    notification => notification.userId === user?.id
  );
  
  const unreadCount = userNotifications.filter(n => !n.read).length;
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'prescription':
        return <Pill className="h-5 w-5 text-green-500" />;
      case 'bill':
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      case 'lab':
        return <FileText className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          {unreadCount} unread notifications
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              All Notifications
            </h3>
            {unreadCount > 0 && (
              <button className="text-sm text-primary-600 hover:text-primary-500 font-medium flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Mark all as read
              </button>
            )}
          </div>
        </div>
        
        {userNotifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-xs text-gray-500">{notification.date}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      {!notification.read && (
                        <button className="text-xs text-primary-600 hover:text-primary-500 font-medium">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              You're all caught up! Check back later for new notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;