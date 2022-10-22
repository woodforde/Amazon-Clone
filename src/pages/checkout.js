import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.stripe_public_key); // public keys only loaded in next js config

function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session } = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        // Call the backend to create a checkout session
        const checkoutSession = await axios.post(`/api/create-checkout-session`, 
        {
            items: items,
            email: session.user.email,
        });

        // Redirect to stripe checkout
        const result  = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) alert(result.error.message);
    }

  return (
    <div className="bg-gray-100">
        <Header />

        <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* Left */}
            <div className="flex-grow m-5 shadow-sm">
                <Image
                    src="https://links.papareact.com/ikj"
                    width={1020}
                    height={250}
                    objectFit="contain"
                />
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">
                        { items.length === 0 ? "Your Amazon Basket is empty" : "Shopping Basket" }
                    </h1>
                    { items.map((item, index) => (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            hasPrime={item.hasPrime}
                        />
                    ))}
                </div>

            </div>

            {/* Right */}
            <div className="flex flex-col bg-white p-10 shadow-md">
            {
                items.length > 0 && (
                <>
                    <h2 className="whitespace-nowrap">
                        Subtotal ({items.length} items): <span className="font-bold"><Currency quantity={total} currency="GBP" /></span>
                    </h2>
                    <button
                        role="link"
                        onClick={createCheckoutSession}
                        disabled={!session} 
                        className={`button mt-2 ${!session && `from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed`}`}
                    >
                        { !session ? "Sign in to checkout" : "Proceed to checkout" }
                    </button>
                </>
                )
            }
            </div>
        </main>
    </div>
  );
}

export default Checkout;