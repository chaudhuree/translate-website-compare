"use client";
import React from "react";
import { useSelector } from "react-redux";
import SpecCard from "./SpeceCard";

// Define types for the specs and features
interface ProductFeatures {
  [key: string]: { [key: string]: string }; // Key is category, value is specs within that category
}

interface Product {
  id: string;
  name: string;
  image: string;
  features: ProductFeatures; // features contain categories like CPU, Memory, etc.
}

interface ComparisonData {
  product1: Product;
  product2: Product;
}

// Define types for spec information
interface Spec {
  label: string;
  value: string;
  value2: string;
}

// Function to compare and filter specs for each category dynamically
const getCommonSpecs = (
  product1: Product,
  product2: Product,
  category: string
): Spec[] => {
  const specs: Spec[] = [];

  // Access the correct category specs (either CPU or memory or others)
  const product1Specs = product1.features[category] || {};
  const product2Specs = product2.features[category] || {};

  // Filter out common specs between the two products
  for (const [key, value] of Object.entries(product1Specs)) {
    if (product2Specs[key] && value === product2Specs[key]) {
      specs.push({
        label: key.replace(/([A-Z])/g, " $1").toUpperCase(), // Formatting the label (e.g., "baseClock" -> "BASE CLOCK")
        value: value || "N/A",
        value2: product2Specs[key] || "N/A",
      });
    }
  }
  return specs;
};

const CompareGPU = () => {
  // Get comparison data from Redux store with correct types
  const comparisonData = useSelector(
    (state: { compare: { compareDetails: ComparisonData } }) =>
      state.compare.compareDetails
  );

  if (!comparisonData || !comparisonData.product1 || !comparisonData.product2) {
    return <div>Loading...</div>;
  }

  const { product1, product2 } = comparisonData;

  // Get all possible category keys (like CPU, Memory, etc.)
  const categories = Object.keys(product1.features);

  return (
    <div className="p-6">
      {categories.map((category, index) => {
        // Get common specs for the current category
        const commonSpecs = getCommonSpecs(product1, product2, category);

        // If there are common specs for this category, render a SpecCard
        if (commonSpecs.length > 0) {
          return (
            <SpecCard
              key={index}
              title={category.toUpperCase()}
              specs={commonSpecs}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default CompareGPU;
