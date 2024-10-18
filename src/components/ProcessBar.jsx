import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Step 1", icon: ( // Checkmark icon
      <svg
        className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-black"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>
    )},
    { id: 2, label: "Step 2", icon: ( // User icon
      <svg
        className="w-4 h-4 text-white lg:w-5 lg:h-5 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 16"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Z" />
      </svg>
    )},
    { id: 3, label: "Step 3", icon: ( // Check icon
      <svg
        className="w-4 h-4 text-white lg:w-5 lg:h-5 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
      </svg>
    )}
  ];

  // Default icon for inactive steps
  const inactiveIcon = (
    <svg
      className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  return (
    <div className="flex justify-center mb-8">
      <ol className="flex items-center justify-between w-full max-w-xl">
        {steps.map((step, index) => (
          <li key={step.id} className="flex w-full items-center">
            {/* Step icon */}
            <span
              className={`flex items-center justify-center w-10 h-10 ${
                currentStep >= step.id
                  ? "bg-purple-600 dark:bg-purple-600"
                  : "bg-gray-100 dark:bg-gray-700"
              } rounded-full lg:h-12 lg:w-12 shrink-0`}
            >
              {currentStep >= step.id ? step.icon : inactiveIcon}
            </span>
            {/* Line between steps */}
            {index !== steps.length - 1 && (
              <div
                className={`w-full h-1 ${
                  currentStep > step.id
                    ? "bg-purple-600 dark:bg-blue-800"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
