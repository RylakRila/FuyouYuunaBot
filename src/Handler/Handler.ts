import { GuildMember, TextChannel } from "discord.js";

import Config from "../Model/config";

export const readyHandler = () => {
    console.log(">>Bot is Online<<");
};

export const memberAddHandler = async (member: GuildMember) => {
    let configData = await Config.find({key: "welcomeChannelId"});
    let welcomeChannel = member.guild.channels.cache.get(configData[0].value) as TextChannel;
    await welcomeChannel.send(`${member}加入了频道，我们鼓掌。`);
}
