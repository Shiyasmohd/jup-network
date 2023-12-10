export type DisputeData = {
    party1addr: string
    summary: string;
    tag: string;
    evidenceDoc: string
    party2addr: string
    disputeId: string
    reply: string
}
export type DisputeReplyData = {
    replyEvidenceDoc: string
    party2addr: string
    tag: string
    disputeId: string;
    reply: string
}
