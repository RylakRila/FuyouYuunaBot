import { ChatInputCommandInteraction } from "discord.js";

import changeWelcomeChannelCommand from "../Commands/changeWelcomeChannel";
import chatCommand from "../Commands/chat";
import clearCommand from "../Commands/clear";
import memeCommand from "../Commands/meme";
import { changeWelcomeChannelHandler, chatHandler, clearHandler, memeHandler } from "../Handlers/CommandHandler";

// Command list posted to Discord API
const commands = [ 
    memeCommand, clearCommand, changeWelcomeChannelCommand, chatCommand
];

const commandHandlerMap = new Map<string, (interaction: ChatInputCommandInteraction) => Promise<void>>();

commandHandlerMap.set(memeCommand.name, memeHandler);
commandHandlerMap.set(clearCommand.name, clearHandler);
commandHandlerMap.set(changeWelcomeChannelCommand.name, changeWelcomeChannelHandler);
commandHandlerMap.set(chatCommand.name, chatHandler);

export { commands, commandHandlerMap };