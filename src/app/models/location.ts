export class Location {
  constructor(
    public id: string,
    public name: string,
    public dimension: string,
    public type: string,
    public residents: string[],
    public url: string,
  ) { }
}