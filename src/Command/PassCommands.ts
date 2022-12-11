import { ChatInputCommandInteraction } from "discord.js";

import changeWelcomeChannelCommand from "./changeWelcomeChannel";
import clearCommand from "./clear";
import memeCommand from "./meme";
import { changeWelcomeChannelHandler, clearHandler, memeHandler } from "../Handler/CommandHandler";

// Command list posted to Discord API
const commands = [ 
    memeCommand, clearCommand, changeWelcomeChannelCommand
];

const commandHandlerMap = new Map<string, (interaction: ChatInputCommandInteraction) => Promise<void>>();

commandHandlerMap.set(memeCommand.name, memeHandler);
commandHandlerMap.set(clearCommand.name, clearHandler);
commandHandlerMap.set(changeWelcomeChannelCommand.name, changeWelcomeChannelHandler);

export { commands, commandHandlerMap };