import React, { useState } from "react";
import Header from "../components/Header";
import {
    useAddress,
    useContract,
    MediaRenderer,
    useNetwork,
    useNetworkMismatch,
    useOwnedNFTs,
    useCreateAuctionListing,
    useCreateDirectListing,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { NFT, NATIVE_TOKENS, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import network from "../utils/network";
import { AiOutlineConsoleSql } from "react-icons/ai";

const Create = () => {
    const [selectedNFT, setSelectedNFT] = useState<NFT>();
    const address = useAddress();
    const router = useRouter();
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );
    const { contract: collectionContract } = useContract(
        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
        "nft-collection"
    );
    const ownedNFTs = useOwnedNFTs(collectionContract, address);

    const networkMismatch = useNetworkMismatch();

    const [, switchNetwork] = useNetwork();

    const {
        mutate: createDirectListing,
        isLoading,
        error,
    } = useCreateDirectListing(contract);
    const {
        mutate: createAuctionListing,
        isLoading: isLoadingAuction,
        error: errorAuction,
    } = useCreateAuctionListing(contract);

    const createListing = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            return;
        }
        if (!selectedNFT) return;
        const target = e.target as typeof e.target & {
            elements: {
                listingType: { value: string };
                price: { value: string };
            };
        };

        const { listingType, price } = target.elements;
        if (listingType.value === "directListing") {
            createDirectListing(
                {
                    assetContractAddress:
                        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
                    tokenId: selectedNFT.metadata.id,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 Week
                    quantity: 1,
                    buyoutPricePerToken: price.value,
                    startTimestamp: new Date(),
                },
                {
                    onSuccess(data, variables, context) {
                        console.log("Success: ", data, variables, context);
                        router.push("/");
                    },
                    onError(error, variables, context) {
                        console.log("Error: ", error, variables, context);
                    },
                }
            );
        }
        if (listingType.value === "auctionListing") {
            createAuctionListing(
                {
                    assetContractAddress:
                        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
                    tokenId: selectedNFT.metadata.id,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 Week
                    quantity: 1,
                    buyoutPricePerToken: price.value,
                    startTimestamp: new Date(),
                    reservePricePerToken: 0,
                },
                {
                    onSuccess(data, variables, context) {
                        console.log("Success: ", data, variables, context);
                        router.push("/");
                    },
                    onError(error, variables, context) {
                        console.log("Error: ", error, variables, context);
                    },
                }
            );
        }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="max-w-6xl mx-auto p-10 pt-2">
                <h1 className="text-2xl font-bold">List an Item</h1>
                <h2 className="text-lg font-semibold pt-5">
                    Select an item you would like to sell.
                </h2>
                <hr className="mb-5" />
                <p className="text-sm">
                    All of your NFT's that are available to be sold will be
                    shown below.
                </p>
                <div className="flex overflow-x-scroll space-x-2 p-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-purple-900">
                    {ownedNFTs?.data?.map((nft) => (
                        <div
                            className={`flex flex-col cursor-pointer card min-w-fit select-none ${
                                nft.metadata.id === selectedNFT?.metadata.id
                                    ? "border-white shadow-white/50 shadow-lg duration-500"
                                    : "border-transparent"
                            }`}
                            onClick={() => setSelectedNFT(nft)}
                            key={nft.metadata.id}
                        >
                            <MediaRenderer
                                className="h-48 rounded-lg"
                                src={nft.metadata.image}
                            />
                            <p className="text-lg truncate font-bold">
                                {nft.metadata.name}
                            </p>
                            <p className="text-xs truncate">
                                {nft.metadata.description}
                            </p>
                        </div>
                    ))}
                </div>
                {selectedNFT && (
                    <form onSubmit={createListing}>
                        <div className="flex flex-col p-10">
                            <div className="grid grid-cols-2 gap-5">
                                <label className="border-r font-light">
                                    Direct Listing (Fixed Price)
                                </label>
                                <input
                                    className="ml-auto h-7 w-7"
                                    type="radio"
                                    name="listingType"
                                    value="directListing"
                                />
                                <label className="border-r font-light">
                                    Auction
                                </label>
                                <input
                                    className="ml-auto h-7 w-7"
                                    type="radio"
                                    name="listingType"
                                    value="auctionListing"
                                />
                                <label className="border-r font-light">
                                    Price
                                </label>
                                <input
                                    className="text-black p-2"
                                    type="text"
                                    name="price"
                                    placeholder="0.05"
                                />
                            </div>
                            <button
                                type="submit"
                                className="connectWalletButton mt-8 w-44 mx-auto"
                            >
                                Create Listing
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Create;
