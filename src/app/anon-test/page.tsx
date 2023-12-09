"use client";
import React, { useEffect, useState } from "react";
import {
  AnonAadhaarProvider,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
} from "anon-aadhaar-react";
import crypto from "crypto";
import { AnonAadhaarPCD, exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";
export default function AnonPage() {
  const [anonAadhaar] = useAnonAadhaar();
  const [ready, setReady] = useState<boolean>(false);
  const [pcd, setPcd] = useState<AnonAadhaarPCD>();
  const app_id = process.env.NEXT_PUBLIC_APP_ID || "";
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    // const app_id = BigInt(
    //   parseInt(crypto.randomBytes(20).toString("hex"), 16)
    // ).toString();
    // console.log("app id", app_id)

  }, [anonAadhaar]);
  const getProofs = async (pcd: AnonAadhaarPCD) => {
    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(pcd);
    console.log({ a, b, c, Input });
  };
  return (
    <>
      {ready ? (
        <AnonAadhaarProvider _appId={app_id}>
          <p>{app_id}</p>
          <div>
            <LogInWithAnonAadhaar />
            <p>{anonAadhaar?.status}</p>
            
          </div>
        </AnonAadhaarProvider>
      ) : null}
    </>
  );
}
