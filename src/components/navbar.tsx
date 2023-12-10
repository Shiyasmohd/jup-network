import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/jup-logo.png"
import Link from "next/link";

export default function Navbar() {

    return (
        <div className="px-4 my-6">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                <Image src={Logo} alt="" className="w-[150px]" />
                <Link href="/my-cases">
                    <p>My Cases</p>
                </Link>
                <ConnectButton />
            </div>
        </div>
    )
}