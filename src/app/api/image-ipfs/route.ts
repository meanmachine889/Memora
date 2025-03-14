/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const PINATA_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

async function uploadImageToPinata(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const res = await fetch(PINATA_FILE_URL, {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_API_KEY!,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Pinata image upload failed: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return {
      success: true,
      ipfsHash: result.IpfsHash,
      imageUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    };
  } catch (error) {
    console.error("Image upload error:", error);
    return { success: false, error: (error as Error).message };
  }
}

async function uploadMetadataToPinata(metadata: any) {
  try {
    const res = await fetch(PINATA_JSON_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_API_KEY!,
      },
      body: JSON.stringify(metadata),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Pinata metadata upload failed: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return {
      success: true,
      ipfsHash: result.IpfsHash,
      metadataUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    };
  } catch (error) {
    console.error("Metadata upload error:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    

    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    if (!name || !description) {
      return NextResponse.json({ error: "Missing required metadata fields" }, { status: 400 });
    }


    const imageUploadResult = await uploadImageToPinata(file);
    
    if (!imageUploadResult.success) {
      return NextResponse.json({ error: imageUploadResult.error }, { status: 500 });
    }
    

    const metadata = {
      name,
      description,
      price: price || "0",
      image: imageUploadResult.imageUrl,
      attributes: []
    };
    

    if (formData.has("attributes")) {
      try {
        metadata.attributes = JSON.parse(formData.get("attributes") as string);
      } catch (e) {
        console.warn("Failed to parse attributes:", e);
      }
    }
    
    const metadataUploadResult = await uploadMetadataToPinata(metadata);
    
    if (!metadataUploadResult.success) {
      return NextResponse.json({ error: metadataUploadResult.error }, { status: 500 });
    }
    

    return NextResponse.json({
      success: true,
      image: {
        ipfsHash: imageUploadResult.ipfsHash,
        url: imageUploadResult.imageUrl
      },
      metadata: {
        ipfsHash: metadataUploadResult.ipfsHash,
        url: metadataUploadResult.metadataUrl
      },
      nftData: metadata
    });
    
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: `Upload failed: ${(error as Error).message}` }, { status: 500 });
  }
}