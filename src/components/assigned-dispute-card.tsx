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



    return (
        <Card maxW='sm' className='relative' >
            <CardBody>
                <Badge colorScheme='green' className='absolute top-2 right-2 rounded-full text-xs px-3 py-0.5'>
                    " {props.tag}"
                </Badge>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{shortenAddress(props.wallet)}</Heading>
                    <Text>

                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-end gap-4'>
            </CardFooter>
        </Card>
    )
}