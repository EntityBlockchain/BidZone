import React from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import {
    useActiveListings,
    useContract,
    MediaRenderer,
} from "@thirdweb-dev/react";
import { RiAuctionLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { ListingType } from "@thirdweb-dev/sdk";
import PulseLoader from "react-spinners/PulseLoader";
import Head from "next/head";

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const query: string = String(search).toLowerCase();
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );
    const { data: listings, isLoading: loadingListings } =
        useActiveListings(contract);

    return (
        <div className="bg-black min-h-screen text-white">
            <Head>
                <title>W3B Auctions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <h1 className="text-center text-sm text-gray-300">
                Search Containing: "{query}"
            </h1>
            <main className="max-w-6xl mx-auto p-2">
                {loadingListings ? (
                    <p className="text-center">
                        <PulseLoader color="purple" size={12} />
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
                        {listings
                            ?.filter((listing) =>
                                listing.asset.name
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(`${query}`)
                            )
                            .map((filteredListing) => (
                                <div
                                    onClick={() =>
                                        router.push(
                                            `/listing/${filteredListing.id}`
                                        )
                                    }
                                    className="flex flex-col card hover:scale-105 transition-all duration-300 ease-out h-full cursor-pointer hover:shadow-white/50 hover:shadow-md"
                                    key={filteredListing.id}
                                >
                                    <div className="flex flex-1 flex-col pb-2 items-center">
                                        <MediaRenderer
                                            className="w-44"
                                            src={filteredListing.asset.image}
                                        />
                                    </div>
                                    <div className="pt-2 space-y-4">
                                        <div>
                                            <h2 className="text-md truncate">
                                                {filteredListing.asset.name}
                                            </h2>
                                            <hr />
                                            <p className="truncate text-sm text-gray-500 mt-2">
                                                {
                                                    filteredListing.asset
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <p>
                                            <span className="font-bold mr-1">
                                                {
                                                    filteredListing
                                                        .buyoutCurrencyValuePerToken
                                                        .displayValue
                                                }
                                            </span>
                                            {
                                                filteredListing
                                                    .buyoutCurrencyValuePerToken
                                                    .symbol
                                            }
                                        </p>
                                        <div
                                            className={`flex items-center p-2 space-x-1 justify-end text-xs w-fit ml-auto rounded-lg cursor-pointer ${
                                                filteredListing.type ===
                                                ListingType.Direct
                                                    ? "bg-gradient-to-br from-blue-600 to-gray-900"
                                                    : "bg-gradient-to-br from-orange-600 to-gray-900"
                                            }`}
                                        >
                                            <p>
                                                {filteredListing.type ===
                                                ListingType.Direct
                                                    ? "Buy Now"
                                                    : "Auction"}
                                            </p>
                                            {filteredListing.type ===
                                            ListingType.Direct ? (
                                                <BsCashCoin className="h-4" />
                                            ) : (
                                                <RiAuctionLine className="h-4" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Search;
