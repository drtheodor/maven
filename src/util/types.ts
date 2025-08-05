export type FileType = 'file' | 'directory';

export type File = {
    name: string,
    type: FileType,
    path: string,
};