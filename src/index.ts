import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "discord.js";
import * as dotenv from 'dotenv';

import { connectMongoDB } from "./Helpers/DBConnection";
import { keywordHandler, memberAddHandler, readyHandler } from "./Handlers/Handler";
import { commands, commandHandlerMap } from './Utilities/PassCommands';

//#region Pre-config
dotenv.config();
//#endregion

//#region declaration
const TOKEN = process.env.TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const DB_URL = process.env.DB_URL as string;

const rest = new REST({ version: '10' }).setToken(TOKEN);

export const fuyouYuuna = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});
//#endregion

//#region Events
fuyouYuuna.once('ready', readyHandler);

fuyouYuuna.on("guildMemberAdd", memberAddHandler);
fuyouYuuna.on("messageCreate", keywordHandler);
fuyouYuuna.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    commandHandlerMap.get(interaction.commandName)!(interaction);
});
//#endregion

// launcher
(async () => {
    await connectMongoDB(DB_URL);
        
    console.log('Started refreshing app (/) commands.');
    await rest.put(
        Routes.applicationCommands(CLIENT_ID), 
        { body: commands }
    ).catch(err => console.error(err));
    console.log('Successfully reloaded app (/) commands.');
        
    await fuyouYuuna.login(TOKEN);
})();
