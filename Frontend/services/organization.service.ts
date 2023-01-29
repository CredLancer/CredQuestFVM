import { BASE_URL } from "../utils/constants";

export class OrganizationService {
  static async createOrganizationProfile(data: any) {
    console.log({ BASE_URL });
    return fetch(`${BASE_URL}/organization`, {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  }
}
