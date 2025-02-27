import React, { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { API_BASE_URL } from '../../const';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  nameprefix?: string;
  countryCode?: string;
  contactNumber: string;
  email: string;
  role: string;
  profilePic: string;
  selfIdentificationPic?: string | null;
  createdAt: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const response = await fetch(API_BASE_URL+'/api/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError(data.message || 'Failed to fetch users.');
        }
      } catch (err) {
        setError('An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            All Users
          </h4>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center p-10">
              <p className="text-xl font-medium text-gray-500">No Users Found</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Header */}
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Profile Image
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    First Name
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Last Name
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Contact Number
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Email
                  </h5>
                </div>
              </div>

              {/* User rows */}
              {users.map((user, index) => (
                <div
                  key={user._id}
                  className={`grid grid-cols-3 sm:grid-cols-5 ${
                    index === users.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                  }`}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <div className="flex-shrink-0">
                      <img
                        src={user.profilePic}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <p className="hidden text-black dark:text-white sm:block">
                      {user.firstName}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{user.firstName}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{user.lastName}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">
                      {user.countryCode}{user.contactNumber}
                    </p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
