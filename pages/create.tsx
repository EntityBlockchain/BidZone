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
import toast from "react-hot-toast";

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
        const loadToast = toast.loading("Creating Listing...");
        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            toast.error("Wrong Network Detected. Please Change to Mumbai.", {
                id: loadToast,
            });
            return;
        }
        if (!selectedNFT) {
            toast.error("Error: No NFT Selected");
            return;
        }
        const target = e.target as typeof e.target & {
            elements: {
                listingType: { value: string };
                price: { value: string };
            };
        };

        if (!target.elements.listingType.value) {
            toast.error("Please Pick a Listing Type.", { id: loadToast });
            return;
        }

        if (!target.elements.price.value) {
            toast.error("Please Enter a Selling Price.", { id: loadToast });
            return;
        }
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
                    onSuccess() {
                        toast.success(
                            "Success! Your Direct Listing is now created.",
                            { id: loadToast }
                        );
                        router.push("/");
                    },
                    onError() {
                        toast.error(
                            "Error! Please check your inputs and try again..",
                            { id: loadToast }
                        );
                        return;
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
                    onSuccess() {
                        toast.success(
                            "Success! Your Auction Listing is now created.",
                            { id: loadToast }
                        );
                        router.push("/");
                    },
                    onError() {
                        toast.error(
                            "Error! Please check your inputs and try again..",
                            { id: loadToast }
                        );
                        return;
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
                <hr className="mb-5" />
                <p className="text-sm text-gray-300">
                    Connect your wallet and all of your available NFT's will
                    display below:
                </p>
                <div className="flex overflow-x-scroll space-x-2 p-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-purple-900">
                    {!address && (
                        <div className="text-red-500">
                            Please connect your wallet to view your collection.
                        </div>
                    )}
                    {ownedNFTs?.data?.map((nft) => (
                        <div
                            className={`flex flex-col cursor-pointer card min-w-fit select-none gap-y-3 ${
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
                <p className="text-xs text-center text-gray-300 mt-1">
                    Click an NFT to show Listing Options.
                </p>
                {selectedNFT && (
                    <form onSubmit={createListing}>
                        <div className="mt-5 border border-gray-500 rounded-md bg-gradient-to-br from-white/10 to-transparent flex flex-col p-10">
                            <div className="grid grid-cols-2 gap-5">
                                <label className="flex items-center pr-10 border-r ml-auto font-light">
                                    Direct Listing
                                </label>
                                <input
                                    className="mr-auto h-7 w-7 cursor-pointer"
                                    type="radio"
                                    name="listingType"
                                    value="directListing"
                                />
                                <label className="flex items-center pr-10 border-r ml-auto font-light">
                                    Auction
                                </label>
                                <input
                                    className="mr-auto h-7 w-7 cursor-pointer"
                                    type="radio"
                                    name="listingType"
                                    value="auctionListing"
                                />
                                <label className="flex items-center pr-10 border-r ml-auto font-light">
                                    Price
                                </label>
                                <input
                                    className="text-black p-2 rounded-md max-w-xs"
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
                            <p className="text-[11px] text-center text-gray-300 mt-3">
                                Listing/Auction Duration = 1 Week
                            </p>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Create;
