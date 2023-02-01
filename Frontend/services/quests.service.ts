import { BASE_URL } from "../utils/constants";

const LIMIT = 10;
export class QuestService {
  static async fetchQuests(page = 1) {
    return fetch(`${BASE_URL}/quest?page=${page}&limit=${LIMIT}`, {
      method: "GET",
    }).then((res) => res.json());
  }

  static async createQuest(model: any) {
    console.log({ model });
    return fetch(`${BASE_URL}/quest`, {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
}
