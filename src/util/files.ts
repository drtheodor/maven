import fs from 'fs';
import path from 'path';
import type { FileType } from './types';

type FileEntry = {
  path: string,
  type: FileType,
}

const BASE_PATH = './releases';

export function scanDirectory1(dir: string, recursive: boolean, base = ''): FileEntry[] {
  const results: FileEntry[] = [];
  const fullDirPath = path.posix.join(BASE_PATH, dir, base);
  
  // Check if directory exists
  if (!fs.existsSync(fullDirPath))
    return results;

  const files = fs.readdirSync(fullDirPath);

  files.forEach(file => {
    const relativePath = path.posix.join(base, file);
    const fullPath = path.posix.join(BASE_PATH, dir, relativePath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (recursive) {
        results.push(...scanDirectory1(dir, recursive, relativePath));
      } else {
        results.push({ path: relativePath + '/', type: 'directory' });
      }
    } else {
      results.push({ path: relativePath, type: 'file' });
    }
  });

  return results;
}

export function scanDirectory(dir: string, base = ''): FileEntry[] {
  const results: FileEntry[] = [];
  const fullDirPath = path.join(BASE_PATH, dir, base);
  
  // Check if directory exists
  if (!fs.existsSync(fullDirPath))
    return results;
  
  const files = fs.readdirSync(fullDirPath);
  
  results.push({ path: base, type: 'directory' });

  files.forEach(file => {
    const relativePath = path.posix.join(base, file);
    const fullPath = path.posix.join(BASE_PATH, dir, relativePath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...scanDirectory(dir, relativePath));
    } else {
      results.push({ path: relativePath, type: 'file' });
    }
  });

  return results;
}

const files = scanDirectory('');

export function getAllFiles() {
  const res = files.map(file => ({ params: { path: file.path }, props: { ...file } }));
  
  return res;
}