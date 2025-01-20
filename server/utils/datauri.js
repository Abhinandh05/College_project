import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file || !file.buffer) {
        throw new Error("Invalid file data provided.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer); // Create a Data URI using the file buffer and extension
};

export default getDataUri;
