"use client"
import React from 'react';

type Spec = {
  label: string;
  value: string;
  value2: string;
};

type SpecCardProps = {
  title: string;
  specs: Spec[];
};

const SpecCard: React.FC<SpecCardProps> = ({ title, specs }) => {
  return (
    <div className="bg-[#FFFFFF0D] rounded-[8px] shadow-lg text-white w-full container mx-auto px-0 mb-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-white bg-secondary py-2 rounded-t-[8px] text-center">{title}</h2>

      {/* Specification Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <tbody>
            {specs?.map((spec, index) => (
              <tr key={index} className="text-center">
                <td className="lg:px-4 px-1 py-3 dark:text-white text-black lg:text-[16px] text-[12px]  text-end">{spec?.value || "N/A"}</td>
                <td className="lg:px-4 px-1 py-3 font-medium text-secondary lg:text-[16px] text-[12px] ">{spec?.label || "N/A"}</td>
                <td className="lg:px-4 px-1 py-3 dark:text-white text-black lg:text-[16px] text-start text-[12px] ">{spec?.value2 || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecCard;
