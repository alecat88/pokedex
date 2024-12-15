
export type Pokemon = {
    id: string;
    name: string;
    number: string;
    types: string[];
    image: string;
  };

  export type PokemonWithDetails = Pokemon & {
      "weight": {
        "minimum": string,
        "maximum": string
      },
      "height": {
        "minimum": string,
        "maximum": string
      },
      "classification": string,
      "resistant": 
        string[],
      "weaknesses": string[],
      "fleeRate": number,
      "maxCP": number,
      "maxHP": number,
    
  }


  export type PokemonOption = {
    value: Pokemon['id'];
    label: Pokemon['name'];
  };