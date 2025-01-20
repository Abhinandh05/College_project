import multer from 'multer';

// Use memoryStorage to store the file in memory (buffer)
const storage = multer.memoryStorage();

// Set up the upload middleware
const upload = multer({ storage: storage });

export default upload;
