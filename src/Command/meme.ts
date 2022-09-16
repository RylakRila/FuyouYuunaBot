import { SlashCommandBuilder } from "discord.js";

const memeCommand = new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Replies with one randome meme link in the database")
    .addStringOption(option =>  
        option.setName('category')
            .setDescription('The category of the meme going to send')
            .setRequired(true));

export default memeCommand;