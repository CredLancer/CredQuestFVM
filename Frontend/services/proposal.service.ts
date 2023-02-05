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
}
