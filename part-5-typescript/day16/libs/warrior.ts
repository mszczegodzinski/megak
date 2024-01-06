export class Warrior {
  constructor(
    private _name: string,
    private _hitPoints: number,
    private _hp: number,
  ) {
    this._name = _name;
    this._hitPoints = _hitPoints;
    this._hp = _hp;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = value;
  }

  get name(): string {
    return this._name;
  }

  get hitPoints(): number {
    return this._hitPoints;
  }

  levelUp() {
    this._hitPoints *= 1.1;
    this._hp *= 1.1;
  }
}
