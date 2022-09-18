import { ChatInputCommandInteraction, TextChannel } from 'discord.js';
import crypto from 'crypto';

import resources from '../JSON/resource.json';

export async function memeHandler(interaction: ChatInputCommandInteraction) {
    let totalNumber: number, link: string;
    
    switch (interaction.options.getString("category")?.toLowerCase()) {
        case "yuyuyu":
            totalNumber = resources.memes.yuyuyu.length;
            link = resources.memes.yuyuyu[crypto.randomInt(0, totalNumber)];
            break;
        default:
            link = `没有在该类中的梗图：${interaction.options.getString("category")}`;
            break;
    }
    
    await interaction.reply(link);
}

export async function clearHandler(interaction: ChatInputCommandInteraction) {
    let amount = interaction.options.getNumber("n")!;
    
    await (<TextChannel>interaction.channel).bulkDelete(amount, false);
    await interaction.reply(`删除掉了${amount}条信息！`);
    
    setTimeout(async () => await interaction.deleteReply(), 1000);
}