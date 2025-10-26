
export default class Score {
  id: string;
  userId: string;
  round:number;
  value: number;

  constructor(id: string, userId: string, round:number, value: number) {
    this.id = id;
    this.userId = userId;
    this.round = round;
    this.value = value;
  }
}