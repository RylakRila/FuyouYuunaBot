import { ChatInputCommandInteraction, TextChannel, User } from 'discord.js';
import crypto from 'crypto';

import Meme from '../Model/Meme';
import Config from '../Model/Config';
import deleteMsgByUser from '../MiddleWare/DeleteMsgByUser';

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
    let messageManager = interaction.channel.messages;
    
    let amount = interaction.options.getNumber("n")!;
    let targetUser = interaction.options.getUser("target") as User;
    
    await interaction.deferReply({ephemeral: true});
    
    if (targetUser) {
        deleteMsgByUser(messageManager, targetUser, amount);
        await interaction.editReply({content: `已删除${amount}条**${targetUser.username}**的消息`});
        
        return;
    }
    
    await messageManager.fetch({limit: amount}).then(async messages => {
        await Promise.all(
            messages.map(async message => await message.delete())
        );
    });
    
    await interaction.editReply({content: `已删除${amount}条消息`});
};

const changeWelcomeChannelHandler = async (interaction: ChatInputCommandInteraction) => {
    let optionWelcomeChannel = interaction.options.getChannel("channel");
    
    if (!(optionWelcomeChannel instanceof TextChannel)) {
        await interaction.reply({content: "请提供一个文本频道", ephemeral: true});
        return;
    }
    
    let existedConfig = await Config.find({guildId: interaction.guildId});
    
    // if guild id does not exist in database, create a new one
    if (existedConfig.length === 0) {
        Config.create({
            guildId: interaction.guildId,
            configs: [
                {
                    key: "welcomeChannelId",
                    value: optionWelcomeChannel.id
                }
            ]
        });
        
        await interaction.reply({content: `欢迎信息将会在这个频道发送：${optionWelcomeChannel.name}`, ephemeral: true});
        return;
    }
    
    // update the existed config
    const newWelcomeChannel = new Config({
        "_id": existedConfig[0]._id,
        "guildId": existedConfig[0].guildId,
        "configs": [
            {
                key: "welcomeChannelId",
                value: optionWelcomeChannel.id
            }
        ]
    });
    
    await Config.updateOne({guildId: interaction.guildId}, newWelcomeChannel);
    
    await interaction.reply({content: `欢迎频道ID已更改为：${optionWelcomeChannel.name}`, ephemeral: true});
};

const commandHandlers = [
    memeHandler, clearHandler, changeWelcomeChannelHandler
];
export default commandHandlers;
