import React, { useState } from 'react';
import { Activity, Heart, Thermometer, TrendingUp, LineChart, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VitalsMonitor: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Mock data for vitals
  const mockVitals = {
    heartRate: {
      current: 72,
      min: 65,
      max: 85,
      unit: 'bpm',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * (85 - 65) + 65)),
    },
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      unit: 'mmHg',
      data: Array.from({ length: 24 }, () => ({
        systolic: Math.floor(Math.random() * (130 - 110) + 110),
        diastolic: Math.floor(Math.random() * (85 - 75) + 75),
      })),
    },
    temperature: {
      current: 36.8,
      min: 36.5,
      max: 37.2,
      unit: '°C',
      data: Array.from({ length: 24 }, () => Number((Math.random() * (37.2 - 36.5) + 36.5).toFixed(1))),
    },
    oxygenSaturation: {
      current: 98,
      min: 95,
      max: 100,
      unit: '%',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * (100 - 95) + 95)),
    },
  };

  // Generate labels for the time axis
  const labels = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i;
    return `${hour.toString().padStart(2, '0')}:00`;
  }).reverse();

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Chart data for heart rate
  const heartRateData = {
    labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: mockVitals.heartRate.data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for blood pressure
  const bloodPressureData = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: mockVitals.bloodPressure.data.map(d => d.systolic),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Diastolic',
        data: mockVitals.bloodPressure.data.map(d => d.diastolic),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vitals Monitor</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your vital signs and health metrics
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <Clock className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === range
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Vitals Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Heart Rate
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {mockVitals.heartRate.current}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {mockVitals.heartRate.unit}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-gray-500">
                Range: {mockVitals.heartRate.min}-{mockVitals.heartRate.max} {mockVitals.heartRate.unit}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Blood Pressure
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {mockVitals.bloodPressure.systolic}/{mockVitals.bloodPressure.diastolic}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {mockVitals.bloodPressure.unit}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-gray-500">
                Normal range: 90-140/60-90
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Thermometer className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Temperature
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {mockVitals.temperature.current}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {mockVitals.temperature.unit}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-gray-500">
                Range: {mockVitals.temperature.min}-{mockVitals.temperature.max} {mockVitals.temperature.unit}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Oxygen Saturation
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {mockVitals.oxygenSaturation.current}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {mockVitals.oxygenSaturation.unit}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="text-gray-500">
                Range: {mockVitals.oxygenSaturation.min}-{mockVitals.oxygenSaturation.max} {mockVitals.oxygenSaturation.unit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Heart Rate Trend</h3>
          <div className="h-64">
            <Line options={chartOptions} data={heartRateData} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Blood Pressure Trend</h3>
          <div className="h-64">
            <Line options={chartOptions} data={bloodPressureData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsMonitor;