"use client"
import { DisputeDataBuf } from '@/lib/helper';
import { DisputeData } from '@/lib/types';
import { createNode } from '@/lib/waku';
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
import { DecodedMessage, LightNode, createDecoder } from '@waku/sdk';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function MyCases() {

    const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
    const account = useAccount()

    useEffect(() => {
        if (wakuNode) return;

        (async () => {
            console.log("starting node");
            const node = await createNode();
            console.log("node started");
            setWakuNode(node);
        })();
    }, [wakuNode]);


    const retrieveExistingVotes = async (
        waku: LightNode,
        userWallet: string
        // callback: (pollMessage: IBlogData) => void,
    ) => {
        const contentTopic = "/netstate/0/" + userWallet;

        const decoder = createDecoder(contentTopic);
        const _callback = (wakuMessage: DecodedMessage): void => {
            if (!wakuMessage.payload) return;
            const pollMessageObj = DisputeDataBuf.decode(wakuMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as DisputeData;
            console.log("decoded ", pollMessage);
            // callback(pollMessage);
        };
        // Query the Store peer
        let result = await waku.store.queryWithOrderedCallback([decoder], _callback);
        console.log("result", result);
    };


    const subscribeToIncomingBlogs = async (
        node: LightNode,
        userWallet: string
        // callback: any
    ) => {

        const contentTopic = "/netstate/0/" + userWallet;

        const decoder = createDecoder(contentTopic);
        console.log("subscribing to incoming blogs for topic", userWallet);

        const _callback = (blogMessage: DecodedMessage): void => {
            console.log(blogMessage);
            if (!blogMessage.payload) return;
            const pollMessageObj = DisputeDataBuf.decode(blogMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as DisputeData;
            console.log("decoded ", pollMessage);
            // You can invoke the callback function if needed
            // callback(pollMessage);
        };
        // Create a filter subscription
        const subscription = await node.filter.createSubscription();

        // Subscribe to content topics and process new messages
        let message = await subscription.subscribe([decoder], _callback);
        console.log("message", message);

    };

    const subscribeToVotes = async () => {
        if (wakuNode == null) {
            console.log("Waku node not stared")
            return
        }

        await retrieveExistingVotes(wakuNode, account.address as string);
        await subscribeToIncomingBlogs(wakuNode, account.address as string);
    };

    useEffect(() => {
        subscribeToVotes();
    }, [wakuNode])

    return (
        <div className="">

        </div>
    )
}