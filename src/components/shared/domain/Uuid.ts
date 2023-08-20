import { v4 as uuidv4, validate } from "uuid";

export default class Uuid {
  private _value: string;
  constructor(value: string) {
    this.ensureIsValidUuid(value);
    this._value = value;
  }

  static random(): Uuid {
    return new Uuid(uuidv4());
  }

  get value(): string {
    return this._value;
  }

  equals(other: Uuid): boolean {
    return this._value === other.value;
  }

  toString(): string {
    return this._value;
  }

  private ensureIsValidUuid(id: string) {
    if (!validate(id)) {
      throw new Error(`${Uuid.name} does not allow the value ${id}`);
    }
  }
}
