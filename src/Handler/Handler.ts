import { GuildMember, Message, TextChannel } from "discord.js";
import crypto from "crypto";

import Config from "../Model/Config";
import Keyword from "../Model/Keywords";

export const readyHandler = () => {
    console.log(">>Bot is Online<<");
};

export const memberAddHandler = async (member: GuildMember) => {
    let guildConfigs = await Config.find({ guildId: member.guild.id });
    let welcomeChannel = member.guild.channels.cache.get(
        guildConfigs[0].configs.find(config => config.key === "welcomeChannelId")!.value
    ) as TextChannel;
    
    await welcomeChannel.send(`${member}加入了频道，我们鼓掌。`);
}

export const keywordHandler = async (message: Message<boolean>) => {
    const SUMO_GUILD_ID = process.env.SUMO_GUILD_ID as string;

    if (message.guildId !== SUMO_GUILD_ID || 
        message.author.bot) return;
    
    let keywordDocs = Keyword.find();
    
    (await keywordDocs).forEach(keywordDoc => {
        if (keywordDoc.keywords.some(keyword => message.content.toLowerCase().includes(keyword))) {
            let total = keywordDoc.responses.length;
            message.reply(keywordDoc.responses[crypto.randomInt(0, total)]);
        }
    });
}
