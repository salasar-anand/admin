import React, { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { API_BASE_URL } from '../../const';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  status: string;
  vendorDetails: {
    email: string;
  };
}

const ViewAllProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/admin/properties`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
        } else {
          setError(data.message || 'Failed to fetch properties.');
        }
      } catch (err) {
        setError('An error occurred while fetching properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Breadcrumb pageName="View All Properties" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            View All Properties
          </h4>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : properties.length === 0 ? (
            <div className="flex items-center justify-center p-10">
              <p className="text-xl font-medium text-gray-500">No Properties Found</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Header */}
              <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-5 text-center">Image</div>
                <div className="p-2.5 xl:p-5 text-center">Title</div>
                <div className="p-2.5 xl:p-5 text-center">City</div>
                <div className="p-2.5 xl:p-5 text-center">Price</div>
                <div className="p-2.5 xl:p-5 text-center">Status</div>
              </div>

              {/* Property rows */}
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="grid grid-cols-5 items-center border-b border-stroke dark:border-strokedark p-2.5 xl:p-5"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-black dark:text-white font-medium">{property.title}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-black dark:text-white">{property.city}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-black dark:text-white font-semibold">${property.price}</p>
                  </div>

                  <div className="text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {property.status}
                    </span>
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

export default ViewAllProperties;
