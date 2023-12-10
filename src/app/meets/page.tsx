"use client"
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { Badge, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure, Input, useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { MeetBuf, get50Words } from "@/lib/helper";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import Link from "next/link";
import { RoomDetails } from "../room/page";
import { createNode, scheduleMeetMessage } from "@/lib/waku";
import { DecodedMessage, LightNode, createDecoder } from "@waku/sdk";
import toast from "react-hot-toast";
import { Meet } from "@/lib/types";

export default function AssignedDisputed() {

    const [wakuNode, setWakuNode] = useState<LightNode | null>(null);

    useEffect(() => {
        if (wakuNode) return;

        (async () => {
            console.log("starting node");
            const node = await createNode();
            console.log("node started");
            setWakuNode(node);
        })();
    }, [wakuNode]);

    const getMeets = async (
        waku: LightNode,
        userWallet: string
        // callback: (pollMessage: IBlogData) => void,
    ) => {
        const contentTopic = "/netstate/5/" + userWallet;

        const decoder = createDecoder(contentTopic);
        const _callback = (wakuMessage: DecodedMessage): void => {
            if (!wakuMessage.payload) return;
            const pollMessageObj = MeetBuf.decode(wakuMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as Meet;
            console.log("decoded ", pollMessage);
            // callback(pollMessage);
        };
        // Query the Store peer
        let result = await waku.store.queryWithOrderedCallback([decoder], _callback);
        console.log("result", result);
    };




    return (
        <div className='gap-6 font-bold px-4 max-w-screen-xl mx-auto'>

            <p className='text-4xl font-6xl tracking-tighter w-[600px]'>Upcoming Meets</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <Card maxW='sm' className='relative' >
                    <CardBody>
                        <Badge colorScheme='green' className='absolute top-2 right-2 rounded-full text-xs px-3 py-0.5'>
                            E-Commerce
                        </Badge>
                        Time : Dec 15 2023, 9:15
                    </CardBody>
                    <Divider />
                    <CardFooter className='flex justify-end gap-4'>
                        <Link href="/room/hxu-flxv-kqy" >
                            <Button className="px-2">
                                Join
                            </Button>
                        </Link>
                    </CardFooter>


                </Card>

            </div>

        </div>
    )
}