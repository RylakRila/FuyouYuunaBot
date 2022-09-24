import { SlashCommandBuilder } from "discord.js";

const memeCommand = new SlashCommandBuilder()
    .setName("meme")
    .setDescription("随机回复一个数据库中的meme图")
    .addStringOption(option =>  
        option.setName('category')
            .setDescription('meme图的类别')
            .setRequired(true)
            .addChoices(
                {name: "ゆゆゆ", value: "yuyuyu"}
            )
    );

export default memeCommand;