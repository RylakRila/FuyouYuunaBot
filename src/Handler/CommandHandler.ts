import { ChatInputCommandInteraction, TextChannel } from 'discord.js';
import crypto from 'crypto';

import Meme from '../Model/Meme';
import Config from '../Model/Config';

const memeHandler = async (interaction: ChatInputCommandInteraction) => {
    let totalNumber: number, link: string;
    
    // query data from mongodb
    let memeData = await Meme.find({category: interaction.options.getString("category")});
    
    switch (interaction.options.getString("category")) {
        case "yuyuyu":
            totalNumber = memeData[0].images.length;
            link = memeData[0].images[crypto.randomInt(0, totalNumber)];
            break;
        default:
            link = `没有在该类中的梗图：${interaction.options.getString("category")}`;
            break;
    }
    
    await interaction.reply(link);
};

const clearHandler = async (interaction: ChatInputCommandInteraction) => {
    let amount = interaction.options.getNumber("n")!;
    
    await (<TextChannel>interaction.channel).bulkDelete(amount, true);
    await interaction.reply({content: `删除掉了${amount}条信息！`, ephemeral: true});
};

const changeWelcomeChannelHandler = async (interaction: ChatInputCommandInteraction) => {
    let optionWelcomeChannelId = interaction.options.getString("channel-id");
    
    let existedConfig = await Config.find({guildId: interaction.guildId});
    
    // if guild id does not exist in database, create a new one
    if (existedConfig.length === 0) {
        Config.create({
            guildId: interaction.guildId,
            configs: [
                {
                    key: "welcomeChannelId",
                    value: optionWelcomeChannelId
                }
            ]
        });
        
        await interaction.reply({content: `欢迎信息将会在这个频道发送：${optionWelcomeChannelId}`, ephemeral: true});
        return;
    }
    
    const welcomeChannel = new Config({
        "_id": existedConfig[0]._id,
        "guildId": interaction.guildId,
        "configs": [
            {
                key: "welcomeChannelId",
                value: optionWelcomeChannelId
            }
        ]
    });
    
    await Config.updateOne({guildId: interaction.guildId}, welcomeChannel);
    
    await interaction.reply({content: `欢迎频道ID已更改为：${optionWelcomeChannelId}`, ephemeral: true});
};

const commandHandlers = [
    memeHandler, clearHandler, changeWelcomeChannelHandler
];
export default commandHandlers;
