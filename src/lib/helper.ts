import protobuf from "protobufjs";


export const DisputeDataBuf = new protobuf.Type("DisputeData")
    .add(new protobuf.Field("party1addr", 1, "string"))
    .add(new protobuf.Field("party2addr", 2, "string"))
    .add(new protobuf.Field("summary", 3, "string"))
    .add(new protobuf.Field("evidenceDoc", 4, "string"))
    .add(new protobuf.Field("tag", 5, "string"))
    .add(new protobuf.Field("disputeId", 6, "string"))
    .add(new protobuf.Field("reply", 7, "string"))

export const DisputeReplyDataBuf = new protobuf.Type("DisputeReplyData")
    .add(new protobuf.Field("replyEvidenceDoc", 1, "string"))
    .add(new protobuf.Field("party2addr", 2, "string"))
    .add(new protobuf.Field("tag", 3, "string"))
    .add(new protobuf.Field("disputeId", 4, "string"))
    .add(new protobuf.Field("reply", 5, "string"))

export const MeetBuf = new protobuf.Type("Meet")
    .add(new protobuf.Field("time", 1, "string"))
    .add(new protobuf.Field("roomId", 2, "string"))


export function pushUniqueElement<T>(arr: T[], element: T): T[] {
    if (!arr.includes(element)) {
        arr.push(element);
    }
    return arr
}

export function shortenAddress(addr: string) {
    return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function get50Words(paragraph: string): [string, string] {
    // Split the paragraph into words
    const words = paragraph.split(' ');

    // If the number of words is less than or equal to 50, return the paragraph itself
    if (words.length <= 50) {
        return [paragraph, ''];
    }

    // Otherwise, return the first 50 words and the rest of the words
    const first50Words = words.slice(0, 50);
    const restOfWords = words.slice(50);

    return [first50Words.join(' ') + '...', ""];
}