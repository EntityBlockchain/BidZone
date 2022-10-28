import Head from "next/head";
import Image from "next/image";

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>W3B Auctions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-red-500">Hello</h1>
        </div>
    );
};

export default Home;
