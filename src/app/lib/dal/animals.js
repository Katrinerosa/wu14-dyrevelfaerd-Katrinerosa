import { getApiData } from "../api";

export async function getAnimals() {
  return getApiData("animals");
}
