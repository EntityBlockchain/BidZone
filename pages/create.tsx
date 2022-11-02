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
import { NFT } from "@thirdweb-dev/sdk";

const Create = () => {
    const [selectedNFT, setSelectedNFT] = useState<NFT>();
    const address = useAddress();
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );
    const { contract: collectionContract } = useContract(
        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
        "nft-collection"
    );
    const ownedNFTs = useOwnedNFTs(collectionContract, address);
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
                <div className="flex overflow-x-scroll space-x-2 p-4">
                    {ownedNFTs?.data?.map((nft) => (
                        <div
                            className={`flex flex-col card min-w-fit select-none ${
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
                    <form>
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
                            </div>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Create;
