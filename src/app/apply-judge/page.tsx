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