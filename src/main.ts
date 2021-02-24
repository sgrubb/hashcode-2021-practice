import { verifyInputFile, readInput } from '@/io/input-reader';
import { verifyOutputDirectory, getOutputFilePathForInputFile, writeOutput } from '@/io/output-writer';

const run = async (): Promise<void> => {
    try {
        const inputFilePath = process.argv[2];
        const outputDirectoryPath = process.argv[3];
        verifyInputFile(inputFilePath);
        verifyOutputDirectory(outputDirectoryPath);
        const outputFilePath = getOutputFilePathForInputFile(outputDirectoryPath, inputFilePath);

        const input = await readInput(inputFilePath);

        writeOutput(outputFilePath, input);
    } catch (e: any) {
        if (e instanceof Error) {
            console.log(`Error: ${e.message}`);
        }
    }
};

run();