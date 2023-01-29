import { BASE_URL } from "../utils/constants";

export class OrganizationService {
  static async createOrganizationProfile(data: any) {
    return fetch(`${BASE_URL}/organization`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {},
    }).then((res) => res.json());
  }
}
