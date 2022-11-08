import React from "react";
import Header from "../components/Header";

const About = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="max-w-6xl mx-auto rounded-md border-gray-500 border bg-gradient-to-br from-white/10 to-transparent p-2 md:p-10">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-center mb-1">
                        About W3B Auctions
                    </h1>
                    <hr className="mx-5 pb-8" />
                    <p className="text-sm pl-5">Created By: Brody McFarland</p>
                    <p className="text-sm pl-5">
                        <a
                            className="text-purple-500 hover:underline duration-500"
                            href="https://github.com/brodyamcfarland/W3B-Auctions"
                            target="_blank"
                        >
                            Github Code
                        </a>
                    </p>
                    <p className="pt-3 pl-5 font-bold underline">
                        Social Links
                    </p>
                    <p className="text-sm pl-5">
                        <a
                            className="text-purple-500 hover:underline duration-500"
                            href="https://github.com/brodyamcfarland"
                            target="_blank"
                        >
                            Github
                        </a>
                    </p>
                    <p className="text-sm pl-5">
                        <a
                            className="text-purple-500 hover:underline duration-500"
                            href="https://twitter.com/off2eth"
                            target="_blank"
                        >
                            Twitter
                        </a>
                    </p>
                    <p className="text-sm pl-5">
                        <a
                            className="text-purple-500 hover:underline duration-500"
                            href="https://brodyamcfarland.github.io/BrodyMcFarland"
                            target="_blank"
                        >
                            Website
                        </a>
                    </p>
                    <p className="py-3 pl-5 font-bold underline">Built With:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 items-center text-sm pl-5">
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            NextJS 13
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            React
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            Tailwind
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            ThirdWeb
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            Typescript
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            EthersJS
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            Polygon Mumbai Testnet
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            React-Spinners
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            React-Hot-Toast
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            React-Icons
                        </p>
                        <p className="text-gray-200 border border-transparent hover:border-white duration-500 hover:bg-white/10 px-1">
                            React-Countdown
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
