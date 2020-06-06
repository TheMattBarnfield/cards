import { Card } from "./card";

export default interface User {
  id: string,
  name: string,
  lastCardDrawn: Card | undefined
}