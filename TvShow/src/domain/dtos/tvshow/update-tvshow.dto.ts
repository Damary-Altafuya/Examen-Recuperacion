export class UpdateTvShowDto {
  private constructor(
    public readonly id: number,
    public readonly code?: string,
    public readonly name?: string,
    public readonly director?: string,
    public readonly investment?: number,
    public readonly cast?: string,
    public readonly version?: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.code !== undefined) returnObj.code = this.code;
    if (this.name !== undefined) returnObj.name = this.name;
    if (this.director !== undefined) returnObj.director = this.director;
    if (this.investment !== undefined) returnObj.investment = this.investment;
    if (this.cast !== undefined) returnObj.cast = this.cast;
    if (this.version !== undefined) returnObj.version = this.version;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdateTvShowDto | undefined] {
    const { id, code, name, director, investment, cast, version } = props;

    if (!id || isNaN(Number(id))) {
      return ['El campo id debe ser un número válido', undefined];
    }

    if (!code && !name && !director && !investment && !cast && version === undefined) {
      return ['Al menos una propiedad debe ser proporcionada', undefined];
    }

    return [undefined, new UpdateTvShowDto(id, code, name, director, investment, cast, version)];
  }
}
