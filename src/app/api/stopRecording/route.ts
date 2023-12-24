// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Recorder } from "@huddle01/server-sdk/recorder";
import { NextResponse } from "next/server";

interface Recordings {
  id: string;
  recordingUrl: string;
  recordingSize: number;
}

export async function GET(req: NextApiRequest) {
  //   const { roomId } = req.query;
  const { searchParams } = new URL(req.url as string);
  const roomId = searchParams.get("roomId");

  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID as string,
    process.env.NEXT_PUBLIC_API_KEY as string
  );

  const recording = await recorder.stop({
    roomId: roomId as string,
  });

  console.log("recording", recording);

//   const { msg } = recording;

//   if (msg === "Stopped") {
//     const response = await fetch(
//       "https://api.huddle01.com/api/v1/get-recordings",
//       {
//         headers: {
//           "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
//         },
//       }
//     );
//     const data = await response.json();
//     const { recordings } = data as { recordings: Recordings[] };
//     console.log("recordings", recordings);
//     return NextResponse.json({ recording: recordings[0] });
//   }

  return NextResponse.json({ recording });
}
