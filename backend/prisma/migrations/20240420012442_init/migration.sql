-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "sku" VARCHAR(10) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "large_description" VARCHAR(500) NOT NULL,
    "price" REAL NOT NULL,
    "discount_price" REAL,
    "discount_percent" INTEGER,
    "is_new" BOOLEAN,
    "image_link" VARCHAR(250),
    "other_image_link" VARCHAR(1000),
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image_link" VARCHAR(250),
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
