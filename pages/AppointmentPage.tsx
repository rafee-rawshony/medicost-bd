import React from 'react';

const AppointmentPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 200px)'}}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-dark mb-4">Coming Soon!</h1>
        <p className="text-xl text-gray-600">
          Our online appointment booking feature is under construction.
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Please check back later.
        </p>
      </div>
    </div>
  );
};

export default AppointmentPage;
