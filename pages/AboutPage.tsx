import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-6 text-center">About MediCost</h1>
        <div className="text-lg text-gray-700 space-y-4">
            <p>
                Navigating healthcare costs in Bangladesh can be a challenging and opaque process. 
                <span className="font-semibold text-primary-dark"> MediCost</span> was created to bring clarity and transparency to this process, empowering patients to make informed decisions about their medical expenses.
            </p>
            <p>
                Our mission is simple: to provide an easy-to-use platform where users can estimate the potential costs of doctor consultations and medical tests at various leading hospitals across the country. By selecting a hospital, a specific doctor, and necessary tests, you can get a comprehensive budget estimate for your visit instantly.
            </p>
            <p>
                We believe that financial preparedness is a crucial part of healthcare planning. With MediCost, you can plan your budget ahead of time, reducing financial stress and allowing you to focus on what matters most – your health.
            </p>
            <p className="pt-4 font-semibold text-gray-600">
                This tool is for estimation purposes only. Actual costs may vary.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
