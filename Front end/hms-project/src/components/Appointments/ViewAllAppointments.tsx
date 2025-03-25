import React, { useState, useEffect } from "react";
import AppointmentService from "../../services/Appointment";
import { Grid, Table, Edit, Trash2, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Appointment {
  appointmentID: number;
  patientID: number;
  doctorID: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'checkup' | 'follow-up' | 'consultation' | 'emergency';
  reason: string;
  registrationTime: string;
}

const ViewAllAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const {user} = useAuth();

  useEffect(() => {
    if(user?.role==="admin"){
    AppointmentService.getAllAppointments()
      .then(response => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }else if(user?.role ==="doctor")
    {
      AppointmentService.getAppointmentsByDoctor(user.id)
      .then(response => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
}, []);

  const [appointmentData, setAppointmentData] = useState<Appointment>({
    appointmentID: 0,
    patientID: 0,
    doctorID: 0,
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: 'checkup',
    reason: "",
    registrationTime: "",
  });

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentData(appointment);
  };

  const handleDelete = (appointmentID: number) => {
    console.log(`Delete appointment with ID: ${appointmentID}`);
    AppointmentService.deleteAppointment(appointmentID);
    window.location.reload();
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsAddModalOpen(false);
    setErrors([]);
  };

  const handleRegisterChange = (e: { target: { name: any; value: any; }; }) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e: { target: { name: any; value: any; }; }) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };
  
  const validateForm = (): string[] => {
    const errorsList: string[] = [];
    if (!appointmentData.patientID) errorsList.push("Patient ID is required.");
    if (!appointmentData.doctorID) errorsList.push("Doctor ID is required.");
    if (!appointmentData.appointmentDate.trim()) errorsList.push("Appointment date is required.");
    if (!appointmentData.appointmentTime.trim()) errorsList.push("Appointment time is required.");
    if (!appointmentData.reason.trim()) errorsList.push("Reason is required.");
    return errorsList;
  };
  
  const handleUpdateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(appointmentData);
    appointmentData.patientID = parseInt(appointmentData.patientID);
    AppointmentService.updateAppointment(appointmentData, appointmentData.appointmentID);
    console.log("Update Form submitted");
    closeModal();
    // window.location.reload();
  };

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    appointmentData.patientID = parseInt(appointmentData.patientID);
    appointmentData.doctorID = parseInt(appointmentData.doctorID);
    console.log(appointmentData);
    AppointmentService.createAppointment(appointmentData);
    console.log("Register Form submitted");
    closeModal();
    // window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
      <div className="flex justify-end mb-4">
        <button
          className={"mr-2 text-green-500"}
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
            <thead className="bg-purple-200 rounded-t-lg">
              <tr>
                <th className="py-2 px-4 border-b">Appointment ID</th>
                <th className="py-2 px-4 border-b">Patient ID</th>
                <th className="py-2 px-4 border-b">Doctor ID</th>
                <th className="py-2 px-4 border-b">Appointment Date</th>
                <th className="py-2 px-4 border-b">Appointment Time</th>
                <th className="py-2 px-4 border-b">Appointment Type</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointmentID} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{appointment.appointmentID}</td>
                  <td className="py-2 px-4 border-b">{appointment.patientID}</td>
                  <td className="py-2 px-4 border-b">{appointment.doctorID}</td>
                  <td className="py-2 px-4 border-b">{appointment.appointmentDate}</td>
                  <td className="py-2 px-4 border-b">{appointment.appointmentTime}</td>
                  <td className="py-2 px-4 border-b">{appointment.appointmentType}</td>
                  <td className="py-2 px-4 border-b">{appointment.reason}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleEdit(appointment)}
                    >
                      <Edit size={24} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(appointment.appointmentID)}
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
          {appointments.map(appointment => (
            <div key={appointment.appointmentID} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Appointment ID: {appointment.appointmentID}</h2>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(appointment)}
                  >
                    <Edit size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(appointment.appointmentID)}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
              <p><strong>Patient ID:</strong> {appointment.patientID}</p>
              <p><strong>Doctor ID:</strong> {appointment.doctorID}</p>
              <p><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Appointment Type:</strong> {appointment.appointmentType}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Appointment</h2>
            {errors.length > 0 && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

<form onSubmit={handleUpdateSubmit}>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Patient ID</label>
      <input
        type="number"
        name="patientID"
        onChange={handleUpdateChange}
        defaultValue={selectedAppointment?.patientID}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
      <input
        type="number"
        name="doctorID"
        onChange={handleUpdateChange}
        defaultValue={selectedAppointment?.doctorID}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
      <input
        type="date"
        name="appointmentDate"
        onChange={handleUpdateChange}
        defaultValue={selectedAppointment?.appointmentDate}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
      <input
        type="time"
        name="appointmentTime"
        step="1" // This ensures the time is in HH:MM:SS format
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
      <select
        name="appointmentType"
        onChange={handleUpdateChange}
        defaultValue={selectedAppointment?.appointmentType}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      >
        <option value='checkup'>Checkup</option>
        <option value='follow-up'>Follow-up</option>
        <option value='consultation'>Consultation</option>
        <option value='emergency'>Emergency</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Reason</label>
      <input
        type="text"
        name="reason"
        onChange={handleUpdateChange}
        defaultValue={selectedAppointment?.reason}
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
            <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
            {errors.length > 0 && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <form onSubmit={handleRegisterSubmit}>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Patient ID</label>
      <input
        type="number"
        name="patientID"
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
      <input
        type="number"
        name="doctorID"
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
      <input
        type="date"
        name="appointmentDate"
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
      <input
        type="time"
        name="appointmentTime"
        step="1" // This ensures the time is in HH:MM:SS format
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
      <select
        name="appointmentType"
        onChange={handleRegisterChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      >
        <option value='checkup'>Checkup</option>
        <option value='follow-up'>Follow-up</option>
        <option value='consultation'>Consultation</option>
        <option value='emergency'>Emergency</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Reason</label>
      <input
        type="text"
        name="reason"
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

export default ViewAllAppointments;
