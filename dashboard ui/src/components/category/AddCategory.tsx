"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAddcategoryMutation, useEditCategoryMutation } from "@/Redux/Api/categoryApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams",searchParams)

  const categoryId = searchParams.get("id");
  const categoryName = searchParams.get("name") || "";
  const categoryDescription = searchParams.get("description") || "";

  const [addCat] = useAddcategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  console.log(formData);

     // Populate form data if editing
  useEffect(() => {
    if (categoryId) {
      setFormData({ name: categoryName, description: categoryDescription });
    }
  }, [categoryId, categoryName, categoryDescription]);

  const handleCategory = async () => {
    try {
      if (categoryId) {
        // Update existing category
        await editCategory({ categoryId: categoryId, data: formData }).unwrap();
        toast.success("Category updated successfully!");
      }else{
        const response = await addCat({ ...formData }).unwrap();
        toast.success("Category added successfully!");
        setFormData({ name: "", description: "" }); 
      }
      router.push("/category");
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add category"); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  return (
    <div className="text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">
        {categoryId ? "Edit Category" : "Create Category"}
      </h1>

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
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <div className="mt-1 bg-gray-800 rounded-md">
            <input
              id="name"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
             
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={handleCategory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
             {categoryId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
