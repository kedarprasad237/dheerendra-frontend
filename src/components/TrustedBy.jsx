const TrustedBy = () => {
  const companies = [
    "Microsoft",
    "Google",
    "Amazon",
    "IBM",
    "Oracle",
    "Salesforce"
  ];

  const stats = [
    {
      number: "50+",
      label: "Partner Companies"
    },
    {
      number: "10,000+",
      label: "Learners Trained"
    },
    {
      number: "95%",
      label: "Success Rate"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by 50+ companies and thousands of learners worldwide
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join professionals from leading organizations who have advanced their careers with VMSS
          </p>
        </div>

        {/* Company Logos */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 sm:p-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-gray-400 font-semibold text-sm sm:text-base">
                  {company}
                </span>
              </div>
            ))}
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg sm:text-xl text-gray-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

