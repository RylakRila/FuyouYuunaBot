import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const clearCommand = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("清除掉n条信息，n为给定的参数。")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addNumberOption(option =>
        option.setName("n")
            .setDescription("清除的消息条数")
            .setRequired(true))
    .addUserOption(option => 
        option.setName("target")
            .setDescription("删除特定用户的消息"));
    
export default clearCommand;