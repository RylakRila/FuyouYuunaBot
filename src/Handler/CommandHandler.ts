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
            totalNumber = memeData[0].options.length;
            link = memeData[0].options[crypto.randomInt(0, totalNumber)];
            break;
        default:
            link = `没有在该类中的梗图：${interaction.options.getString("category")}`;
            break;
    }
    
    await interaction.reply(link);
};

const clearHandler = async (interaction: ChatInputCommandInteraction) => {
    if (!(interaction.channel instanceof TextChannel)) return;
    
    let amount = interaction.options.getNumber("n")!;
    let targetUser = interaction.options.getUser("target")!;
    
    let messageManager = interaction.channel.messages;
    
    if (targetUser) {
        await interaction.deferReply({ephemeral: true});
        
        await messageManager.fetch().then(async messages => {
            let targetedMessages = messages.filter(message => message.author.id === targetUser.id);
            await Promise.all(targetedMessages.first(amount).map(async message => await message.delete()));
        });
        
        await interaction.editReply({content: `已删除${amount}条${targetUser.username}的消息`});
        
        return;
    }
    
    await interaction.deferReply({ephemeral: true});
    
    await messageManager.fetch({limit: amount}).then(async messages => {
        await Promise.all(messages.map(async message => await message.delete()));
    });
    
    await interaction.editReply({content: `已删除${amount}条消息`});
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
