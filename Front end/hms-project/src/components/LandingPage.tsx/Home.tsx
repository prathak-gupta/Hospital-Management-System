import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  ClipboardList,
  Clock,
  HeartPulse,
  Phone,
  Stethoscope,
  Users,
  UserCog,
  UserRound,
  UserRoundCog,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

function Home() {
  const [activeConsole, setActiveConsole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return (
          <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-blue-500 hover:text-blue-600 mb-8"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-4xl font-bold mb-8">Our Services</h1>
              <div className="grid md:grid-cols-2 gap-8">
                <ServiceDetailCard
                  title="Emergency Care"
                  description="24/7 emergency medical services with state-of-the-art facilities and experienced staff."
                  features={[
                    "Immediate medical attention",
                    "Advanced life support",
                    "Trauma care",
                    "Critical care units"
                  ]}
                />
                <ServiceDetailCard
                  title="General Medicine"
                  description="Comprehensive medical care for various health conditions and preventive healthcare."
                  features={[
                    "Regular health check-ups",
                    "Chronic disease management",
                    "Preventive care",
                    "Health counseling"
                  ]}
                />
                <ServiceDetailCard
                  title="Specialized Care"
                  description="Expert care in various medical specialties with advanced treatment options."
                  features={[
                    "Cardiology",
                    "Neurology",
                    "Orthopedics",
                    "Oncology"
                  ]}
                />
                <ServiceDetailCard
                  title="Diagnostic Services"
                  description="Advanced diagnostic facilities for accurate and timely diagnosis."
                  features={[
                    "Laboratory tests",
                    "Imaging services",
                    "Pathology",
                    "Health screening"
                  ]}
                />
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-blue-500 hover:text-blue-600 mb-8"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-4xl font-bold mb-8">About MedCare</h1>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Hospital"
                    className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-6">
                    At MedCare, we are committed to providing exceptional healthcare services with 
                    compassion and expertise. Our state-of-the-art facilities and dedicated team 
                    of healthcare professionals work tirelessly to ensure the best possible outcomes 
                    for our patients.
                  </p>
                  <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mt-1 mr-2" />
                      <div>
                        <h3 className="font-bold">Excellence</h3>
                        <p className="text-gray-600">Striving for the highest standards in healthcare delivery</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mt-1 mr-2" />
                      <div>
                        <h3 className="font-bold">Compassion</h3>
                        <p className="text-gray-600">Treating every patient with care and understanding</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mt-1 mr-2" />
                      <div>
                        <h3 className="font-bold">Innovation</h3>
                        <p className="text-gray-600">Embracing advanced medical technologies and practices</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Hero Section */}
            <header className="relative h-screen">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80")',
                }}
              >
                <div className="absolute inset-0 bg-blue-900/70" />
              </div>

              {/* Navigation */}
              <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                  <HeartPulse className="h-8 w-8 text-white" />
                  <span className="text-2xl font-bold text-white">MedCare</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <button onClick={() => setCurrentPage('services')} className="text-white hover:text-blue-200">Services</button>
                  <button onClick={() => setCurrentPage('about')} className="text-white hover:text-blue-200">About</button>
                  <a href="/login" className="text-white hover:text-blue-200">Doctors</a>
                  <a href="/login" className="text-white hover:text-blue-200">Login</a>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
                    Book Appointment
                  </button>
                </div>
              </nav>

              {/* Hero Content */}
              <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                  <h1 className="text-5xl font-bold text-white mb-6">
                    Advanced Healthcare at Your Fingertips
                  </h1>
                  <p className="text-xl text-blue-100 mb-8">
                    Experience world-class healthcare with our state-of-the-art facilities
                    and expert medical professionals.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition">
                      Book an Appointment
                    </button>
                    <button 
                      onClick={() => setCurrentPage('about')}
                      className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard
                    icon={<Stethoscope className="h-8 w-8" />}
                    title="Expert Doctors"
                    description="Access to highly qualified and experienced medical professionals"
                  />
                  <FeatureCard
                    icon={<Clock className="h-8 w-8" />}
                    title="24/7 Service"
                    description="Round-the-clock medical care and emergency services"
                  />
                  <FeatureCard
                    icon={<Building2 className="h-8 w-8" />}
                    title="Modern Facilities"
                    description="State-of-the-art medical equipment and comfortable environments"
                  />
                  <FeatureCard
                    icon={<ClipboardList className="h-8 w-8" />}
                    title="Online Records"
                    description="Easy access to your medical history and test results"
                  />
                </div>
              </div>
            </section>

            {/* User Consoles Section */}
            <section id="consoles" className="py-20 px-6 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Access Your Console</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <ConsoleCard
                    icon={<UserCog className="h-12 w-12" />}
                    title="Admin Console"
                    description="Manage hospital operations, staff, and resources"
                    features={[
                      "Staff Management",
                      "Resource Allocation",
                      "Department Overview",
                      "Analytics Dashboard"
                    ]}
                    active={activeConsole === 'admin'}
                    onClick={() => setActiveConsole('admin')}
                  />
                  <ConsoleCard
                    icon={<UserRoundCog className="h-12 w-12" />}
                    title="Doctor's Console"
                    description="Access patient records and manage appointments"
                    features={[
                      "Patient Records",
                      "Appointment Schedule",
                      "Treatment Plans",
                      "Medical History"
                    ]}
                    active={activeConsole === 'doctor'}
                    onClick={() => setActiveConsole('doctor')}
                  />
                  <ConsoleCard
                    icon={<UserRound className="h-12 w-12" />}
                    title="Patient Console"
                    description="Book appointments and view medical records"
                    features={[
                      "Book Appointments",
                      "View Medical Records",
                      "Prescription History",
                      "Test Results"
                    ]}
                    active={activeConsole === 'patient'}
                    onClick={() => setActiveConsole('patient')}
                  />
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-50 py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <StatCard number="50+" text="Expert Doctors" icon={<Users />} />
                  <StatCard number="1000+" text="Happy Patients" icon={<HeartPulse />} />
                  <StatCard number="24/7" text="Emergency Care" icon={<Phone />} />
                  <StatCard number="100+" text="Daily Appointments" icon={<Calendar />} />
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-12 px-6">
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <HeartPulse className="h-6 w-6" />
                    <span className="text-xl font-bold">MediCare</span>
                  </div>
                  <p className="text-blue-200">
                    Providing quality healthcare services with a focus on patient comfort and recovery.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li><button onClick={() => setCurrentPage('services')} className="hover:text-white">Services</button></li>
                    <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
                    <li><a href="#doctors" className="hover:text-white">Our Doctors</a></li>
                    <li><a href="#consoles" className="hover:text-white">Login</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Services</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>Emergency Care</li>
                    <li>General Medicine</li>
                    <li>Pediatrics</li>
                    <li>Diagnostics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Contact</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>123 Medical Center Drive</li>
                    <li>City, State 12345</li>
                    <li>Phone: (123) 456-7890</li>
                    <li>Email: info@medcare.com</li>
                  </ul>
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface StatCardProps {
  number: string;
  text: string;
  icon: React.ReactNode;
}

function StatCard({ number, text, icon }: StatCardProps) {
  return (
    <div className="p-6">
      <div className="text-blue-500 flex justify-center mb-4">{icon}</div>
      <div className="text-4xl font-bold text-blue-900 mb-2">{number}</div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
}

interface ConsoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  active: boolean;
  onClick: () => void;
}

function ConsoleCard({ icon, title, description, features, active, onClick }: ConsoleCardProps) {
  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg transition cursor-pointer ${
        active ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Access Console
      </button>
    </div>
  );
}

interface ServiceDetailCardProps {
  title: string;
  description: string;
  features: string[];
}

function ServiceDetailCard({ title, description, features }: ServiceDetailCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;