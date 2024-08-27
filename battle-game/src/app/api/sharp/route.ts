import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PinataSDK } from "pinata";
import { PINATA_JWT, PINATA_GATEWAY } from "@/src/config/constants";
import { Blob, File } from "nft.storage";
const pinata = new PinataSDK({
  pinataJwt: `${PINATA_JWT}`,
  pinataGateway: `${PINATA_GATEWAY}`,
});

export const POST = async (request: NextRequest) => {
  try {
    const json = await request.json();
    const { traitsUri } = json;
    const downloadPromises = traitsUri.map(async (traitUrl: string) => {
      try {
        return (await axios({ url: traitUrl, responseType: "arraybuffer" }))
          .data as Buffer;
      } catch (error) {
        console.log(error);
        return Buffer.from("empty.png");
      }
    }) as any as Array<string>;

    const layer = await Promise.all(downloadPromises);

    const output = await sharp(layer[0])
      .composite(layer.map((file: string) => ({ input: file })))
      .png()
      .toBuffer();

    const file = new File([new Blob([output])], "coolsloth2");
    const upload = await pinata.upload.file(file);
   
    return NextResponse.json({
      ipfsHash: upload.IpfsHash,
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({
      output: "",
      message: error,
    });
  }
};
