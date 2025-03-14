import React, { useState, useEffect } from "react";
import StaffService from "../../services/StaffService";
import { Grid, Table, Edit, Trash2, Plus } from "lucide-react";
 
interface Staff {
    staffID: number;
    firstName: string;
    lastName: string;
    role?: string;
    phoneNumber?: string;
    email?: string;
    department?: string;
    hire_date: string;
  }

const ViewAllStaff: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
 
  useEffect(() => {
    StaffService.getAllStaff()
      .then(response => {
        setStaff(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
  const [staffData, setStaffData] = useState<Staff>({
    "staffID": 0,
    "firstName": "",
    "lastName": "",
    "role": "",
    "phoneNumber": "",
    "email": "",  
    "department": "",  
    "hire_date": ""
  });
 
  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setStaffData(staff);
  };
 
  const handleDelete = (staffID: number) => {
    console.log(`Delete staff with ID: ${staffID}`);
    StaffService.deleteStaff(staffID);
    window.location.reload();
  };
 
  const closeModal = () => {
    setSelectedStaff(null);
    setIsAddModalOpen(false);
  };
 
  const handleRegisterChange = (e: { target: { name: any; value: any; }; }) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };
 
  const handleUpdateChange = (e: { target: { name: any; value: any; }; }) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };
 
  const handleUpdateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    StaffService.updateStaff(staffData, staffData.staffID);
    console.log("Update Form submitted");
    closeModal();
    window.location.reload();
  };
 
  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(staffData)
    StaffService.registerStaff(staffData);
    console.log("Register Form submitted");
    closeModal();
    window.location.reload();
  };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Staff</h1>
      <div className="flex justify-end mb-4">
        <button
          className={"mr-2 text-green-700"}
          onClick={() => setIsAddModalOpen(true)}>
          <Plus size={24} />
        </button>
        <button
          className={`mr-2 ${viewMode === "table" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("table")}>
          <Table size={24} />
        </button>
        <button
          className={`${viewMode === "card" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("card")}>
          <Grid size={24} className="mr-2" />
        </button>
      </div>
      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-orange-200 rounded-t-lg">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Hire Date</th>
                <th className="py-2 px-4 border-b rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(staffMember => (
                <tr key={staffMember.staffID} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{staffMember.staffID}</td>
                  <td className="py-2 px-4 border-b">{staffMember.firstName}</td>
                  <td className="py-2 px-4 border-b">{staffMember.lastName}</td>
                  <td className="py-2 px-4 border-b">{staffMember.role || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{staffMember.phoneNumber || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{staffMember.email || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{staffMember.department || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{new Date(staffMember.hire_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleEdit(staffMember)}>
                      <Edit size={24} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(staffMember.staffID)}>
                      <Trash2 size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(staffMember => (
            <div key={staffMember.staffID} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{staffMember.firstName} {staffMember.lastName}</h2>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(staffMember)}>
                    <Edit size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(staffMember.staffID)}>
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
              <p><strong>ID:</strong> {staffMember.staffID}</p>
              <p><strong>Role:</strong> {staffMember.role || 'N/A'}</p>
              <p><strong>Phone:</strong> {staffMember.phoneNumber || 'N/A'}</p>
              <p><strong>Email:</strong> {staffMember.email || 'N/A'}</p>
              <p><strong>Department:</strong> {staffMember.department || 'N/A'}</p>
              <p><strong>Hire Date:</strong> {new Date(staffMember.hire_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
 
      {selectedStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Staff</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.firstName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.lastName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    name="role"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.role}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PhoneNumber</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.phoneNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.department}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">HireDate</label>
                  <input
                    type="text"
                    name="hire_date"
                    onChange={handleUpdateChange}
                    defaultValue={selectedStaff.hire_date}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                {/* Add other fields as necessary */}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={closeModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Submit
                </button>
              </div>
              {/* Add submit button and other form elements */}
            </form>
          </div>
        </div>
       
      )}
     
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Staff</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    name="role"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hire_date</label>
                  <input
                    type="text"
                    name="hire_date"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"/>
                </div>
               
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={closeModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
   
     
    </div>
  );
};
 
export default ViewAllStaff;