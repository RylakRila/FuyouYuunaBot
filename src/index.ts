import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from 'dotenv';

const yuyuyuBot = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
]});

yuyuyuBot.on('ready', () => {
    console.log('Ready!');
});

dotenv.config();
yuyuyuBot.login(process.env.TOKEN);
