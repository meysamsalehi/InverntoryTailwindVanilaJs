const categories = [
  {
    id: 1,
    title: "فرانت اند",
    description: "برنامه نویسی تحت وب",
    createdAt: "2021-11-01T15:47:00.889Z",
  },
  {
    id: 2,
    title: "بک اند",
    description: "برنامه نویسی تحت وب",
    createdAt: "2021-10-01T15:47:00.889Z",
  },
];

const products = [
  {
    id: 1,
    title: "ریکت",
    category: "فرانت اند",
    createdAt: "2021-10-01T15:47:00",
  },
  { id: 2, title: "ویو", category: "بک اند", createdAt: "2021-11-01T15:47:00" },
  {
    id: 3,
    title: "آنگولار",
    category: "فرانت اند",
    createdAt: "2021-12-01T15:47:00",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return sortedCategories;
  }

  static savedCategories(categoryToSave) {
    const savedCategories = Storage.getAllCategories();

    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);

    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });

    return sortedProducts;
  }

  static savedProducts(productsToSave) {
    const savedProducts = Storage.getAllProducts();

    const existedItem = savedProducts.find((c) => c.id === productsToSave.id);

    if (existedItem) {
      existedItem.title = productsToSave.title;
      existedItem.category = productsToSave.category;
      existedItem.quantity = productsToSave.quantity;
    } else {
      productsToSave.id = new Date().getTime();
      productsToSave.createdAt = new Date().toISOString();
      savedProducts.push(productsToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id != parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
