import {WidgetItem} from "@/components";
import {Product, products} from "@/products";
import {ItemCard} from "@/shopping-cart";
import {cookies} from "next/headers";

export const metadata = {
    title: 'Products in Cart',
    description: 'All the products in the cart are displayed here.',
};

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: {[id: string]: number}) => {
    const productsInCart: ProductInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find(product => product.id === id);
        if (product) {
            productsInCart.push({
                product,
                quantity: cart[id],
            });
        }
    }

    return productsInCart;
};

export default function CartPage() {
    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {[id: string]: number};
    const productsInCart = getProductsInCart(cart);
    const totalToPay = productsInCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return (
        <div>
            <h1 className="text-5xl">Products in Cart</h1>
            <hr className="mb-2" />
            <div className="flex flex-col sm:flex-row gap-2 w-full" >
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsInCart.map((item) => (
                            <ItemCard key={`${item.product.id}`}{...item} />
                        ))
                    }
                </div>
                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title="Total">
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500">Taxes 15% ${(totalToPay * 0.15).toFixed(2)}</span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}