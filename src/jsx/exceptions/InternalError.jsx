export default class InvalidFormatError extends Error {
    constructor(message) {
        super("Internal error: " + message);
    }
}
