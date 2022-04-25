export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface Character {
  id: Number;
  name: String;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
