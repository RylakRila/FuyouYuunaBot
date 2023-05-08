import { ChatCompletionRequestMessage } from "openai";

const initialContext: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'you are a helpful assistant bot'
}

export const chatMessages: ChatCompletionRequestMessage[] = [ initialContext ]
