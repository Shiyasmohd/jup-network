import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {

    return (
        <div className="px-4 my-6">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                <p>Logo</p>
                <ConnectButton />
            </div>
        </div>
    )
}