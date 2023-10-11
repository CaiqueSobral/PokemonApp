export interface PokemonInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  sprite3d: string;
  captureRate: number;
  evolutionChainId: number;
  habitat: string;
  types: Array<string>;
}

export interface EvolutionChainInterface {
  id: number;
  species: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface HabitatInterface {
  name: string;
  id: number;
}
