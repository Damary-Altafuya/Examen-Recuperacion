export class CreateTvShowDto {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly director: string,
    public readonly investment: number,
    public readonly cast: string,
    public readonly version: number
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateTvShowDto?] {
    const { code, name, director, investment, cast, version } = props;

    if (!code || typeof code !== 'string') {
      return ['El campo code es obligatorio y debe ser una cadena de texto', undefined];
    }

    if (!name || typeof name !== 'string') {
      return ['El campo name es obligatorio y debe ser una cadena de texto', undefined];
    }

    if (!director || typeof director !== 'string') {
      return ['El campo director es obligatorio y debe ser una cadena de texto', undefined];
    }

    if (!investment || typeof investment !== 'number') {
      return ['El campo investment es obligatorio y debe ser un número', undefined];
    }

    if (!cast || typeof cast !== 'string') {
      return ['El campo cast es obligatorio y debe ser una cadena de texto', undefined];
    }

    if (!version || typeof version !== 'number') {
      return ['El campo version es obligatorio y debe ser un número', undefined];
    }

    return [undefined, new CreateTvShowDto(code, name, director, investment, cast, version)];
  }
}
