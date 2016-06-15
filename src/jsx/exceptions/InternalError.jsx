import MyException from "./MyException";


export default class InvalidFormatError extends MyException {
    constructor(message) {
        super("Internal error: " + message);
    }
}
