import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadResponse {
  imageUrls: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse | { message: string; error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ message: "Error parsing form", error: err.message });
      }

      const uploadedFiles = files.images as File[] | File;
      if (!uploadedFiles) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
      const imageUrls = fileArray.map((file) => {
        // Return relative path for Next.js public folder
        const relativePath = file.filepath.replace(path.join(process.cwd(), "public"), "");
        return relativePath.replace(/\\/g, "/"); // Normalize path separators
      });

      res.status(200).json({ imageUrls });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading files", error: (error as Error).message });
  }
}
