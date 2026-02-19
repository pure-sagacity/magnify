import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function upload(fileKey: string, file: File, type: "pdf" | "image") {
    const command = new PutObjectCommand({
        Bucket: "magnify-bucket",
        Key: fileKey,       // path inside the bucket
        Body: file,
        ContentType: type === "pdf" ? "application/pdf" : "image/png",
    });

    file.type

    await r2.send(command);
    console.log("Upload successful");
};