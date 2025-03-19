import React, { useState, useEffect } from "react";
import PatientService from "../../services/PatientService";
import { Grid, Table, Edit, Trash2, Plus } from "lucide-react";
import { User } from "../../types";
import AppointmentService from "../../services/Appointment";
 
interface Patient {
  patientID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  registration_date: string;
}
 
const MyPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
 
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    let user: User;
    if (userStr) {
      user = JSON.parse(userStr);
    }
    AppointmentService.getPatientsByDoctor(user.id)
      .then(response => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const [patientData, setPatientData] =useState<Patient>( {
      "patientID": 0,
      "firstName":"",
      "lastName": "",
      "dateOfBirth": "",
      "gender": "",
      "address": "",  
      "phoneNumber": "",  
      "email": "",
      "emergencyContactName": "",
      "emergencyContactPhone": "",
      "registration_date":" "  
      });
  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientData(patient);
  };
 
  const handleDelete = (patientID: number) => {
    console.log(`Delete patient with ID: ${patientID}`);
    PatientService.deletePatient(patientID);
    //PatientService.getAllPatients();
    window.location.reload();
    //alert("Doctor with id "+doctorID+ " deleted..");
  };
 
  const closeModal = () => {
    setSelectedPatient(null);
    setIsAddModalOpen(false);
  };
  const handleRegisterChange=(e: { target: { name: any; value: any; }; }) => {
      setPatientData({...patientData, [e.target.name]: e.target.value });
    }
    const handleUpdateChange =(e: { target: {name: any; value: any; }; }) => {
      setPatientData({...patientData, [e.target.name]: e.target.value });
    }
    const handleUpdateSubmit =(event: React.FormEvent) => {
      event.preventDefault();
      // fetch("http://localhost:5050/api/doctors/update/10", {
      //method: 'PUT', // Specify the HTTP method
      // // headers: {
       //'Content-Type': 'application/json' // Set the content type to JSON
       // //},
       //body: JSON.stringify(doctorData)});
       PatientService.updatePatient(patientData, patientData.patientID);
       // DoctorService.updateDoctor (doctor, 1);
       console.log("Update Form submitted");
       closeModal();
       window.location.reload();
       // DoctorService.getAllDoctors();
    };
    const handleRegisterSubmit =(event: React.FormEvent) => {
      event.preventDefault();
       // fetch("http://localhost:5050/api/doctors/register", {
       // //method: 'POST', // Specify the HTTP method
       // headers: {
      //'Content-Type': 'application/json' // Set the content type to JSON
      //},
      //body: JSON.stringify(doctorData)});
      PatientService.registerPatient(patientData);
      // DoctorService.updateDoctor (doctor, 1);
      console.log("Register Form submitted");
      closeModal();
      window.location.reload();
      // DoctorService.getAllDoctors();
    };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>
      <div className="flex justify-end mb-4">
        <button
          className={"mr-2 text-green-700"}
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
            <thead className="bg-secondary-200 rounded-t-lg">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Date of Birth</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Emergency Contact Name</th>
                <th className="py-2 px-4 border-b">Emergency Contact Phone</th>
                <th className="py-2 px-4 border-b">Registration Date</th>
                <th className="py-2 px-4 border-b rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.patientID} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{patient.patientID}</td>
                  <td className="py-2 px-4 border-b">{patient.firstName}</td>
                  <td className="py-2 px-4 border-b">{patient.lastName}</td>
                  <td className="py-2 px-4 border-b">{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{patient.gender || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{patient.address || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{patient.phoneNumber || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{patient.email || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{patient.emergencyContactName || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{patient.emergencyContactPhone || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{new Date(patient.registration_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleEdit(patient)}
                    >
                      <Edit size={24} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(patient.patientID)}
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
          {patients.map(patient => (
            <div key={patient.patientID} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{patient.firstName} {patient.lastName}</h2>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(patient)}
                  >
                    <Edit size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(patient.patientID)}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
              <p><strong>ID:</strong> {patient.patientID}</p>
              <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {patient.gender || 'N/A'}</p>
              <p><strong>Address:</strong> {patient.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {patient.phoneNumber || 'N/A'}</p>
              <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
              <p><strong>Emergency Contact Name:</strong> {patient.emergencyContactName || 'N/A'}</p>
              <p><strong>Emergency Contact Phone:</strong> {patient.emergencyContactPhone || 'N/A'}</p>
              <p><strong>Registration Date:</strong> {new Date(patient.registration_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.firstName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.lastName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.dateOfBirth}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.gender}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.address}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.phoneNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.emergencyContactName}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                  <input
                    type="text"
                    name="emergencyContactPhone"
                    onChange={handleUpdateChange}
                    defaultValue={selectedPatient.emergencyContactPhone}
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
            <h2 className="text-2xl font-bold mb-4">Add Patient</h2>
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
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
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
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                  <input
                    type="text"
                    name="emergencyContactPhone"
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
 
export default MyPatients;