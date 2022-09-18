import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const clearCommand = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("清除掉n条信息，n为给定的参数。")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addNumberOption(option =>
        option.setName("n")
            .setDescription("清除的信息条数")
            .setRequired(true)
    );
    
export default clearCommand;