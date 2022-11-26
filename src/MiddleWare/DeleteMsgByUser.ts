import { MessageManager, User } from "discord.js";

const deleteMsgByUser = async (msgManager: MessageManager, targetUser: User, amount: number) => {
    await msgManager.fetch().then(async message => {
        let targetedMessages = message.filter(message => message.author.id === targetUser.id);
        
        await Promise.all(
            targetedMessages.first(amount).map(async message => await message.delete())
        );
    });
}

export default deleteMsgByUser;