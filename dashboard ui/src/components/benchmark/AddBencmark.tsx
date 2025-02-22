"use client";

import { useAddBenchmarkMutation, useUpdateBenchMutation } from "@/Redux/Api/benchmarkApi";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  name: string;
}

interface ErrorResponse {
  data?: {
    message?: string;
  };
}

export default function AddBenchmark() {
  const [addBenchmark] = useAddBenchmarkMutation();
  const [updateBenchmark] = useUpdateBenchMutation();
  
  const searchParams = useSearchParams();
  const benchmarkId = searchParams.get("id"); // Get ID from query params
  const benchmarkName = searchParams.get("name") || "";

  const [formData, setFormData] = useState<FormData>({ name: "" });

  const router = useRouter();

  // Populate form data if editing
  useEffect(() => {
    if (benchmarkId) {
      setFormData({ name: benchmarkName });
    }
  }, [benchmarkId, benchmarkName]);

  const handleBenchmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (benchmarkId) {
        // Update existing benchmark
        await updateBenchmark({ id: benchmarkId, data: formData }).unwrap();
        toast.success("Benchmark updated successfully!");
      } else {
        // Add new benchmark
        await addBenchmark(formData).unwrap();
        toast.success("Benchmark added successfully!");
        setFormData({ name: "" }); // Clear form after adding
      }
      router.push("/benchmark"); // Redirect to benchmarks list after submission
    } catch (error: any) {
      const err = error as ErrorResponse;
      toast.error(err?.data?.message || "Failed to save benchmark");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">
        {benchmarkId ? "Edit Benchmark" : "Create Benchmark"}
      </h1>
      <form onSubmit={handleBenchmark}>
        <div className="w-full grid lg:col-span-4 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter benchmark name"
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {benchmarkId ? "Update Benchmark" : "Save Benchmark"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
