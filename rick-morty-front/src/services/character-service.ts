import axios from "axios";
import { Character, PaginatedCharacters } from "../entities/characters";

const DOMAIN = "https://rickandmortyapi.com/api";

export async function getAllCharacters(
  page?: number,
  name?: string
): Promise<PaginatedCharacters> {
  return axios
    .get(`${DOMAIN}/character`, { params: { page, name } })
    .then((response) => response.data);
}

export async function getCharacter(id: string): Promise<Character> {
  return axios
    .get(`${DOMAIN}/character/${id}`)
    .then((response) => response.data);
}
