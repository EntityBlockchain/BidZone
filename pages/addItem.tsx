import React, { useState } from "react";
import Header from "../components/Header";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";

const AddItem = () => {
    const [preview, setPreview] = useState<string>("");
    const [image, setImage] = useState<File>();
    const router = useRouter();
    const address = useAddress();
    const { contract } = useContract(
        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
        "nft-collection"
    );
    const mintNFT = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!contract || !address) return;
        if (!image) {
            alert("Please Select an Image");
            return;
        }
        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
        };
        const metadata = {
            name: target.name.value,
            description: target.description.value,
            image: image,
        };
        try {
            const tx = await contract.mintTo(address, metadata);
            const receipt = tx.receipt;
            const tokenId = tx.id;
            const nft = await tx.data();
            console.log(receipt, tokenId, nft);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="max-w-6xl mx-auto p-10 border">
                <h1 className="text-2xl font-bold">Create Item to List</h1>
                <h2 className="text-lg font-semibold pt-5">Item Details</h2>
                <p className="pb-5">
                    Listing an item allows you mint an NFT of your item to your
                    wallet where you can then list the NFT for sale.
                </p>
                <div className="flex flex-col justify-center items-center md:flex-row md:space-x-5 pt-10">
                    <Image
                        className="h-52 w-52 object-contain"
                        src={preview || "/EthWallet.png"}
                        height={100}
                        width={100}
                        alt="EthWalletPic"
                    />
                    <form
                        onSubmit={mintNFT}
                        className="flex flex-col flex-1 p-2 space-y-2"
                    >
                        <label className="font-light">Name of Item</label>
                        <input
                            className="formField"
                            placeholder="Name of Item..."
                            type="text"
                            name="name"
                            id="name"
                        />
                        <label className="font-light">Description</label>
                        <input
                            className="formField"
                            placeholder="Describe the item..."
                            type="text"
                            name="description"
                            id="description"
                        />
                        <label className="font-light">Item Image</label>
                        <input
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setPreview(
                                        URL.createObjectURL(e.target.files?.[0])
                                    );
                                    setImage(e.target.files?.[0]);
                                }
                            }}
                            className="pb-10"
                            placeholder="Describe the item..."
                            type="file"
                        />
                        <button
                            type="submit"
                            className="connectWalletButton w-56 mx-auto mt-5 md:mt-auto md:ml-auto py-2"
                        >
                            Add/Mint
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddItem;
