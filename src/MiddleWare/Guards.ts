import { ChatInputCommandInteraction } from "discord.js";
import mongoose, { Document } from "mongoose";
import Config from "../Model/Config";

export const configGuard = async (
    interaction: ChatInputCommandInteraction, 
    configDocument: (Document & { 
        _id: mongoose.Types.ObjectId, configs: {}[] 
    }) | null
) => {
    if (configDocument) return configDocument;
    
    return await Config.create({
        guildId: interaction.guildId,
        configs: []
    });
}