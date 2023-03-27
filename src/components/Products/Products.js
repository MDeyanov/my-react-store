import React from "react";
import { ProductItem } from "./ProductItem/ProductItem";

export const Products = ({
    products,
}) => {
    return (
        <section id="products-page">
            <h1>All Products</h1>

            {products.map(x =>
                <ProductItem key={x._id} {...x} />
            )}

            {products.length === 0 && (
                <h3 className="no-products">No products yet</h3>
            )}
        </section>
    );
}