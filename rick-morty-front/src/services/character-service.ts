import axios from "axios";
import { PaginatedCharacters } from "../entities/characters";

const DOMAIN = "https://rickandmortyapi.com/api";

/* eslint-disable import/prefer-default-export */
export async function getAllCharacters(
  page?: number
): Promise<PaginatedCharacters> {
  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.append("page", page.toString());
  }
  return axios
    .get(`${DOMAIN}/character`, { params: queryParams })
    .then((response) => response.data);
}
