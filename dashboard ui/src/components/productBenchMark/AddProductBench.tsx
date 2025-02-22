"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import {
  useAddProdcutBenchMutation,
  useDeleteProdcutBenchMutation,
  useEditProdcutBenchMutation,
  useProdcutBenchQuery,
} from "@/Redux/Api/productBenchApi";
import { useBenchmarkQuery } from "@/Redux/Api/benchmarkApi";
import Link from "next/link";

export default function AddProductBench() {
  const router = useRouter();
  const productIdd = useParams(); // Get productId from URL
  const productId = productIdd?.id;

  const [addProBench] = useAddProdcutBenchMutation();
  const [editProBench] = useEditProdcutBenchMutation();
  const [deleteProBench] = useDeleteProdcutBenchMutation();

  const { data: productBenchmarks, isLoading } =
    useProdcutBenchQuery(productId);
  const { data: benchmarkData } = useBenchmarkQuery({});
  const benchmarks = benchmarkData?.data || [];
  console.log(productBenchmarks?.data);

  const [formData, setFormData] = useState({
    benchmarkId: "", // Added this field
    score: "",
    maxScore: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleProductBench = async () => {
    try {
      if (editingId) {
        await editProBench({
          productId,
          data: { ...formData, benchmarkId: editingId },
        }).unwrap();
        toast.success("Product Bench updated successfully!");
      } else {
        await addProBench({ productId, ...formData }).unwrap();
        toast.success("Product Bench added successfully!");
      }

      setFormData({ benchmarkId: "", score: "", maxScore: "" });
      setEditingId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save Product Bench");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (benchmark: any) => {
    console.log("dlfkjJ", benchmark?.benchmark?.id);
    setFormData({
      benchmarkId: benchmark?.benchmark?.id,
      score: benchmark.score,
      maxScore: benchmark.maxScore,
    });
    setEditingId(benchmark?.benchmark?.id);
  };

  const handleDelete = async (benchmarkId: string) => {
    try {
      await deleteProBench({ productId, benchmarkId }).unwrap();
      toast.success("Product Bench deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete Product Bench");
    }
  };

  return (
    <div className="text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold mb-6">
        {editingId ? "Edit Product Bench" : "Create Product Bench"}
      </h1>
      <div className="bg-secondary shadow-lg px-4 py-1 rounded-lg lg:mr-10 mr-2 ">
        <Link href='/products'>Back</Link>
      </div>
      </div>

      <div className="w-full grid lg:col-span-4 gap-8">
        <div className="space-y-6">
          {/* Benchmark dropdown only visible when not editing */}
          {!editingId && (
            <div>
              <label
                htmlFor="benchmark"
                className="block text-sm font-medium mb-1"
              >
                Benchmark Name
              </label>
              <select
                id="benchmark"
                name="benchmarkId"
                value={formData.benchmarkId}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a Benchmark
                </option>
                {benchmarks
                  .filter((b: any) => b.name) // Remove empty names
                  .map((benchmark: any) => (
                    <option key={benchmark.id} value={benchmark.id}>
                      {benchmark.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Score</label>
            <input
              id="score"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Score"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Maximum Score
            </label>
            <input
              id="maxScore"
              name="maxScore"
              value={formData.maxScore}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Maximum Score"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={handleProductBench}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Product Benchmarks</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-white border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 border border-gray-700">Benchmark</th>
              <th className="p-2 border border-gray-700">Score</th>
              <th className="p-2 border border-gray-700">Max Score</th>
              <th className="p-2 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productBenchmarks?.data?.map((benchmark: any) => (
              <tr key={benchmark.id} className="bg-gray-900">
                <td className="p-2 border border-gray-700">
                  {benchmark.benchmark.name}
                </td>
                <td className="p-2 border border-gray-700">
                  {benchmark.score}
                </td>
                <td className="p-2 border border-gray-700">
                  {benchmark.maxScore}
                </td>
                <td className="p-2 border border-gray-700">
                  <button
                    onClick={() => handleEdit(benchmark)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(benchmark?.benchmark?.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
