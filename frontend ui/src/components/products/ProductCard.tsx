"use client"
import React from 'react';

type Spec = {
  label: string;
  value: string | number;
};

type SpecCardProps = {
  title: string;
  description: string;
  specs: Spec[];
};

const ProductCard: React.FC<SpecCardProps> = ({ title, description, specs }) => {
  console.log("Specifications:", title,description);

  // Ensure only the first 5 key features are displayed
  const keyFeatures = specs.slice(0, 10);

  return (
    <div className="bg-[#FFFFFF0D] rounded-[8px] shadow-lg dark:text-white w-full container mx-auto px-0 mb-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center text-white  bg-secondary py-2 rounded-t-[8px]  px-4">
        {title}
      </h2>
      
      {/* Description */}
      <p className="py-4 px-4 dark:text-white text-black">{description}</p>

      {/* Specification Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <tbody>
            {keyFeatures.map((spec, index) => (
              <tr key={index} className="">
                <td className="px-4 py-3 font-medium dark:text-white text-black">{spec.label}</td>
                <td className="px-4 py-3 dark:text-white text-black">
                  {typeof spec.value === "object" ? (
                    // If value is an object, iterate over it
                    Object.entries(spec.value).map(([key, val], idx) => (
                      <div key={idx}>
                        <strong>{key}:</strong> {val as React.ReactNode}

                        
                      </div>
                    ))
                  ) : (
                    <div>{spec.value}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>      
  );
};

export default ProductCard;
