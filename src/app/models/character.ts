import { Location } from "./location";

export class Character {
  constructor(
    public id: string,
    public image: string,
    public name: string,
    public status: string,
    public gender: string,
    public species: string,
    public type: string,
    public episode: string[],
    public location: Location,
    public origin: Location,
  ) { }
}