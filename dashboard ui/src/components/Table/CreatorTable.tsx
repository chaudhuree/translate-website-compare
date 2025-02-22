"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";

import Loader from "../Loader/Loader";
import { useUserStatusUpdateMutation } from "@/Redux/Api/userApi";
import { UserInterFace } from "@/Interfaces/InterFaces";
import ShowToastify from "@/utils/ShowToastify";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const CreatorTable = ({
  creatorData,
  isLoading,
  serial,
}: {
  creatorData: UserInterFace[];
  isLoading: boolean;
  serial: number;
}) => {
  const [updateStatus] = useUserStatusUpdateMutation();

  const handleStatus = async (id: string) => {
    const { error } = await updateStatus({ id });

    if (error) {
      ShowToastify({ error: "Unsuccessful to change creator status" });
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Chip</th>
            <th className="px-4 py-2 border">Memory Type</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Loader className={`w-36`}></Loader>
              </td>
            </tr>
          ) : (
            creatorData?.map((item: UserInterFace, index: number) => (
              <tr
               
                key={index}
                className="border-b text-center text-white"
              >
                <td className="px-4 text-nowrap py-2">{item.name}</td>
                <td className="px-4 text-nowrap py-2">{item.email}</td>
                <td className="px-4 text-nowrap py-2">{item.email}</td>

                <td className="px-4 text-nowrap py-2">
                  <button
                    onClick={() => handleStatus(item?.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleStatus(item?.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <IoEyeOutline className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleStatus(item?.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <RiDeleteBinLine className="text-red-500" />
                  </button>
                </td>

                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorTable;
