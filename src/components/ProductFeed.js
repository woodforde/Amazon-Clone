import React from 'react';
import Product from './Product';

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense mx-auto
        md:grid-cols-2 md:-mt-52
        lg:grid-cols-3 
        xl:grid-cols-4"
    >
        { products
            .slice(0, 4)
            .map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={Math.floor(rating.rate)}
                />
            ))
        }

        <img
            className="md:col-span-full"
            src="https://links.papareact.com/dyz"
            alt=""
        />

        <div className="md:col-span-2">
            { products
                .slice(4, 5)
                .map(({ id, title, price, description, category, image, rating }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        rating={Math.floor(rating.rate)}
                    />
                ))
            }
        </div>

        { products
            .slice(5)
            .map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={Math.floor(rating.rate)}
                />
            ))
        }
    </div>
  );
}

export default ProductFeed;