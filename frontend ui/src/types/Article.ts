export interface ArticleProps {
  article: {
    id: string;
    image?: string;
    title: string;
    author: {
      name: string;
    };
    createdAt: string;
    description: string;
  };
}

// types.ts
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // Change this type if the icon is not a string
  createdAt: string;
  updatedAt: string;
  image: string; // Add this line
}

export interface CategoriesResponse {
  data: Category[];
  isLoading: boolean;
}

