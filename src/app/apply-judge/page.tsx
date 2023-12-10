"use client"
import { ABI, CONTRACT_ADDRESS } from '@/lib/const';
import { ChevronDownIcon } from '@chakra-ui/icons';
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
import { ethers } from 'ethers';
import { useState } from 'react';
import React, { useEffect } from "react";
import {
    AnonAadhaarProvider,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
} from "anon-aadhaar-react";
import crypto from "crypto";
import { AnonAadhaarPCD, exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";

export default function ApplyJudge() {

    const [bio, setBio] = useState('');
    const [license, setLicense] = useState('');
    const [tag, setTag] = useState('');
    const toast = useToast();
    const tags = ["Maritime", "E-commerce", "Others"]

    const handleFormSubmit = async (e: any) => {

        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })
        console.log({ bio, license, tag })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();

        await contract.connect(signer).registerJudge(
            bio,
            license,
            [tag]
        ).then(async (res: any) => {
            await res.wait()
            toast({
                title: "Registered Successfully",
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
        })
    }

    const [anonAadhaar] = useAnonAadhaar();
    const [ready, setReady] = useState<boolean>(false);
    const [pcd, setPcd] = useState<AnonAadhaarPCD>();
    const app_id = process.env.NEXT_PUBLIC_APP_ID || "";
    useEffect(() => {
        setReady(true);
    }, []);

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
        // const app_id = BigInt(
        //   parseInt(crypto.randomBytes(20).toString("hex"), 16)
        // ).toString();
        // console.log("app id", app_id)

    }, [anonAadhaar]);


    return (
        <Flex justifyContent="center" flexDir={"column"} alignItems={"center"} className='gap-6 font-bold'>

            <p className='text-4xl font-6xl tracking-tighter w-[600px]'>Apply Judge</p>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="600px" bg="rgba(255, 255, 255)">
                <Stack spacing={3}>

                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            resize="vertical"
                            type='text'
                            placeholder="Enter Bio here..."
                            onChange={(e: any) => setBio(e.target.value)}
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
                        <FormLabel>License Number</FormLabel>
                        <Input
                            type="text"
                            onChange={(e: any) => setLicense(e.target.value)}
                        />
                    </FormControl>

                    <FormLabel>Connect Aadaar</FormLabel>
                    {ready ? (
                        <AnonAadhaarProvider _appId={app_id}>
                            <p>{app_id}</p>
                            <div>
                                <LogInWithAnonAadhaar />
                            </div>
                        </AnonAadhaarProvider>
                    ) : null}

                    <Button
                        colorScheme='facebook'
                        variant='outline'
                        onClick={handleFormSubmit}
                    >
                        Register
                    </Button>
                </Stack>
            </Box>
        </Flex>
    )
}