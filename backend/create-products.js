// const baseUrl = 'https://ecommerce-compass.onrender.com';
const baseUrl = 'https://ecommerce-compass.onrender.com';
const startId = 360;

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
    console.log('chamou');
    const bodyData = {
      name: this.category.name,
      imageLink: this.category.image,
    };
    console.log(bodyData);
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyData),
      redirect: 'follow',
    };

    const response = await fetch(
      `${baseUrl}/category/register`,
      requestOptions,
    );

    if (response?.status === 500) {
      console.log(`${baseUrl}/category/search?name=${this.category.name}`);
      const response = await fetch(
        `${baseUrl}/category/search?name=${this.category.name}`,
        {
          method: 'GET',
        },
      );

      return response.json();
    }

    return response.json();
  }

  async createProduct() {
    this.hasDiscount();
    const createdCategory = await this.createCategory();
    console.log('\n category: ', createdCategory);
    const productData = JSON.stringify({
      name: this.product.title.slice(0, 50),
      sku: 'SS001',
      categoryId: createdCategory.id,
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
      body: productData,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `${baseUrl}/product/register`,
        requestOptions,
      );
      const data = await response.json();
      console.log('Product created:', data);
      // console.log('Product created:', productData);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
}

async function getProductInformation(number) {
  return fetch(
    `https://api.escuelajs.co/api/v1/products/${(number + startId).toString()}`,
  ).then((res) => res.json());
}

function createProductsInDb(numProducts) {
  const productPromises = [];

  for (let i = 1; i <= numProducts; i++) {
    const productPromise = getProductInformation(i).then(async (json) => {
      const product = new CreateProduct(json);
      await product.createProduct();
    });

    productPromises.push(productPromise);
  }

  return Promise.all(productPromises);
}

createProductsInDb(50)
  .then(() => {
    console.log('All requests were concluded');
  })
  .catch((error) => {
    console.error('Somethin is wrong:', error);
  });

// for (let i = 0; i <= 20; i++) {
//   getProductInformation(i);
// }
