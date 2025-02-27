import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../const";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode?: string;
  contactNumber: string;
  email: string;
  role: string;
  vandorId: string;
  profilePic: string;
}

const ApproveVendorProfile: React.FC = () => {
  const [approveVendorProfile, setApproveVendorProfile] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // To toggle action menu

  useEffect(() => {
    fetchApproveVendorProfile();
  }, []);

  const fetchApproveVendorProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pendingApprovals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setApproveVendorProfile(data.data);
      } else {
        setError(data.message || "Failed to fetch ApproveVendorProfile.");
      }
    } catch (err) {
      setError("An error occurred while fetching ApproveVendorProfile.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, profileActivation: "1" | "2") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/approveVendor/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileActivation }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Vendor ${profileActivation === "1" ? "Approved" : "Deleted"} Successfully`);
        fetchApproveVendorProfile(); // Refresh the list
      } else {
        alert(data.message || "Failed to perform action.");
      }
    } catch (err) {
      alert("An error occurred while performing the action.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default">
          <h4 className="mb-6 text-xl font-semibold">All Approve Vendor Profile</h4>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : approveVendorProfile.length === 0 ? (
            <div className="flex items-center justify-center p-10">
              <p className="text-xl font-medium text-gray-500">No vendor profile found for approval</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Header */}
              <div className="grid grid-cols-4 sm:grid-cols-6 bg-gray-100">
                <div className="p-2.5">Profile Image</div>
                <div className="p-2.5 text-center">First Name</div>
                <div className="p-2.5 text-center">Last Name</div>
                <div className="hidden sm:block p-2.5 text-center">Contact Number</div>
                <div className="hidden sm:block p-2.5 text-center">Email</div>
                <div className="p-2.5 text-center">Actions</div>
              </div>

              {/* User rows */}
              {approveVendorProfile.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-4 sm:grid-cols-6 border-b border-gray-200 p-2.5"
                >
                  {/* Profile Image */}
                  <div className="flex items-center gap-3">
                    <img src={user.profilePic} alt={user.firstName} className="w-10 h-10 rounded-full" />
                  </div>

                  {/* First Name */}
                  <div className="flex items-center justify-center">{user.firstName}</div>

                  {/* Last Name */}
                  <div className="flex items-center justify-center">{user.lastName}</div>

                  {/* Contact Number */}
                  <div className="hidden sm:flex items-center justify-center">
                    {user.countryCode} {user.contactNumber}
                  </div>

                  {/* Email */}
                  <div className="hidden sm:flex items-center justify-center">{user.email}</div>

                  {/* Actions */}
                  <div className="relative flex items-center justify-center">
                    {/* 3-Dots Button */}
                    <button
                      className="p-2 rounded-full hover:bg-gray-200"
                      onClick={() => setActiveMenu(activeMenu === user._id ? null : user._id)}
                    >
                      ⋮
                    </button>

                    {/* Dropdown Actions */}
                    {activeMenu === user._id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border">
                        <button
                          className="block w-full px-4 py-2 text-left text-green-600 hover:bg-gray-100"
                          onClick={() => {
                            handleAction(user.vandorId, "1");
                            setActiveMenu(null);
                          }}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            handleAction(user.vandorId, "2");
                            setActiveMenu(null);
                          }}
                        >
                          ❌ Delete
                        </button>
                      </div>
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

export default ApproveVendorProfile;
