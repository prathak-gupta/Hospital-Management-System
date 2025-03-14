import React, { useState, useEffect } from "react";
import DoctorService from "../../services/DoctorService";
import { Grid, Table, Edit, Trash2, Plus } from "lucide-react";

interface Doctor {
  doctorID: number;
  firstName: string;
  lastName: string;
  specialization?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  qualification?: string;
  yearsOfExperience?: number;
  charges?:number;
  registrationDate: string;
}

const ViewAllDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    DoctorService.getAllDoctors()
      .then(response => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [doctorData, setDoctorData] =useState<Doctor>(
    {
      "doctorID": 0,
      "firstName": "",
      "lastName": "",
      "specialization": "",
      "phoneNumber": "",
      "email": "",
      "department": "",
      "qualification": "",
      "yearsOfExperience": 0,
      "charges": 0,
      "registrationDate": ""
  });
  
  

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDoctorData(doctor); // Prepopulate doctorData with the selected doctor
  };

  const handleDelete = (doctorID: number) => {
    console.log(`Delete doctor with ID: ${doctorID}`);
    DoctorService.deleteDoctor(doctorID);
    // DoctorService.getAllDoctors();
    window.location.reload();
    // alert("Doctor with id "+doctorID+ " deleted..");
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsAddModalOpen(false);
  };


const handleRegisterChange = (e: { target: { name: any; value: any; }; }) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
}

const handleUpdateChange = (e: { target: { name: any; value: any; }; }) => {
    
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
}

const handleUpdateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // fetch("http://localhost:5050/api/doctors/update/10",{
    //     method: 'PUT', // Specify the HTTP method
    //     headers: {
    //       'Content-Type': 'application/json' // Set the content type to JSON
    //     },
    //     body: JSON.stringify(doctorData)});
        DoctorService.updateDoctor(doctorData, doctorData.doctorID);
    // DoctorService.updateDoctor(doctor,1);
    console.log("Update Form submitted");
    closeModal();
    window.location.reload();
    // DoctorService.getAllDoctors();
  };

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();


        // fetch("http://localhost:5050/api/doctors/register",{
        //     method: 'POST', // Specify the HTTP method
        //     headers: {
        //       'Content-Type': 'application/json' // Set the content type to JSON
        //     },
        //     body: JSON.stringify(doctorData)});
            DoctorService.registerDoctor(doctorData);
    // DoctorService.registerDoctor(doctor);
    console.log("Register Form submitted");
    closeModal();
    window.location.reload();
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <div className="flex justify-end mb-4">
        <button
          className={"mr-2  text-green-700"}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={24} />
        </button>
        <button
          className={`mr-2 ${viewMode === "table" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("table")}
        >
          <Table size={24} />
        </button>
        <button
          className={`${viewMode === "card" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setViewMode("card")}
        >
          <Grid size={24} className="mr-2" />
        </button>
      </div>
      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-primary-200 rounded-t-lg">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Specialization</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Qualification</th>
                <th className="py-2 px-4 border-b">Experience</th>
                <th className="py-2 px-4 border-b">Charges</th>
                <th className="py-2 px-4 border-b">Registration Date</th>
                <th className="py-2 px-4 border-b rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.doctorID} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{doctor.doctorID}</td>
                  <td className="py-2 px-4 border-b">{doctor.firstName}</td>
                  <td className="py-2 px-4 border-b">{doctor.lastName}</td>
                  <td className="py-2 px-4 border-b">{doctor.specialization || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{doctor.phoneNumber || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{doctor.email || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{doctor.department || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{doctor.qualification || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{doctor.yearsOfExperience || 'N/A'} years</td>
                  <td className="py-2 px-4 border-b">Rs. {doctor.charges || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{new Date(doctor.registrationDate).toLocaleDateString()|| 'N/A'}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleEdit(doctor)}
                    >
                      <Edit size={24} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(doctor.doctorID)}
                    >
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
          {doctors.map(doctor => (
            <div key={doctor.doctorID} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{doctor.firstName} {doctor.lastName}</h2>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(doctor)}
                  >
                    <Edit size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(doctor.doctorID)}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
              <p><strong>ID:</strong> {doctor.doctorID}</p>
              <p><strong>Specialization:</strong> {doctor.specialization || 'N/A'}</p>
              <p><strong>Phone:</strong> {doctor.phoneNumber || 'N/A'}</p>
              <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
              <p><strong>Department:</strong> {doctor.department || 'N/A'}</p>
              <p><strong>Qualification:</strong> {doctor.qualification || 'N/A'}</p>
              <p><strong>Experience:</strong> {doctor.yearsOfExperience || 'N/A'} years</p>
              <p><strong>Experience:</strong> Rs. {doctor.charges || 'N/A'}</p>
              <p><strong>Registration Date:</strong> {new Date(doctor.registrationDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Doctor</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.firstName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.lastName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.specialization}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.phoneNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.department}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.qualification}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.yearsOfExperience}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Charges</label>
                  <input
                    type="text"
                    name="charges"
                    onChange={handleUpdateChange}
                    defaultValue={selectedDoctor.charges}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-boldmb-4">Add Doctor</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Charges</label>
                  <input
                    type="number"
                    name="charges"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
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

export default ViewAllDoctors;
