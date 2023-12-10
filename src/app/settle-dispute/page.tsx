"use client"
import React, { useEffect, useState } from 'react';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Textarea,
    Stack,
    extendTheme,
    useToast
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '@/lib/const';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { createNode, sendDispute } from '@/lib/waku';
import { LightNode } from '@waku/sdk';
import { shareFile, uploadEncryptedFile } from '@/lib/light-house';
import { useAccount } from 'wagmi';

export default function SettleDispute() {

    const account = useAccount()
    const [summary, setSummary] = useState('');
    const [tag, setTag] = useState('');
    const [evidenceDoc, setEvidenceDoc] = useState<any>();
    const [party2, setParty2] = useState('');
    const toast = useToast();
    const [wakuNode, setWakuNode] = useState<LightNode | null>(null);

    const tags = ["Maritime", "E-commerce", "Others"]

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        // console.log("party1name :", party1name);
        try {
            await initiateDispute();
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while submitting the form.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

    };

    const initiateDispute = async () => {

        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();

        let fileLink = await handleUploadFile()
        await contract.connect(signer).initiateDispute(summary, tag, fileLink, party2).then(async (res: any) => {
            toast({
                title: 'Initiating Dispute',
                status: 'loading',
                duration: 2000,
                isClosable: false,
            })
            await res.wait();
            let disputeId = await contract.disputeCounter()
            toast({
                title: "Dispute Initiated",
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
            if (wakuNode == null) {
                toast({
                    title: 'Waku Node Not Started',
                    status: 'error',
                    duration: 2000,
                    isClosable: false,
                })
                return
            }
            toast({
                title: 'Sending waku node',
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
            await sendDispute(
                wakuNode,
                {
                    party1addr: account.address as string,
                    evidenceDoc: fileLink,
                    party2addr: party2,
                    summary,
                    tag,
                    disputeId: Number(disputeId).toString(),
                    reply: "false"
                },
                party2
            ).then((res) => {
                console.log({ res })
            })
        });
    }

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
                    [party2]
                );
            }
        }
        return link
    };



    useEffect(() => {
        if (wakuNode) return;

        (async () => {
            console.log("starting node");
            const node = await createNode();
            console.log("node started");
            setWakuNode(node);
        })();
    }, [wakuNode]);


    return (
        <Flex justifyContent="center" flexDir={"column"} alignItems={"center"} className='gap-6 font-bold'>

            <p className='text-4xl font-6xl tracking-tighter w-[600px]'>Dispute Details</p>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="600px" bg="rgba(255, 255, 255)">
                <form onSubmit={handleFormSubmit}>
                    <Stack spacing={3}>

                        <FormControl>
                            <FormLabel>Summary</FormLabel>
                            <Textarea
                                rows={4}
                                resize="vertical"
                                value={summary}
                                placeholder="Enter summary here..."
                                onChange={(e: any) => setSummary(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Tag</FormLabel>
                            <Menu  >
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className='bg-[#edf2f6]'>
                                    {tag.length == 0 ? "Select" : tag}
                                </MenuButton>
                                <MenuList>
                                    {
                                        tags.map((item, index) => (
                                            <MenuItem key={index} onClick={() => setTag(item)}>
                                                {item}
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Evidence Document</FormLabel>
                            <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                <Button className="btn">{evidenceDoc != null ? evidenceDoc[0].name : "Upload Document"}</Button>
                                <Input type="file" name="myfile" onChange={(e) => setEvidenceDoc(e.target.files)} />
                            </div>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Opposite Party 1 Wallet</FormLabel>
                            <Input
                                type="text"
                                value={party2}
                                onChange={(e: any) => setParty2(e.target.value)}
                                placeholder='0x06C41df2358deD2Fd891522f9Da75eca2150c10B'
                            />
                        </FormControl>

                        <Button type="submit"
                            colorScheme='facebook'
                            variant='outline'
                        >
                            Initiate Dispute
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>

    );
}
