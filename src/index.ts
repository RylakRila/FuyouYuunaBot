import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "discord.js";
import * as dotenv from 'dotenv';

import { clearHandler, memeHandler } from "./Handler/CommandHandler";
import { memberAddHandler, readyHandler } from "./Handler/Handler";
import commands from './Command/AllInOne';

dotenv.config();
const TOKEN = process.env.TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;

const rest = new REST({ version: '10' }).setToken(TOKEN);

const nogiSonoko = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]});

nogiSonoko.once('ready', readyHandler);

nogiSonoko.on("guildMemberAdd", memberAddHandler);

nogiSonoko.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    switch(interaction.commandName) {
        case "meme":
            await memeHandler(interaction);
            break;
        case "clear":
            await clearHandler(interaction);
            break;
        default:
            break;
    }
});

(async () => {
    try {
        console.log('Started refreshing app (/) commands.');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID), 
            { body: commands }
        );
        
        nogiSonoko.login(TOKEN);
    } catch (err) {
        console.error(err);
    }
})();
