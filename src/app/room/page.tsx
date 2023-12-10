// Components
import IntroPage from "@/components/IntroPage/IntroPage";

export interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRoom = async () => {
  console.log("called");
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "Hearing Room",
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
    cache: "no-store",
  });
  const data: RoomDetails = await res.json();
  console.log(data);
  const { roomId } = data.data;
  return roomId;
};

export default async function Home() {
  console.log("here");
  const roomId = await createRoom();

  console.log({ roomId });

  return <IntroPage roomId={roomId} />;
}
