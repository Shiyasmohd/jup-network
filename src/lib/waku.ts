import {
    createLightNode,
    createEncoder,
    createDecoder,
    waitForRemotePeer,
    Protocols,
    LightNode,
    DecodedMessage,
} from "@waku/sdk";
import { DisputeData } from "./types";
import { DisputeDataBuf } from "./helper";

export const createNode = async () => {
    // Create and start a Light Node
    const node = await createLightNode({ defaultBootstrap: true });
    await waitForRemotePeer(node); // check if 2nd params is required
    return node;
};

export const sendDispute = async (
    node: LightNode,
    newDispute: DisputeData,
    party2WalletAddr: string
) => {
    // Choose a content topic
    const contentTopic = "/netstate/0/" + party2WalletAddr;

    // Create a message encoder and decoder
    const encoder = createEncoder({ contentTopic });
    console.log({ contentTopic })
    const disputeMessage = DisputeDataBuf.create(newDispute);
    console.log("blogMessage", disputeMessage);
    // Serialise the message using Protobuf
    const serialisedMessage = DisputeDataBuf.encode(disputeMessage).finish();
    console.log("serialisedMessage", serialisedMessage);

    // Send the message using Light Push
    await node.lightPush
        .send(encoder, {
            payload: serialisedMessage,
        })
        .then((res) => console.log(res));
};


export const retrieveExistingVotes = async (
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


export const subscribeToIncomingBlogs = async (
    node: LightNode,
    userWallet: string
    // callback: any
) => {

    const contentTopic = "/waku-hh-podcast-sub/channel/" + userWallet;

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