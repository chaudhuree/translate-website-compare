"use client";
import ProductCard from "./ProductCard";


// Define types for product features
interface ProductFeatures {
  [key: string]: {
    Description?: string;
    [key: string]: string | number | undefined;
  };
}

// Define the main Product interface
interface Product {
  features?: ProductFeatures;
}

// Define props for the component
interface ProductDetailsCardProps {
  singeProduct?: Product;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ singeProduct }) => {
  if (!singeProduct?.features) {
    return <p className="text-center text-red-500">No product details available.</p>;
  }

  console.log("single product", singeProduct);

  return (
    <div className="grid  md:grid-cols-2 grid-cols-1 gap-4 ">
      {Object.entries(singeProduct.features).map(([category, details]) => (
        <ProductCard
          key={category}
          title={category.toUpperCase()}
          description={details.Description || "Description not available!"}
          specs={Object.entries(details)
            .filter(([key]) => key.toLowerCase() !== "description") 
            .map(([key, value]) => ({
              label: key
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/^./, (firstLetter) => firstLetter.toUpperCase()),
              value: typeof value === "number" ? value : String(value), 
            }))}
        />
      ))}
    </div>
  );
};

export default ProductDetailsCard;
