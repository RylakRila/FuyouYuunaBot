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
    await interaction.reply(`删除掉了${amount}条信息！`);
    
    setTimeout(async () => await interaction.deleteReply(), 1500);
};

const changeWelcomeChannelHandler = async (interaction: ChatInputCommandInteraction) => {
    let welcomeChannelId = interaction.options.getString("channel-id")!;
    let guildId = interaction.guildId!;
    
    let existedConfig = await Config.find({guildId: guildId});
    
    console.log(existedConfig[0].configs);
    console.log(welcomeChannelId);
    
    // const welcomeChannel = new Config({
    //     "_id": existedConfig[0]._id,
    //     "key": "welcomeChannelId",
    //     "value": welcomeChannelId
    // });
    
    // await Config.updateOne({key: "welcomeChannelId"}, welcomeChannel);
    
    // await interaction.reply({content: `欢迎频道ID已更改为：${welcomeChannelId}`, ephemeral: true});
};

const commandHandlers = [
    memeHandler, clearHandler, changeWelcomeChannelHandler
];
export default commandHandlers;
