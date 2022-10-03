import { ChatInputCommandInteraction, Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "discord.js";
import * as dotenv from 'dotenv';
import HashMap from "hashmap";

import { memberAddHandler, readyHandler } from "./Handler/Handler";
import commands from './Command/AllInOne';
import commandHandlers from "./Handler/CommandHandler";

// Pre-config
dotenv.config();

// declaration
const TOKEN = process.env.TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;

const rest = new REST({ version: '10' }).setToken(TOKEN);

const nogiSonoko = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]});

const commandsMap: HashMap<string, (interaction: ChatInputCommandInteraction) => Promise<void>> = new HashMap();

// setup
for (let i = 0; i < commands.length; i++) {
    commandsMap.set(commands[i].name, commandHandlers[i]);
}

// Events
nogiSonoko.once('ready', readyHandler);

nogiSonoko.on("guildMemberAdd", memberAddHandler);
nogiSonoko.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    let handler = commandsMap.get(interaction.commandName) as ((interaction: ChatInputCommandInteraction) => Promise<void>);
    handler(interaction);
});

// launcher
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
