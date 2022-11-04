import { GuildMember, TextChannel } from "discord.js";

import Config from "../Model/Config";

export const readyHandler = () => {
    console.log(">>Bot is Online<<");
};

export const memberAddHandler = async (member: GuildMember) => {
    let guildConfigs = await Config.findOne({ guildId: member.guild.id });
    let welcomeChannel = member.guild.channels.cache.get(
        guildConfigs?.configs.find(config => config.key === "welcomeChannelId")?.value
    ) as TextChannel;
    
    await welcomeChannel.send(`${member}加入了频道，我们鼓掌。`);
}
