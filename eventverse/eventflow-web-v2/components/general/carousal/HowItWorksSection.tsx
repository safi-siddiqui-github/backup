"use client";

import { MdEdit, MdShare, MdSettings, MdCheckBox, MdCheck, MdList, MdClose, MdNotifications } from "react-icons/md";

const howItWorksData = [
  {
    title: "For Organizers",
    steps: [
      {
        icon: MdEdit,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdShare,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdSettings,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      }
    ]
  },
  {
    title: "For Attendees",
    steps: [
      {
        icon: MdCheckBox,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdCheck,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdList,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      }
    ]
  },
  {
    title: "For Vendors",
    steps: [
      {
        icon: MdClose,
        title: "Plan Your Events",
        description: "Choose name, date and \n customize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdNotifications,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      },
      {
        icon: MdList,
        title: "Plan Your Events",
        description: "Choose name, date and\ncustomize design.",
        iconColor: "#6F5ACD",
        iconBg: "#F3E8FF",
        iconBorder: "#6F5ACD"
      }
    ]
  }
];

export default function HowItWorksSection() {
  return (
    <section 
      className="py-8 sm:py-16 ml-6 lg:ml-0 px-4 sm:px-6 lg:px-8"
      style={{
        opacity: 1,
        paddingTop: '32px',
        paddingRight: '16px',
        paddingBottom: '32px',
        paddingLeft: '16px',
        backgroundColor: '#EEECEC'
      }}
    >
      <div className="max-w-5xl mx-auto" style={{ gap: '32px' }}>
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4"
            style={{ color: '#6F5ACD' }}
          >
            How It Works
          </h2>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-18">
          {howItWorksData.map((column, columnIndex) => (
            <div key={columnIndex} className="text-center">
              {/* Column Header */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                {column.title}
              </h3>

              {/* Steps */}
              <div className="space-y-4 sm:space-y-6 ml-4 sm:ml-10">
                {column.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-1 sm:gap-2">
                    {/* Icon */}
                    <div
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: step.iconBg,
                          border: `1px solid ${step.iconBorder}`
                        }}
                      >
                        <step.icon 
                          className="h-3 w-3 sm:h-4 sm:w-4" 
                          style={{ color: step.iconColor }}
                        />
                      </div>
                    <div className="flex flex-col items-center">
                      
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                        {step.title}
                      </h4>
                      {/* Description Below Icon */}
                      <div className="mt-1 sm:mt-2 text-center">
                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                          {step.description}
                        </p>
                      </div>
                    </div>

                   
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
