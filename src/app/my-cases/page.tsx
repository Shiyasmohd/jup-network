"use client"
import MessageCard from '@/components/card';
import { DisputeDataBuf, DisputeReplyDataBuf, pushUniqueElement } from '@/lib/helper';
import { DisputeData, DisputeReplyData } from '@/lib/types';
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
    const [disputeMesasages, setDisputeMessages] = useState<DisputeData[]>([])
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
        const contentTopic = "/netstate/5/" + userWallet;

        const decoder = createDecoder(contentTopic);
        const _callback = (wakuMessage: DecodedMessage): void => {
            if (!wakuMessage.payload) return;
            const pollMessageObj = DisputeDataBuf.decode(wakuMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as DisputeData;
            console.log("decoded ", pollMessage);
            let tempMessage = pushUniqueElement(disputeMesasages, pollMessage)
            setDisputeMessages([...tempMessage])
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

        const contentTopic = "/netstate/5/" + userWallet;

        const decoder = createDecoder(contentTopic);
        console.log("subscribing to incoming blogs for topic", userWallet);

        const _callback = (blogMessage: DecodedMessage): void => {
            console.log(blogMessage);
            if (!blogMessage.payload) return;
            const pollMessageObj = DisputeDataBuf.decode(blogMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as DisputeData;
            console.log("decoded ", pollMessage);
            let tempMessage = pushUniqueElement(disputeMesasages, pollMessage)
            setDisputeMessages([...tempMessage])
            // You can invoke the callback function if needed
            // callback(pollMessage);
        };
        // Create a filter subscription
        const subscription = await node.filter.createSubscription();

        // Subscribe to content topics and process new messages
        let message = await subscription.subscribe([decoder], _callback);
        console.log("message", message);

    };

    const retrieveExistingVotes2 = async (
        waku: LightNode,
        userWallet: string
        // callback: (pollMessage: IBlogData) => void,
    ) => {
        const contentTopic = "/netstate/5/" + userWallet;

        const decoder = createDecoder(contentTopic);
        const _callback = (wakuMessage: DecodedMessage): void => {
            if (!wakuMessage.payload) return;
            const pollMessageObj = DisputeReplyDataBuf.decode(wakuMessage.payload);
            const pollMessage = pollMessageObj.toJSON() as DisputeReplyData;
            console.log("decoded ", pollMessage);
            // callback(pollMessage);
        };
        // Query the Store peer
        let result = await waku.store.queryWithOrderedCallback([decoder], _callback);
        console.log("result", result);
    };

    const subscribeToVotes = async () => {
        if (wakuNode == null) {
            console.log("Waku node not stared")
            return
        }

        await retrieveExistingVotes(wakuNode, account.address as string);
        await retrieveExistingVotes2(wakuNode, account.address as string);
        await subscribeToIncomingBlogs(wakuNode, account.address as string);
    };

    useEffect(() => {
        subscribeToVotes();
    }, [wakuNode])

    return (
        <div className="max-w-screen-xl mx-auto mt-6 px-4">

            <p className='text-4xl font-6xl tracking-tighter w-[600px] my-6 font-bold'>My Cases</p>

            <div className='grid grid-cols-4 gap-4'>
                {
                    disputeMesasages.slice(0, 1).map((item, index) => (
                        <MessageCard
                            wallet={item.party1addr}
                            summary={item.summary}
                            evidenceDoc={item.evidenceDoc}
                            disputeId={item.disputeId}
                            tag={item.tag}
                            wakuNode={wakuNode}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}