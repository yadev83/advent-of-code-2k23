import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const getPath = (filePath) => {
    return path.join(__dirname, '../', filePath);
}