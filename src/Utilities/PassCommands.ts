import { ChatInputCommandInteraction } from "discord.js";

import changeWelcomeChannelCommand from "../Commands/changeWelcomeChannel";
import clearCommand from "../Commands/clear";
import memeCommand from "../Commands/meme";
import { changeWelcomeChannelHandler, clearHandler, memeHandler } from "../Handlers/CommandHandler";

// Command list posted to Discord API
const commands = [ 
    memeCommand, clearCommand, changeWelcomeChannelCommand
];

const commandHandlerMap = new Map<string, (interaction: ChatInputCommandInteraction) => Promise<void>>();

commandHandlerMap.set(memeCommand.name, memeHandler);
commandHandlerMap.set(clearCommand.name, clearHandler);
commandHandlerMap.set(changeWelcomeChannelCommand.name, changeWelcomeChannelHandler);

export { commands, commandHandlerMap };