import { BASE_URL } from "../utils/constants";

export class LancerService {

  
  static async fecthLancer(address: string) {
    return fetch(`${BASE_URL}/lancer/${address}`, {
      method: "GET",
    }).then((res) => res.json());
  }

  static async createLancerProfile(data: any) {
    console.log({ BASE_URL });
    return fetch(`${BASE_URL}/lancer/register`, {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  }

  // static async findOrganizationByAddress(address: string) {
  //   return fetch(`${BASE_URL}/organization/admin/${address}`, {
  //     method: "GET",
  //   }).then((res) => res.json());
  // }
}
