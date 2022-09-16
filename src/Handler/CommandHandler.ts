import { ChatInputCommandInteraction } from 'discord.js';
import crypto from 'crypto';

import resources from '../JSON/resource.json';

export async function memeHandler(interaction: ChatInputCommandInteraction) {
    let totalNumber: number, link: string = "";
    
    switch (interaction.options.getString("category")?.toLowerCase()) {
        case "yuyuyu":
            totalNumber = resources.memes.yuyuyu.length;
            link = resources.memes.yuyuyu[crypto.randomInt(0, totalNumber)];
            break;
        default:
            link = `No link found in category: ${interaction.options.getString("category")}`;
            break;
    }
    
    interaction.reply(link);
}