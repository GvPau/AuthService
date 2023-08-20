export default abstract class DateValueObject {
  public value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  equals(other: DateValueObject): boolean {
    return this.value === other.value;
  }
}
