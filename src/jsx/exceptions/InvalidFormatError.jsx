export default class InvalidFormatError extends Error {
    constructor(message) {
        super("Invalid format: " + message);
    }
}
