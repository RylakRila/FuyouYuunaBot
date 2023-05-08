import { SlashCommandBuilder } from "discord.js";

const clearChatCommand = new SlashCommandBuilder()
    .setName("clear-chat")
    .setDescription("清楚聊天机器人的对话上下文");

export default clearChatCommand;
