import { ChatInputCommandInteraction, TextChannel, User, EmbedBuilder } from 'discord.js';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import crypto from 'crypto';

import Meme from '../Models/Meme';
import Config from '../Models/Config';
import { configGuard } from '../Helpers/Guards';
import { openAI } from '../Utilities/OpenAI';
import { chatMessages } from '../Utilities/ChatMsgArray';

export const memeHandler = async (interaction: ChatInputCommandInteraction) => {
    let totalNumber: number, 
        link: string;
    
    // query data from mongodb
    const memeData = await Meme.find({category: interaction.options.getString("category")});
    
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
    
    const messageManager = interaction.channel.messages,
          amount = interaction.options.getNumber("n") as number,
          targetUser = interaction.options.getUser("target") as User;
    
    await interaction.deferReply({ephemeral: true});
    
    if (targetUser) {
        await messageManager.fetch().then(async messages => {
            await Promise.all(messages.filter(message => message.author.id === targetUser.id)
                .first(amount)
                .map(async message => await message.delete()));
        });
        await interaction.editReply({content: `已删除${amount}条**${targetUser.username}**的消息`});
    } else {
        await messageManager.fetch({limit: amount}).then(async messages => {
            await Promise.all(messages.map(async message => await message.delete()));
        });
        await interaction.editReply({content: `已删除${amount}条消息`});
    }
};

export const changeWelcomeChannelHandler = async (interaction: ChatInputCommandInteraction) => {
    const optionWelcomeChannel = interaction.options.getChannel("channel");
    let guildConfig = await Config.findOne({guildId: interaction.guildId});
    
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

export const chatHandler = async (interaction: ChatInputCommandInteraction) => {
    const userPrompt: ChatCompletionMessageParam = {
        role: 'user',
        content: interaction.options.getString("message") as string
    }
    
    chatMessages.push(userPrompt);
    
    await interaction.deferReply({ephemeral: false});
    
    const completion = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatMessages
    });
    
    /* 
     * push the response message (ChatCompletionRequestMessage object) 
     * to the chatMessages array
     * */
    chatMessages.push(completion.choices[0].message!);
    
    const embedReply = new EmbedBuilder()
        .setColor("#FFFBAC")
        .setTitle(`\\> ${interaction.options.getString("message") as string}`)
        .setDescription(`${completion.choices[0].message?.content as string}`);
    
    await interaction.editReply({ embeds: [embedReply] });
};

export const clearChatHandler = async (interaction: ChatInputCommandInteraction) => {
    chatMessages.splice(1);
    
    await interaction.reply("已清除聊天机器人的对话上下文");
};
