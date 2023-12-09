import protobuf from "protobufjs";


export const DisputeDataBuf = new protobuf.Type("DisputeData")
    .add(new protobuf.Field("party1name", 1, "string"))
    .add(new protobuf.Field("summary", 2, "string"))
    .add(new protobuf.Field("tag", 3, "string"))
    .add(new protobuf.Field("evidenceDoc", 4, "string"))
    .add(new protobuf.Field("party2addr", 5, "string"))
    .add(new protobuf.Field("party2name", 6, "string"))