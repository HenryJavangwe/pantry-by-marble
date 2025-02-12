export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
}

export enum ProductCategory {
  Meat = "Meat",
  Vegetable = "Vegetable",
  Bakery = "Bakery",
  Snacks = "Snacks",
  Beverage = "Beverage",
}

export enum ProductSubCategory {
  
  Beef = "Beef",
  Fish = "Fish",
  Poutry = "Poutry",
  Pork = "Pork",
}
