import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import {
    MediaRenderer,
    useContract,
    useListing,
    useNetwork,
    useNetworkMismatch,
    useMakeBid,
    useOffers,
    useMakeOffer,
    useBuyNow,
    useAddress,
} from "@thirdweb-dev/react";
import PulseLoader from "react-spinners/PulseLoader";
import { BiUserCheck } from "react-icons/bi";
import { ListingType } from "@thirdweb-dev/sdk";
import Countdown from "react-countdown";
import network from "../../utils/network";

const ListingPage = () => {
    const [minimumBid, setMinimumBid] = useState<{
        displayValue: string;
        symbol: string;
    }>();
    const [bidAmount, setBidAmount] = useState<string>();
    const router = useRouter();
    const { listingId } = router.query as { listingId: string };
    const [, switchNetwork] = useNetwork();
    const networkMismatch = useNetworkMismatch();
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );
    const { mutate: buyNow } = useBuyNow(contract);
    const { data: listing, isLoading, error } = useListing(contract, listingId);

    useEffect(() => {
        if (!listingId || !contract || !listing) return;
        if (listing.type === ListingType.Auction) {
            fetchMinBid();
        }
    }, [listingId, listing, contract]);

    const fetchMinBid = async () => {
        if (!listing || !contract) return;
        const { displayValue, symbol } =
            await contract.auction.getMinimumNextBid(listingId);
        setMinimumBid({
            displayValue: displayValue,
            symbol: symbol,
        });
    };

    const formatPlaceholder = () => {
        if (!listing) return;
        if (listing.type === ListingType.Direct) {
            return "Enter Offer Amount";
        }
        if (listing.type === ListingType.Auction) {
            return Number(minimumBid?.displayValue) === 0
                ? "Enter Bid Amount"
                : `${minimumBid?.displayValue} ${minimumBid?.symbol} or greater`;
        }
    };

    const buyNFT = async () => {
        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            return;
        }

        if (!listingId || !contract || !listing) return;

        await buyNow(
            {
                id: listingId,
                buyAmount: 1,
                type: listing.type,
            },
            {
                onSuccess(data, variables, context) {
                    console.log("SUCCESS", data);
                    router.replace("/");
                },
                onError(error, variables, context) {
                    alert("Error: NFT Txn Cancelled");
                    console.log("Error", error, variables, context);
                },
            }
        );
    };

    const createBidorOffer = async () => {
        try {
            if (networkMismatch) {
                switchNetwork && switchNetwork(network);
                return;
            }
            //Direct Listing
            if (listing?.type === ListingType.Direct) {
            }

            if (listing?.type === ListingType.Auction) {
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading)
        return (
            <div className="bg-black min-h-screen text-white text-center">
                <Header />
                <PulseLoader color="purple" size={12} />
            </div>
        );

    if (!listing) {
        return <div>Listing Not Found</div>;
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="max-w-6xl mx-auto p-2 flex flex-col lg:flex-row lg:mx-0 space-y-10 space-x-5 pr-10">
                <div className="p-10 border mx-auto max-w-md lg:max-w-xl">
                    <MediaRenderer src={listing.asset.image} />
                </div>
                <section className="flex-1 space-y-5 pb-20 lg:pb-0">
                    <div>
                        <h1 className="text-xl font-bold">
                            {listing.asset.name}
                        </h1>
                        <p className="mb-6 text-sm text-gray-300">
                            {listing.asset.description}
                        </p>
                        <p className="flex items-center text-xs sm:text-base">
                            <BiUserCheck className="h-7 w-7" />
                            <span className="font-bold px-2">Seller:</span>
                            {listing.sellerAddress}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 items-center py-2">
                        <p className="font-bold">Listing Type:</p>
                        <p>
                            {listing.type === ListingType.Direct
                                ? "Direct Listing"
                                : "Auction Listing"}
                        </p>
                        <p className="font-bold">Buyout Price:</p>
                        <p className="text-xl font-bold">
                            {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                            {listing.buyoutCurrencyValuePerToken.symbol}
                        </p>
                        <button
                            onClick={buyNFT}
                            className="connectWalletButton col-start-2 mt-5 w-44"
                        >
                            Buy Now
                        </button>
                    </div>
                    {/*Direct, show offers*/}
                    <div className="grid grid-cols-2 space-y-2 items-center justify-end">
                        <hr className="col-span-2" />
                        <p className="col-span-2 text-lg font-bold pb-2">
                            {listing.type === ListingType.Direct
                                ? "Make an Offer"
                                : "Place a Bid"}
                        </p>
                        {listing.type === ListingType.Auction && (
                            <>
                                <p>Minimum Bid:</p>
                                <p className="font-bold">
                                    {minimumBid?.displayValue}{" "}
                                    {minimumBid?.symbol}
                                </p>

                                <p>Time Remaining:</p>
                                <Countdown
                                    date={
                                        Number(
                                            listing.endTimeInEpochSeconds.toString()
                                        ) * 1000
                                    }
                                />
                            </>
                        )}
                        <input
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="border p-2 rounded-lg mr-5 text-black"
                            type="text"
                            placeholder={formatPlaceholder()}
                        />
                        <button
                            onClick={createBidorOffer}
                            className="connectWalletButton w-44"
                        >
                            {listing.type === ListingType.Direct
                                ? "Offer"
                                : "Bid"}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ListingPage;
