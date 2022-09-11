import { GuildMember, TextChannel } from "discord.js";

import config from '../JSON/config.json';

export const readyHandler = () => {
    console.log(">>Bot is Online<<");
};

export const memberAddHandler = async (member: GuildMember) => {
    let welcomeChannel = member.guild.channels.cache.get(config.welcome_channel) as TextChannel;
    await welcomeChannel.send(`${member}加入了频道，我们鼓掌。`);
}