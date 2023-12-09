"use client"
import React, { useState } from 'react';

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



export default function SettleDispute() {
    const [party1name, setParty1Name] = useState('');
    const [summary, setSummary] = useState('');
    const [tag, setTag] = useState('');
    const [evidenceDoc, setEvidenceDoc] = useState('');
    const [party2, setParty2] = useState('');
    const [party2name, setParty2Name] = useState('');
    const toast = useToast();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log("party1name :", party1name);
        try {
            await subscribeChannel();
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

    const subscribeChannel = async () => {
       
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        const signer = provider.getSigner();
        // Create a transaction object for the mint function
        // console.log(Number(props.subscriptionAmount).toString())
        // console.log(ethers.utils.parseEther(Number(props.subscriptionAmount).toString()))
        //{ value: (Number(props.subscriptionAmount) + 100000000000000).toString() }
        await contract.connect(signer).initiateDispute(party1name, summary, tag, evidenceDoc, party2, party2name,).then(async (res: any) => {
            toast({
                title: 'Submitting the form',
                status: 'loading',
                duration: 2000,
                isClosable: false,
            })
            await res.wait();
            toast({
                title: "Dispute settled",
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
    });
}


    return (



        <Flex justifyContent="center">


            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="600px" bg="rgba(255, 255, 255, 0.5)">
                <form onSubmit={handleFormSubmit}>
                    <Stack spacing={3}>
                        <FormControl >
                            <FormLabel>Your Name</FormLabel>
                            <Input
                                bg="white"
                                type="text"
                                value={party1name}
                                onChange={(e) => setParty1Name(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Summary</FormLabel>
                            <Input
                                type="text"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Tag</FormLabel>
                            <Input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Evidence Document</FormLabel>
                            <Input
                                type="text"
                                value={evidenceDoc}
                                onChange={(e) => setEvidenceDoc(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Address of Party 2</FormLabel>
                            <Input
                                type="text"
                                value={party2}
                                onChange={(e) => setParty2(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Party 2 Name</FormLabel>
                            <Input
                                type="text"
                                value={party2name}
                                onChange={(e) => setParty2Name(e.target.value)}
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
