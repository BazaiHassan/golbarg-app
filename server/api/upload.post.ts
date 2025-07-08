import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Check if request method is POST
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      });
    }

    // Read multipart form data
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No files uploaded'
      });
    }

    const uploadedFiles: Array<{
      filename: string,
      storageMethod: string,
      storagePath: string,
      url: string
    }> = [];

    for (const file of files) {
      if (!file.filename) {
        continue;
      }

      // Generate unique filename to prevent conflicts
      const fileExtension = file.filename.split('.').pop() || '';
      const baseName = file.filename.replace(/\.[^/.]+$/, '');
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 7);
      const uniqueFilename = `${baseName}_${timestamp}_${randomId}.${fileExtension}`;

      console.log(`[UPLOAD] Processing file: ${file.filename}`);
      console.log(`[UPLOAD] Generated filename: ${uniqueFilename}`);

      // Define the uploads directory (public/images/)
      const uploadsDir = path.join(process.cwd(), 'public', 'images');

      // Create directory if it doesn't exist
      await fs.mkdir(uploadsDir, { recursive: true });

      // Define the full file path
      const filePath = path.join(uploadsDir, uniqueFilename);

      // Write the file to filesystem
      try {
        await fs.writeFile(filePath, file.data);

        const fileUrl = `/images/${uniqueFilename}`;

        console.log(`[UPLOAD] ✅ Successfully saved to filesystem`);
        console.log(`[UPLOAD] Storage path: ${filePath}`);
        console.log(`[UPLOAD] File URL: ${fileUrl}`);

        uploadedFiles.push({
          filename: uniqueFilename,
          storageMethod: 'filesystem',
          storagePath: `public/images/${uniqueFilename}`,
          url: fileUrl
        });
      } catch (fsError) {
        console.error(`[UPLOAD] ❌ filesystem failed:`, fsError);
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to save file to filesystem'
        });
      }
    }

    if (uploadedFiles.length === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No files were saved successfully'
      });
    }

    // Log final results
    console.log(`[UPLOAD] Final results:`);
    uploadedFiles.forEach((file, index) => {
      console.log(`[UPLOAD] File ${index + 1}:`);
      console.log(`  - Filename: ${file.filename}`);
      console.log(`  - Storage method: ${file.storageMethod}`);
      console.log(`  - Storage path: ${file.storagePath}`);
      console.log(`  - URL: ${file.url}`);
    });

    return {
      success: true,
      message: "Files uploaded successfully",
      files: uploadedFiles
    };
  } catch (error) {
    console.error('[UPLOAD] Upload error:', error);

    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});