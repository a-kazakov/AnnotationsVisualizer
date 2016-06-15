import MyException from "./MyException";


export default class InvalidFormatError extends MyException {
    constructor(message) {
        super("Invalid format: " + message);
    }
}
