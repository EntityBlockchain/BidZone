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
                    <p className="headerLinks">Deals</p>
                    <p className="headerLinks">Contact</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <p className="headerLinks">Ship to</p>
                    <p className="headerLinks">Sell</p>
                    <p className="headerLinks">Watchlist</p>

                    <Link className="link" href="/addItem">
                        List Item
                    </Link>
                    <AiOutlineBell className="h-6 w-6" />
                    <BsCart2 className="h-6 w-6" />
                </div>
            </nav>
            <hr className="mt-2" />
            <section className="flex items-center space-x-2 py-3">
                <div className="h-16 w-16 sm:w-20 md:w-28 cursor-pointer flex-shrink-0">
                    <Link href="/">
                        <Image
                            className="h-full w-full object-contain"
                            alt="W3B Logo"
                            src="/W3BLogo.png"
                            width={100}
                            height={100}
                        />
                    </Link>
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

                <button className="hidden sm:inline px-4 md:px-8 py-2 border">
                    Search
                </button>

                <Link href="/create">
                    <button className="hidden sm:inline px-4 md:px-8 py-2 border">
                        List Item
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default Header;
