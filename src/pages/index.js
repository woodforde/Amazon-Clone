import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={ products } />
      </main>
    </div>
  );
}

// For NextJS Server-Side Rendering
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json());
  
  return {
    props: {
      products,
      session,
    }
  }
}