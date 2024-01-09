import { ChatCompletionMessageParam } from "openai/resources/chat";

const initialContext: ChatCompletionMessageParam = {
    role: 'system',
    content: 'you are a helpful assistant bot'
}

export const chatMessages: ChatCompletionMessageParam[] = [ initialContext ]
