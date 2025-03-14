/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const PINATA_API_KEY = "a56bb58089b614c59b21";
const PINATA_SECRET_API_KEY =
  "82cdfc13cb930a683d5bd003ca6cd44eed4c54af4f5a57326145a7dfce4eab7b";
const PINATA_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

// Step 1: Upload image to IPFS
async function uploadImageToPinata(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const res = await fetch(PINATA_FILE_URL, {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
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

// Step 2: Upload metadata to IPFS
async function uploadMetadataToPinata(metadata: any) {
  try {
    const res = await fetch(PINATA_JSON_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
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
    
    // Get file and metadata from request
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    
    // Validate inputs
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    if (!name || !description) {
      return NextResponse.json({ error: "Missing required metadata fields" }, { status: 400 });
    }

    // Step 1: Upload the image first
    const imageUploadResult = await uploadImageToPinata(file);
    
    if (!imageUploadResult.success) {
      return NextResponse.json({ error: imageUploadResult.error }, { status: 500 });
    }
    
    // Step 2: Create and upload the metadata with the image IPFS URL
    const metadata = {
      name,
      description,
      price: price || "0",
      image: imageUploadResult.imageUrl,
      attributes: []
    };
    
    // You can add custom attributes if needed
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
    
    // Return both image and metadata information
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