export default class Player {
  name: string;
  id: string;
  initials: string;
  color: string;
  score?: number = 0;
  totalScore?: number = 0;

  constructor(name: string, id: string, initials: string, color: string, score?: number, totalScore?: number) {
    this.name = name;
    this.id = id;
    this.score = score || 0;
    this.initials = initials;
    this.color = color;
    this.totalScore = totalScore || 0;
  }
}
