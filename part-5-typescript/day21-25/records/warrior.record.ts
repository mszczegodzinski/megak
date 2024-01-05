import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
  public id?: string;
  public readonly name: string;
  public readonly power: number;
  public readonly defense: number;
  public readonly stamina: number;
  public readonly agility: number;
  public wins?: number;

  constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) {
    const { id, name, power, defense, stamina, wins, agility } = obj;

    const stats = [power, defense, stamina, agility];
    const sum = stats.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );

    for (const stat of stats) {
      if (stat < 1) {
        throw new ValidationError(
          `Każda ze statystyk musi wynosić minimum 1, Ta zasada została złamana.`,
        );
      }
    }

    if (sum !== 10) {
      throw new ValidationError(
        `Suma wszystkich statystyk musi wynosić 10. Aktualnie jest to ${sum}.`,
      );
    }

    if (name.length < 3 && name.length > 50) {
      throw new ValidationError(
        `Nick powinien być dłuższy niż 3 znaki i krótszy niż 50. Aktualnie jest to ${name.length}`,
      );
    }

    this.id = id ?? uuid();
    this.name = name;
    this.power = power;
    this.defense = defense;
    this.stamina = stamina;
    this.agility = agility;
    this.wins = wins ?? 0;
  }

  async insert(): Promise<string> {
    await pool.execute(
      'INSERT INTO `warriors`(`id`, `name`, `power`, `defense`, `stamina`, `agility`, `wins`) VALUES(:id, :name, :power, :defense, :stamina, :agility, :wins)',
      {
        id: this.id,
        name: this.name,
        power: this.power,
        defense: this.defense,
        stamina: this.stamina,
        agility: this.agility,
        wins: this.wins,
      },
    );
    return this.id;
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `warriors` SET `name` = :name WHERE `id` = :id',
      {
        id: this.id,
        name: this.name,
      },
    );
  }

  static async getOne(id: string): Promise<WarriorRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `warrior` WHERE `id` = :id',
      {
        id,
      },
    )) as WarriorRecordResult;
    return results.length === 0 ? null : new WarriorRecord(results[0]);
  }

  static async listAll(): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `warrior`',
    )) as WarriorRecordResult;
    return results.map((obj) => new WarriorRecord(obj));
  }

  static async listTop(topCount: number): Promise<WarriorRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount',
      {
        topCount,
      },
    )) as WarriorRecordResult;
    return results.map((obj) => new WarriorRecord(obj));
  }

  static async isNameTaken(name: string): Promise<boolean> {
    const [results] = (await pool.execute(
      'SELECT * FROM `warriors` WHERE `name` =:name',
      {
        name,
      },
    )) as WarriorRecordResult;
    return results.length > 0;
  }
}
