import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

const changeWelcomeChannelCommand = new SlashCommandBuilder()
    .setName("change-welcome-channel")
    .setDescription("更改欢迎频道ID, 新ID将写入数据库。")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("选择欢迎频道")
        .setRequired(true)
    );

export default changeWelcomeChannelCommand;