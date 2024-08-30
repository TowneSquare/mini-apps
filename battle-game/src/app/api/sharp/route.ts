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
    const { traitsUri, coolSlothName } = json;
    const downloadPromises = traitsUri.map(async (traitUrl: string) => {
      return (await axios({ url: traitUrl, responseType: "arraybuffer" }))
        .data as Buffer;
    }) 

    const layers = await Promise.all(downloadPromises);

    const resizedLayers = await Promise.all(
      layers.map(async (layer) => {
        return await sharp(layer).resize(700, 700).toBuffer();
      }),
    );

    const output = await sharp(resizedLayers[0])
      .composite(
        resizedLayers.map((file: Buffer) => ({ input: file, blend: "over" })),
      )
      .toBuffer();

    const file = new File([new Blob([output])], coolSlothName);
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
