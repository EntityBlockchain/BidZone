import React, { useState } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineCreateNewFolder, MdOutlineSell } from "react-icons/md";
import Image from "next/image";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
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
                            className="connectWalletButton text-xs md:text-sm"
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
                    <Link href="/create">
                        <MdOutlineSell className="h-7 w-7 rounded-full p-[2px] shadow-purple-500/50 shadow-md hover:scale-90 duration-300 hover:shadow-purple-300 cursor-pointer" />
                    </Link>
                    <Link href="/mint">
                        <MdOutlineCreateNewFolder className="h-7 w-7 rounded-full p-[2px] shadow-purple-500/50 shadow-md hover:scale-90 hover:shadow-purple-300 duration-300 cursor-pointer" />
                    </Link>
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
                <div className="flex items-center space-x-2 px-2 md:px-5 py-2 flex-1 bg-white rounded-md">
                    <AiOutlineSearch className="text-gray-400 bg-white" />
                    <input
                        className="flex-1 outline-none text-black"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchQuery(e.target.value)}
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
            <section className="flex py-3 space-x-6 text-sm md:text-sm whitespace-nowrap px-6 justify-center">
                <Link href="/">
                    <p className="filterLinks">Home</p>
                </Link>
                <Link href="/mint">
                    <p className="filterLinks">Mint</p>
                </Link>
                <Link href="/create">
                    <p className="filterLinks">Sell</p>
                </Link>
            </section>
        </div>
    );
};

export default Header;
