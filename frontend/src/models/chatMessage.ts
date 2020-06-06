export interface ChatMessage {
  id: number
  fromServer: boolean
  sender: string
  message: string
}