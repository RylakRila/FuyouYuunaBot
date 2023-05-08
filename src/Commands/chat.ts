import { SlashCommandBuilder } from "discord.js";

const chatCommand = new SlashCommandBuilder()
    .setName("chat")
    .setDescription("输入对话与机器人聊天")
    .addStringOption(option =>
        option.setName("message")
            .setDescription("要输入的对话上下文")
            .setRequired(true)
    );

export default chatCommand;
