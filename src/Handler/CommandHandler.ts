import { ChatInputCommandInteraction, TextChannel, User } from 'discord.js';
import crypto from 'crypto';

import Meme from '../Model/Meme';
import Config from '../Model/Config';
import deleteMsgByUser from '../MiddleWare/DeleteMsgByUser';
import { configGuard } from '../MiddleWare/Guards';

export const memeHandler = async (interaction: ChatInputCommandInteraction) => {
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

export const clearHandler = async (interaction: ChatInputCommandInteraction) => {
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

export const changeWelcomeChannelHandler = async (interaction: ChatInputCommandInteraction) => {
    let optionWelcomeChannel = interaction.options.getChannel("channel")!,
        guildConfig = await Config.findOne({guildId: interaction.guildId});
    
    if (!(optionWelcomeChannel instanceof TextChannel)) {
        await interaction.reply({content: "请提供一个文本频道", ephemeral: true});
        return;
    }

    guildConfig = await configGuard(interaction, guildConfig);
    
    // determine if the config array has the "welcomeChannelId" config key
    if (guildConfig.configs.some(config => config.key === "welcomeChannelId")) {
        // if the config array has the "welcomeChannelId" config key, then change the value
        guildConfig.configs.find(config => config.key === "welcomeChannelId")!.value = optionWelcomeChannel.id;
    } else {
        // if not, then push a new config key-value pair
        guildConfig.configs.push({
            key: "welcomeChannelId",
            value: optionWelcomeChannel.id
        });
    }
    await guildConfig.save();
    
    await interaction.reply({content: `欢迎频道将在该频道发送：${optionWelcomeChannel.name}`, ephemeral: true});
};
