"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import deleteImage from "@/assests/delete.png";

import { useCategoryQuery } from "@/Redux/Api/categoryApi";
import {
  useAddProductMutation,
  useProductsQuery,
  useUpdateProductMutation,
} from "@/Redux/Api/ProductApi";
import { useUploadMutation } from "@/Redux/Api/uploadApi";
import { toast } from "react-toastify";
import { useBrandsQuery } from "@/Redux/Api/brandApi";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/productTypes";


export default function AddCpuProduct() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("");
  const router = useRouter();

  const { data: categoryData, isLoading } = useCategoryQuery({});
  const { data: brandData } = useBrandsQuery({});

  const [addProduct] = useAddProductMutation();
  const [upload] = useUploadMutation();
  const [updateProductFn] = useUpdateProductMutation();

  interface Feature {
    input1: string;
    subfeatures: { subinput1: string; subinput2: string }[];
  }

  // Form state to capture product details
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    onlinePurchaseLink: "",
    categoryId: "",
    brandId: "",
    generalDetails: { series: "", generation: "" },
    features: [] as Feature[], // Features will be an array of objects
  });

  // Handle feature input changes
  // Handle subfeature changes dynamically
  const handleFeatureChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedFeatures = [...formData.features];
    if (name === "input1") {
      updatedFeatures[index].input1 = value;
    }
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // handle edit funtionality
  const { data: products } = useProductsQuery({});
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const product = products?.data?.find(
    (p: Product["data"][0]) => p.id === productId
  );
  console.log("prduct", product);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        rating: product.rating.toString(),
        onlinePurchaseLink: product.onlinePurchaseLink,
        categoryId: product.categoryId,
        brandId: product.brandId,
        generalDetails: product.generalDetails,
        features: Object.keys(product.features).map((key) => ({
          input1: key, // This is the feature name
          subfeatures: Object.entries(product.features[key]).map(
            ([subKey, subValue]) => ({
              subinput1: subKey, // This is the subfeature name
              subinput2: String(subValue), // The subfeature value
            })
          ),
        })),
      });
      setImagePreview(product.image);
      setImageName(product.image);
    }
  }, [product]);

  const handleSubfeatureChange = (
    featureIndex: number,
    subfeatureIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedFeatures = [...formData.features];
    const key = name as "subinput1" | "subinput2";
    updatedFeatures[featureIndex].subfeatures[subfeatureIndex][key] = value;
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Add a feature with no subfeatures initially
  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { input1: "", subfeatures: [] }, // A feature with one input field and no subfeatures
      ],
    }));
  };

  // Add a subfeature (two input fields) to a specific feature
  const handleAddSubfeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index].subfeatures.push({ subinput1: "", subinput2: "" });
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Handle general input changes (non-feature fields)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle description change in the editor
  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }
  
    setImagePreview(URL.createObjectURL(file));
  
    const formDataImage = new FormData();
    formDataImage.append("file", file);
  
    try {
      const response = await upload(formDataImage).unwrap();
      console.log("Upload Response:", response); // Debugging
  
      const imageUrl = response?.data?.url;
      
      if (imageUrl) {
        setImageName(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
  
        // Force re-render before showing toast
        setTimeout(() => {
          toast.success("Image uploaded successfully!");
        }, 100);
      } else {
        toast.error("No image URL provided in the response.");
      }
    } catch (error: any) {
      console.error("Upload Error:", error); // Debugging
      toast.error(error?.data?.message || "Failed to upload image");
    }
  };
  

  // Handle form submission (sending data)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    if (!formData.name) {
      toast.error("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return false;
    }
    if (!formData.categoryId) {
      toast.error("Category is required");
      return false;
    }
    if (!formData.brandId) {
      toast.error("Brand is required");
      return false;
    }
    if (!formData.description) {
      toast.error("Description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const transformedData = {
        name: formData.name,
        image: imageName,
        description: formData.description,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating) || 0,
        totalRatings: 0,
        onlinePurchaseLink: formData.onlinePurchaseLink,
        categoryId: formData.categoryId,
        brandId: formData.brandId,
        generalDetails: formData.generalDetails,
        features: formData.features.reduce((acc: any, feature: Feature) => {
          // Directly map the features based on their input1 name and its subfeatures
          acc[feature.input1] = feature.subfeatures.reduce(
            (subAcc: any, subfeature: any) => {
              // Map each subfeature to key-value pairs
              subAcc[subfeature.subinput1] = subfeature.subinput2;
              return subAcc;
            },
            {}
          );
          return acc;
        }, {}),
      };

      if (productId) {
        await updateProductFn({ id: productId, data: transformedData });
        toast.success("Product updated successfully");
      } else {
        const response = await addProduct(transformedData).unwrap();
        toast.success("Product added successfully!");
      }

      router.push("/products");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        rating: "",
        onlinePurchaseLink: "",
        categoryId: "",
        brandId: "",
        generalDetails: { series: "", generation: "" },
        features: [],
      });
      setImagePreview(null);
      setImageName("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Delete a feature
  const handleDeleteFeature = (featureIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, index) => index !== featureIndex),
    }));
  };

  // Delete a subfeature
  const handleDeleteSubfeature = (
    featureIndex: number,
    subfeatureIndex: number
  ) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[featureIndex].subfeatures = updatedFeatures[
      featureIndex
    ].subfeatures.filter((_, index) => index !== subfeatureIndex);
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Cancel the image upload
  const handleCancelImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
  };
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, brandId: e.target.value }));
  };

  return (
    <div className="text-white p-6">
      {productId ? (
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      ) : (
        <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium">Product Image</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg aspect-square flex flex-col items-center justify-center bg-[#0B1120] relative">
              {imagePreview ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
                >
                  Select
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                ref={fileInputRef}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Rating
              </label>
              <input
                id="name"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Online Purchase Link
              </label>
              <input
                id="onlinePurchaseLink"
                name="onlinePurchaseLink"
                value={formData.onlinePurchaseLink}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium mb-1"
              >
                Select Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleCategoryChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categoryData?.data.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="brandId"
                className="block text-sm font-medium mb-1"
              >
                Select Brand
              </label>
              <select
                id="brandId"
                name="brandId"
                value={formData.brandId}
                onChange={handleBrandChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a brand</option>
                {brandData?.data.map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                id="onlinePurchaseLink"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="399.99"
              />
            </div>

            <div className="    p-4 bg-black/90 rounded">
              <p className="text-white text-lg py-2 font-semibold">Features</p>

              {formData.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="mb-6 border-dashed rounded p-2 border border-gray-500 pb-4"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="input1"
                      value={feature.input1}
                      onChange={(e) => handleFeatureChange(featureIndex, e)}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                      placeholder="Feature Input"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteFeature(featureIndex)}
                      className="px-3 py-1 bg-white/5 rounded-lg"
                    >
                      <Image
                        src={deleteImage}
                        alt="Delete"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddSubfeature(featureIndex)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Subfeature
                  </button>

                  {feature.subfeatures.map((subfeature, subfeatureIndex) => (
                    <div
                      key={subfeatureIndex}
                      className="grid grid-cols-2 gap-3 mt-3 rounded-md"
                    >
                      <div>
                        <input
                          type="text"
                          name="subinput1"
                          value={subfeature.subinput1}
                          onChange={(e) =>
                            handleSubfeatureChange(
                              featureIndex,
                              subfeatureIndex,
                              e
                            )
                          }
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                          placeholder="Subfeature Name"
                        />
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          name="subinput2"
                          value={subfeature.subinput2}
                          onChange={(e) =>
                            handleSubfeatureChange(
                              featureIndex,
                              subfeatureIndex,
                              e
                            )
                          }
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                          placeholder="Subfeature Value"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteSubfeature(
                              featureIndex,
                              subfeatureIndex
                            )
                          }
                          className="px-3 py-1 bg-white/5 rounded-lg"
                        >
                          <Image
                            src={deleteImage}
                            alt="Delete"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Feature
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {productId ? "Edit Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
