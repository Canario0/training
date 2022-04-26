import axios from "axios";
import { PaginatedCharacters } from "../entities/characters";

const DOMAIN = "https://rickandmortyapi.com/api";

/* eslint-disable import/prefer-default-export */
export async function getAllCharacters(
  page?: number,
  name?: string
): Promise<PaginatedCharacters> {
  return axios
    .get(`${DOMAIN}/character`, { params: { page, name } })
    .then((response) => response.data);
}
