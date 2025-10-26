export default class Player {
  name: string;
  id: string;
  initials: string;
  color: string;

  constructor(name: string, id: string, initials: string, color: string) {
    this.name = name;
    this.id = id;

    this.initials = initials;
    this.color = color;
  }
}
