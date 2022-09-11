import { Client, ClientOptions } from "discord.js";

class Bot extends Client {
    prefix: string;
    
    constructor(intents: ClientOptions, prefix: string) {
        super(intents);
        
        this.prefix = prefix;
    }
    
    async start(token: string) {
        this.login(token);
    }
}

export default Bot;