import { GatewayIntentBits } from "discord.js";
import * as dotenv from 'dotenv';

import Bot from "./Model/Bot";
import { memberAddHandler, readyHandler } from "./Handler/Handler";

import config from './JSON/config.json';

const yuyuyuBot = new Bot({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]}, config.prefix);

yuyuyuBot.once('ready', readyHandler);

yuyuyuBot.on("guildMemberAdd", memberAddHandler);

dotenv.config();
yuyuyuBot.start(process.env.TOKEN);
