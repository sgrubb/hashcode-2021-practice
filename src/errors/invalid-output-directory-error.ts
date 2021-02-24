export class InvalidOutputDirectoryError extends Error {
    constructor() {
        super('Invalid output directory');
    }
}