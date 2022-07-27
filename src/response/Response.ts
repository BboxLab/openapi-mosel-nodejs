import { Token } from "../authentication/Token";

export class Response {
    token:Token;
    content:any;

    constructor(token:Token, content:any) {
        this.token = token;
        this.content = content;
    }
}
