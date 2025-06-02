// const baseUrl = 'https://ecommerce-compass.onrender.com';
const baseUrl = 'http://localhost:3001';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

function getRandomNumber(min, max) {
  const randomNumber = Math.random() * (max - min + 1) + min;
  return Math.floor(randomNumber);
}

class CreateProduct {
  constructor(product) {
    this.trueOrFalse = [true, false];
    this.product = product;
    this.discountPrice;
    this.discountPercent;
    this.category = product.category;
  }

  hasDiscount() {
    const discount = this.trueOrFalse[getRandomNumber(0, 1)];
    if (discount) {
      const price = this.product.price;
      this.discountPercent = getRandomNumber(1, 100);
      const percent = this.discountPercent / 100;
      this.discountPrice = price - percent * price;
    }
  }

  async createCategory() {
    const bodyData = {
      name: this.category.name,
      imageLink: this.category.image,
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyData),
      redirect: 'follow',
    };

    const response = await fetch(`${baseUrl}/category`, requestOptions);
    return response.json();
  }

  createProduct() {
    this.hasDiscount();
    const raw = JSON.stringify({
      name: this.product.title.slice(0, 50),
      sku: 'SS001',
      categoryId: await(this.createCategory()).id,
      price: this.product.price,
      description: this.product.description.slice(0, 250),
      largeDescription: `${this.product.description} \n ${this.product.title}`,
      isNew: this.trueOrFalse[getRandomNumber(0, 1)],
      imageLink: this.product.images[0],
      discountPrice: this.discountPrice,
      discountPercent: this.discountPercent,
      otherImagesLink: this.product.images,
    });
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${baseUrl}/product/register`, requestOptions).catch((error) =>
      console.error(error),
    );
  }
}

async function getProductInformation(number) {
  return fetch(
    `https://fakestoreapi.com/products/${(number + 163).toString()}`,
  ).then((res) => res.json());
}

function createProductsInDb(numProducts) {
  const productPromises = [];

  for (let i = 1; i <= numProducts; i++) {
    const productPromise = getProductInformation(i).then((json) => {
      console.log(json);
      const product = new CreateProduct(json);
      product.createProduct();
    });

    productPromises.push(productPromise);
  }

  return Promise.all(productPromises);
}

createCategoriesInDb();
createProductsInDb(30)
  .then(() => {
    console.log('All requests were concluded');
  })
  .catch((error) => {
    console.error('Somethin is wrong:', error);
  });
