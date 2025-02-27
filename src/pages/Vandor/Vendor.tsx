import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { API_BASE_URL } from "../../const";

interface Seller {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode?: string;
  contactNumber: string;
  email: string;
  role: string;
  profilePic: string;
  profileActivation: "0" | "1" | "2"; // Explicit typing
  createdAt: string;
}

const Vendor: React.FC = () => {
  const [vendors, setVendors] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Track active dropdown

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await fetch(`${API_BASE_URL}/api/admin/vendors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch Vendors.");

        setVendors(data.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching Vendors.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const updateVendorStatus = async (vendorId: string, status: "0" | "1" | "2") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch(
        `${API_BASE_URL}/api/admin/adminVandorStatus/${vendorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profileActivation: status }),
        }
      );

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Action failed.");

      setVendors((prev) =>
        prev.filter((vendor) => (status === "2" ? vendor._id !== vendorId : vendor))
          .map((vendor) => (vendor._id === vendorId ? { ...vendor, profileActivation: status } : vendor))
      );
      setActiveDropdown(null); // Close dropdown after action
    } catch (err: any) {
      alert(err.message || "An error occurred while updating vendor status.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Vendor Management" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">All Vendors</h4>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : vendors.length === 0 ? (
            <div className="flex items-center justify-center p-10">
              <p className="text-xl font-medium text-gray-500">No Vendors Found</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                <div className="p-2.5 xl:p-5">Profile</div>
                <div className="p-2.5 text-center xl:p-5">Name</div>
                <div className="p-2.5 text-center xl:p-5">Contact</div>
                <div className="p-2.5 text-center xl:p-5">Status</div>
                <div className="p-2.5 text-center xl:p-5">Actions</div>
              </div>
              {vendors.map((seller) => (
                <div key={seller._id} className="grid grid-cols-5 sm:grid-cols-6 items-center border-b border-stroke dark:border-strokedark relative">
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <img src={seller.profilePic} alt={seller.firstName} className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="text-center p-2.5 xl:p-5">{seller.firstName} {seller.lastName}</div>
                  <div className="text-center p-2.5 xl:p-5">{seller.countryCode} {seller.contactNumber}</div>
                  <div className="text-center p-2.5 xl:p-5">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      seller.profileActivation === "1" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}>
                      {seller.profileActivation === "1" ? "Active" : "Deactivated"}
                    </span>
                  </div>
                  <div className="text-center p-2.5 xl:p-5 relative">
                    <button
                      className="px-3 py-1 bg-gray-300 rounded-md"
                      onClick={() => setActiveDropdown(activeDropdown === seller._id ? null : seller._id)}
                    >
                      ⋮
                    </button>
                    {activeDropdown === seller._id && (
                      <ul className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md z-10">
                        {seller.profileActivation === "1" ? (
                          <>
                            <li>
                              <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                onClick={() => updateVendorStatus(seller._id, "0")}
                              >
                                Deactivate
                              </button>
                            </li>
                            <li>
                              <button
                                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                                onClick={() => updateVendorStatus(seller._id, "2")}
                              >
                                Delete
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                onClick={() => updateVendorStatus(seller._id, "1")}
                              >
                                Activate
                              </button>
                            </li>
                            <li>
                              <button
                                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                                onClick={() => updateVendorStatus(seller._id, "2")}
                              >
                                Delete
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    )}
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

export default Vendor;
