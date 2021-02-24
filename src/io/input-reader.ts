import { existsSync, lstatSync, promises as fsp } from 'fs';
import { join, extname } from 'path';
import { parse } from 'async-csv';
import { config } from '@/config/config';
import { InvalidInputFileError } from '@/errors/invalid-input-file-error';

export const verifyInputFile = (inputFilePath: any): void => {
    if (typeof inputFilePath !== 'string' || !inputFilePath) {
        throw new InvalidInputFileError();
    }

    const filePath = join(process.cwd(), inputFilePath);
    const isValidFile = !existsSync(filePath) ||
        !lstatSync(filePath).isFile() ||
        extname(filePath) !== config.INPUT_FILE_EXT;
    if (isValidFile) {
        throw new InvalidInputFileError();
    }
};

export const readInput = async (inputFilePath: string): Promise<string[][]> => {
    const rawInput = await fsp.readFile(inputFilePath, 'utf-8');
    return (await parse(rawInput)) as string[][]
};