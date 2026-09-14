import { v2 as cloudinary } from "cloudinary";

export type CldImageOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "scale";
};

export type CldAsset = {
  publicId: string;
  width: number;
  height: number;
};


function readEnv(name: string): string | undefined {
  const raw = import.meta.env[name] ?? process.env[name];
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  // Strip accidental quotes from dashboard/.env paste (causes cloud_name mismatch)
  return raw.trim().replace(/^["']|["']$/g, "");
}

const cloudName = readEnv("CLOUDINARY_CLOUD_NAME");
const apiKey = readEnv("CLOUDINARY_API_KEY");
const apiSecret = readEnv("CLOUDINARY_API_SECRET");

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET for Admin API.",
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});


export function getCldUrl( publicId: string, options: CldImageOptions = {}): string {
  const transforms = ["f_auto", "q_auto"];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(",")}/${publicId}`;
}

export async function listFolder(folder: string): Promise<CldAsset[]> {
  const prefix = folder.endsWith("/") ? folder : `${folder}/`;
  const assets: CldAsset[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources ?? []) {
      assets.push({
        publicId: resource.public_id,
        width: resource.width ?? 0,
        height: resource.height ?? 0,
      });
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return assets.sort((a, b) => a.publicId.localeCompare(b.publicId));
}
