import React from 'react'

export default function Pricing() {
  // Data for cards
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      button: "Get started",
      features: ["Up to 5 users", "Basic task management", "Limited storage"],
    },
    {
      name: "Team",
      price: "$9.99",
      period: "/month",
      button: "Choose plan",
      features: [
        "Unlimited users",
        "Advanced task management",
        "1TB storage",
        "Priority support",
      ],
    },
    {
      name: "Business",
      price: "$19.99",
      period: "/month",
      button: "Choose plan",
      features: [
        "Unlimited users",
        "Full suite of features",
        "Unlimited storage",
        "Dedicated account manager",
      ],
    },
  ];

  // Data for compare table
  const rows = [
    {
      feature: "Users",
      free: "Up to 5",
      team: "Unlimited",
      business: "Unlimited",
    },
    {
      feature: "Task Management",
      free: "Basic",
      team: "Advanced",
      business: "Full suite",
    },
    {
      feature: "Storage",
      free: "Limited",
      team: "1TB",
      business: "Unlimited",
    },
    {
      feature: "Support",
      free: "Standard",
      team: "Priority",
      business: "Dedicated",
    },
    {
      feature: "Price",
      free: "$0",
      team: "$9.99/month",
      business: "$19.99/month",
    },
  ];

  return (
    <div className='mt-10'>
      {/* Heading */}
      <p className="tracking-tight text-3xl font-bold leading-tight mb-6">
        Choose the right plan for your team
      </p>

      {/* Plans Grid price Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-10">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="flex flex-1 flex-col gap-4 rounded-lg border border-secondary p-6"
          >
            <h1 className="text-base font-bold leading-tight">
              {plan.name}
            </h1>
            <p className="flex items-baseline gap-1">
              <span className="text-4xl font-black leading-tight tracking-[-0.033em]">
                {plan.price}
              </span>
              <span className="text-base font-bold leading-tight">
                {plan.period}
              </span>
            </p>

            <button className="btn btn-gradient">
              {plan.button}
            </button>

            <div className="flex flex-col gap-2">
              {plan.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="font-normal flex gap-3 "
                >
                  <svg className='text-primary'
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Compare Plans Table */}
      <h2 className="text-2xl font-bold pb-3">
        Compare plans
      </h2>
      <div className="mb-20">
        <div className="overflow-x-auto rounded-lg border border-secondary">
          <table className="table w-full">
            <thead>
              <tr className="bg-secondary/50">
                <th className="leading-normal">
                  Feature
                </th>
                <th className="leading-normal">
                  Free
                </th>
                <th className="leading-normal">
                  Team
                </th>
                <th className="leading-normal">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-t border-secondary">
                  <td className="text-sm">
                    {row.feature}
                  </td>
                  <td className="text-primary/80 text-sm">
                    {row.free}
                  </td>
                  <td className="text-primary/80 text-sm">
                    {row.team}
                  </td>
                  <td className="text-primary/80 text-sm">
                    {row.business}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
