import { BASE_URL } from "../utils/constants";

export class ProposalService {
  static async createProposal({ questId, ...proposal }: any) {
    return fetch(`${BASE_URL}/proposal/${questId}`, {
      body: JSON.stringify(proposal),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  }

  static async fetchProposalsbyQuestId(questID: number) {
    return fetch(`${BASE_URL}/proposal/questId/${questID}`, {
      method: "GET",
    }).then((res) => res.json());
  }
}
