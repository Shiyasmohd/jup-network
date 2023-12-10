"use client"
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { Badge, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure, Input, useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { get50Words } from "@/lib/helper";
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
import { LightNode } from "@waku/sdk";
import toast from "react-hot-toast";

export default function AssignedDisputed() {

    const [dispute, setDispute] = useState<any>()
    const [meetTime, setMeetTime] = useState<any>()
    const view = useDisclosure()
    const meet = useDisclosure()
    const verdict = useDisclosure()
    const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
    const [evidenceDoc, setEvidenceDoc] = useState<any>();

    useEffect(() => {
        if (wakuNode) return;

        (async () => {
            console.log("starting node");
            const node = await createNode();
            console.log("node started");
            setWakuNode(node);
        })();
    }, [wakuNode]);

    const getDisputes = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })
        let data = await contract.getAllDisputes()
        console.log({ data })
        setDispute(data[0])
    }

    const createRoom = async () => {
        console.log({ meetTime })
        console.log("called");
        console.log()

        console.log(process.env.NEXT_PUBLIC_API_KEY);
        const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
            method: "POST",
            body: JSON.stringify({
                title: "Hearing Room",
            }),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
            },
            cache: "no-store",
        });
        const data: RoomDetails = await res.json();
        console.log(data);
        const { roomId } = data.data;
        await scheduleMeetMessage(
            wakuNode,
            {
                roomId,
                time: new Date(meetTime).getTime(),
            },
            "0xB90581917BCFeb7A0e8511c8Cb7bC137F7541fb7"
        ).then(() => {
            toast({
                title: 'Meeting Scheduled',
                description: 'Meeting has been scheduled',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        })
        new Date(meetTime).getTime()
        return roomId;
    };

    useEffect(() => {
        getDisputes()
    }, [])


    return (
        <div className='gap-6 font-bold px-4 max-w-screen-xl mx-auto'>

            <p className='text-4xl font-6xl tracking-tighter w-[600px]' onClick={getDisputes}>Assigned Disputes</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {
                    dispute &&
                    <Card maxW='sm' className='relative' >
                        <CardBody>
                            <Badge colorScheme='green' className='absolute top-2 right-2 rounded-full text-xs px-3 py-0.5'>
                                {dispute.tag}
                            </Badge>
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'></Heading>
                                <Text>
                                    {
                                        get50Words(dispute.summary)
                                    }
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter className='flex justify-end gap-4'>
                            <Button className="px-2" onClick={view.onOpen} >
                                View
                            </Button>

                            <Modal onClose={view.onClose} isOpen={view.isOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent className='max-h-[90vh] overflow-y-auto'>
                                    <ModalHeader className='text-3xl mt-4 font-bold'>Dispute Details</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <p className='font-bold'>Party 1 Docs</p>
                                        <br />
                                        <p className=' font-semibold'>Summary </p>
                                        <br />
                                        {dispute.summary}
                                        <br />
                                        <br />
                                        <Link href={dispute.evidenceDoc} target="_blank" className='text-blue-500 mt-4'>
                                            <Button variant='solid' colorScheme='blue' className='bg-[#2b6cb0]'>
                                                View Evidence
                                            </Button>
                                        </Link>
                                        <p className='font-bold mt-5'>Party 2 Docs</p>
                                        <br />
                                        <Link href={dispute.replyEvidenceDoc} target="_blank" className='text-blue-500 mt-4'>
                                            <Button variant='solid' colorScheme='blue' className='bg-[#2b6cb0]'>
                                                View Evidence
                                            </Button>
                                        </Link>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={view.onClose}>Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>


                            <Button className="px-2" onClick={meet.onOpen}>
                                Schedule Meet
                            </Button>

                            <Modal onClose={meet.onClose} isOpen={meet.isOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent className='max-h-[90vh] overflow-y-auto'>
                                    <ModalHeader className='text-3xl mt-4 font-bold'>Schedule Meet</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Input type="datetime-local" onChange={(e) => setMeetTime(e.target.value)} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={createRoom}>Schedule</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>


                            <Button className="px-2" onClick={verdict.onOpen}>
                                Verdict
                            </Button>

                            <Modal onClose={verdict.onClose} isOpen={verdict.isOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent className='max-h-[90vh] overflow-y-auto'>
                                    <ModalHeader className='text-4xl font-bold mt-4'>Verdict</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <p className='font-bold'>Upload Verdict</p>
                                        <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                            <Button className="btn">{evidenceDoc != null ? evidenceDoc[0].name : "Upload"}</Button>
                                            <Input type="file" name="myfile" onChange={(e) => setEvidenceDoc(e.target.files)} />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button >Confirm</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </CardFooter>


                    </Card>
                }

            </div>

        </div>
    )
}