import { ABI, CONTRACT_ADDRESS } from '@/lib/const'
import { get50Words, shortenAddress } from '@/lib/helper'
import { shareFile, uploadEncryptedFile } from '@/lib/light-house'
import { createNode, sendReply } from '@/lib/waku'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure, Input, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { LightNode } from '@waku/sdk'
import { ethers } from 'ethers'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type MessageCardProps = {
    wallet: string,
    summary: string,
    tag: string
    evidenceDoc: string
    disputeId: string
    wakuNode: LightNode | null
}

export default function MessageCard(props: MessageCardProps) {

    const view = useDisclosure()
    const replay = useDisclosure()
    const account = useAccount()
    const [evidenceDoc, setEvidenceDoc] = useState<any>();
    const toast = useToast()


    const handleUploadFile = async () => {
        let link = ""
        if (evidenceDoc) {
            const result = await uploadEncryptedFile(evidenceDoc);
            if (result) {
                console.log("Encrypted File Status:", result);
                console.log(result.data[0].Hash)
                link = `https://decrypt.mesh3.network/evm/${result.data[0].Hash}`
                shareFile(
                    result.data[0].Hash,
                    account.address as string,
                    [props.wallet]
                );
                console.log({ link })
            }
            console.log({ link })
        }
        console.log({ link })
        return link
    };


    const handleReply = async () => {

        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();

        let fileLink = await handleUploadFile()
        console.log({ fileLink })
        await contract.connect(signer).replyToDispute(props.disputeId, fileLink).then(async (res: any) => {
            toast({
                title: 'Initiating Dispute',
                status: 'loading',
                duration: 2000,
                isClosable: false,
            })
            await res.wait();
            toast({
                title: "Dispute Initiated",
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
            if (props.wakuNode == null) {
                toast({
                    title: 'Waku Node Not Started',
                    status: 'error',
                    duration: 2000,
                    isClosable: false,
                })
                return
            }

            toast({
                title: 'Sending through waku node',
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
            await sendReply(
                props.wakuNode,
                {
                    replyEvidenceDoc: fileLink,
                    party2addr: account.address as string,
                    tag: props.tag,
                    disputeId: props.disputeId,
                    reply: "true"
                },
                props.wallet
            ).then((res) => {
                console.log({ res })
            })
        });
    }


    return (
        <Card maxW='sm' className='relative' >
            <CardBody>
                <Badge colorScheme='green' className='absolute top-2 right-2 rounded-full text-xs px-3 py-0.5'>
                    {props.summary}
                </Badge>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{shortenAddress("0xD8547c84ced4F10A32DC9B5dE4327e36740767C3")}</Heading>
                    <Text>
                        {/* {
                            get50Words(props.summary)
                        } */}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-end gap-4'>

                <Button variant='solid' colorScheme='blue' onClick={view.onOpen} className='bg-[#2b6cb0]'>
                    View
                </Button>

                <Modal onClose={view.onClose} isOpen={view.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent className='max-h-[90vh] overflow-y-auto'>
                        <ModalHeader className='text-sm'>{"0xD8547c84ced4F10A32DC9B5dE4327e36740767C3"}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p className='font-bold'>Summary</p>
                            {props.summary}
                            <br />
                            <br />
                            <Link href={props.wallet} target="_blank" className='text-blue-500'>
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
                {/* 
                <Button variant='solid' colorScheme='blue' onClick={replay.onOpen} className='bg-[#2b6cb0]'>
                    Reply
                </Button> */}

                <Modal onClose={replay.onClose} isOpen={replay.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent className='max-h-[90vh] overflow-y-auto'>
                        <ModalHeader className='text-sm'>{props.wallet}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p className='font-bold'>Upload Evidence</p>
                            <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                <Button className="btn">{evidenceDoc != null ? evidenceDoc[0].name : "Upload"}</Button>
                                <Input type="file" name="myfile" onChange={(e) => setEvidenceDoc(e.target.files)} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleReply}>Send</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </CardFooter>
        </Card>
    )
}