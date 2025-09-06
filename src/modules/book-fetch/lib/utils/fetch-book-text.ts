import axios from "axios";
import { getFirstTwoChapters } from "./get-chapters";

export default async function fetchBookText(textUrl: string) {
  try {
    const response = await axios.get(textUrl);
    if (response.statusText !== "OK") return null;
    else return getFirstTwoChapters(response.data);
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
