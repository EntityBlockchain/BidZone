import React from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";

const Header = () => {
    const connect = useMetamask();
    const disconnect = useDisconnect();
    const address = useAddress();

    return (
        <div className="max-w-6xl mx-auto p-2">
            <nav className="flex justify-between">
                <div className="flex items-center space-x-2 text-sm">
                    {address ? (
                        <button
                            onClick={disconnect}
                            className="connectWalletButton"
                        >
                            Connected:{" "}
                            {address.slice(0, 5) + "..." + address.slice(-4)}
                        </button>
                    ) : (
                        <button
                            onClick={connect}
                            className="connectWalletButton"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <p className="headerLinks">About</p>
                    <Link href="/create">
                        <p className="headerLinks">List Item</p>
                    </Link>
                    <Link className="link font-bold" href="/mint">
                        Mint Item
                    </Link>
                    <AiOutlineBell className="h-6 w-6" />
                    <BsCart2 className="h-6 w-6" />
                </div>
            </nav>
            <hr className="mt-2" />
            <section className="flex items-center space-x-2 py-3">
                <div className="flex relative h-16 w-16 sm:w-20 md:w-28 cursor-pointer flex-shrink-0">
                    <Link href="/">
                        <Image
                            className="h-full w-full object-contain"
                            alt="W3B Logo"
                            src="/W3BLogo.png"
                            width={100}
                            height={100}
                        />
                    </Link>
                    <p className="hidden md:inline absolute top-12 text-xs font-bold uppercase text-purple-400 tracking-[6px] pl-1">
                        Auctions
                    </p>
                </div>
                <button className="hidden lg:flex flex-row items-center w-20 space-x-2">
                    <p className="text-gray-300 text-sm">Categories</p>
                    <BiChevronDown className="h-6 w-6 flex-shrink-0 pr-3" />
                </button>

                <div className="flex items-center space-x-2 px-2 md:px-5 py-2 flex-1 bg-white rounded-md">
                    <AiOutlineSearch className="text-gray-400 bg-white" />
                    <input
                        className="flex-1 outline-none text-black"
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                <button className="rounded-md hidden sm:inline px-4 md:px-8 py-2 bg-white/20 hover:bg-white/30 duration-500">
                    Search
                </button>

                <Link href="/create">
                    <button className="rounded-md hidden sm:inline px-4 md:px-8 py-2 bg-purple-900/50 hover:bg-purple-900/60 duration-500">
                        List Item
                    </button>
                </Link>
            </section>
            <hr />
            <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap px-6 justify-center">
                <p className="filterLinks">Home</p>
                <p className="filterLinks">Tech</p>
                <p className="filterLinks">Games</p>
                <p className="filterLinks">NFT</p>
                <p className="filterLinks">Music</p>
                <p className="filterLinks">Other</p>
            </section>
        </div>
    );
};

export default Header;
