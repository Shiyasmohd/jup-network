// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Recorder } from "@huddle01/server-sdk/recorder";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { NextResponse } from "next/server";
const util = require("util");

export async function GET(req: NextApiRequest) {
  //   const { roomId } = req.query;
  const { searchParams } = new URL(req.url as string);
//   const roomId = searchParams.get("roomId");
const roomId = "kjm-fxtx-xze";

  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID as string,
    process.env.NEXT_PUBLIC_API_KEY as string
  );

//   const token = new AccessToken({
//     apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
//     roomId: roomId as string,
//     role: Role.HOST,
//     options: {
//       metadata: {}, // any custom metadata
//     },
//   });
    const token = new AccessToken({
      apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
      roomId: roomId as string,
      role: Role.BOT,
       options: {
      metadata: {}, // any custom metadata
    },
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });
  console.log('roomId',roomId)
  console.log('token',token)


  const accessToken = await token.toJwt();

  const recording = await recorder.startRecording({
    roomId: roomId as string,
    token: accessToken,
  });

  console.log("recording", recording);


  return NextResponse.json({ recording });
}




 