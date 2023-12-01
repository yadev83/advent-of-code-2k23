import path from 'path'

export const getPath = (filePath) => {
    return path.join('__dirname', filePath);
}