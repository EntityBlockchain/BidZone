import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

const Home = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Head>
                <title>W3B Auctions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <h1 className="text-red-500">Hello</h1>
        </div>
    );
};

export default Home;
