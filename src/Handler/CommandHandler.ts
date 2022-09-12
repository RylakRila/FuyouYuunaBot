import { ChatInputCommandInteraction } from 'discord.js';
import crypto from 'crypto';

import resources from '../JSON/resource.json';

export async function memeHandler(interaction: ChatInputCommandInteraction) {
    let totalNumber = resources.memes.length;
    let link = resources.memes[crypto.randomInt(0, totalNumber)];
    
    interaction.reply(link);
}