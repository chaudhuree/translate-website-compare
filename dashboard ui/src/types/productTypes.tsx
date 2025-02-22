export interface Product {
  id: string;
  data: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    rating: number;
    totalRatings: number;
    onlinePurchaseLink: string;
    categoryId: string;
    brandId: string;
    generalDetails: {
      series: string;
      generation: string;
    };
    features: Record<
      string,
      {
        name: string;
        subFeatures: Record<string, string>;
      }
    >;
  }[];
}