import { ChatInputCommandInteraction, Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "discord.js";
import * as dotenv from 'dotenv';
import HashMap from "hashmap";

import { connectMongoDB } from "./MiddleWare/DBConnection";
import { memberAddHandler, readyHandler } from "./Handler/Handler";
import commands from './Command/AllInOne';
import commandHandlers from "./Handler/CommandHandler";

//#region Pre-config
dotenv.config();
//#endregion

//#region declaration
const TOKEN = process.env.TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const DB_URL = process.env.DB_URL as string;

const rest = new REST({ version: '10' }).setToken(TOKEN);

const fuyouYuuna = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]});

const commandsMap: HashMap<string, (interaction: ChatInputCommandInteraction) => Promise<void>> = new HashMap();
//#endregion

//#region setup
for (let i = 0; i < commands.length; i++) {
    commandsMap.set(commands[i].name, commandHandlers[i]);
}
//#endregion

//#region Events
fuyouYuuna.once('ready', readyHandler);

fuyouYuuna.on("guildMemberAdd", memberAddHandler);
fuyouYuuna.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    let handler = commandsMap.get(interaction.commandName) as ((interaction: ChatInputCommandInteraction) => Promise<void>);
    handler(interaction);
});
//#endregion

// launcher
(async () => {
    try {
        await connectMongoDB(DB_URL);
        
        console.log('Started refreshing app (/) commands.');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID), 
            { body: commands }
        );
        console.log('Successfully reloaded app (/) commands.');
        
        await fuyouYuuna.login(TOKEN);
    } catch (err) {
        console.error(err);
    }
})();
