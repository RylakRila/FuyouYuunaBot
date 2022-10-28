import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

const changeWelcomeChannelCommand = new SlashCommandBuilder()
    .setName("change-welcome-channel")
    .setDescription("更改欢迎频道ID, 新ID将写入数据库。")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option => option
        .setName("channel-id")
        .setDescription("欢迎频道的ID")
        .setRequired(true)
    );

export default changeWelcomeChannelCommand;