import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetails = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: string;
  maxCP: number;
  maxHP: number;
};

export type PokemonOption = {
  value: PokemonDetails['id'];
  label: PokemonDetails['name'];
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id?: string, name?: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id,
      name,
    },
  });

  return {
    pokemon: data?.pokemon ?? null,
    ...queryRes,
  };
};
