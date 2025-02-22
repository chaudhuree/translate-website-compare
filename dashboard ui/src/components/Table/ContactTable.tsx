"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { Contacts } from "../Interfaces/Subscription";

const ContactTable = ({
  contactData,
  isLoading,
}: {
  contactData: Contacts[];
  isLoading: boolean;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#FFFFFF]/10 text-white py-4">
            <th className="py-4 ">Name</th>
            <th className="py-4 ">Email</th>
            <th className="py-4 ">Messages</th>
            <th className="py-4 ">Subject</th>
            <th className="py-4 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <Loader className="w-36" />
              </td>
            </tr>
          ) : (
            contactData?.map((item: Contacts, index: number) => (
              <tr
                key={index}
                className="text-center text-white border-b-[0.5px] border-slate-200 bg-black"
              >
                <td className="py-4">{item.name}</td>
                <td className="py-4">{item.email}</td>
                <td className="py-4">{item.message.slice(0, 20)}...</td>
                <td className="py-4">{item.subject.slice(0, 20)}...</td>
                <td className="py-4">
                  <button
                    onClick={() => setSelectedMessage(item.message)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Show Message
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Full Message */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Full Message</h2>
            <p className="mb-4">{selectedMessage}</p>
            <button
              onClick={() => setSelectedMessage(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ContactTable;
