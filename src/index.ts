import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import * as dotenv from 'dotenv';
import config from './config.json';

const yuyuyuBot = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]});

yuyuyuBot.on('ready', () => {
    console.log('Ready!');
});

yuyuyuBot.on("guildMemberAdd", async member => {
    let welcomeChannel = yuyuyuBot.channels.cache.get(config.welcome_channel) as TextChannel;
    await welcomeChannel.send(`${member}加入了频道，我们鼓掌。`);
});

dotenv.config();
yuyuyuBot.login(process.env.TOKEN);
