import { existsSync, lstatSync, promises as fsp } from 'fs';
import { join, basename, extname } from 'path';
import { stringify } from 'async-csv';
import { config } from '@/config/config';
import { InvalidOutputDirectoryError } from '@/errors/invalid-output-directory-error';

export const verifyOutputDirectory = (outputDirectoryPath: any): void => {
    if (typeof outputDirectoryPath !== 'string' || !outputDirectoryPath) {
        throw new InvalidOutputDirectoryError();
    }

    const directoryPath = join(process.cwd(), outputDirectoryPath);
    if (!existsSync(directoryPath) || !lstatSync(directoryPath).isDirectory()) {
        throw new InvalidOutputDirectoryError();
    }
};

export const getOutputFilePathForInputFile = (outputDirectoryPath: string, inputFilePath: string) => {
    const outputFileName = basename(inputFilePath, extname(inputFilePath));
    const outputFile = `${outputFileName}${config.OUTPUT_FILE_EXT}`;
    return join(outputDirectoryPath, outputFile);
};

export const writeOutput = async (outputFilePath: string, output: string[][]): Promise<void> => {
    const rawOutput = await stringify(output);
    await fsp.writeFile(outputFilePath, rawOutput, 'utf-8');
};