export interface QuestProposalType {
  id: string;
  proposer: QuestProposer;
  blockNumber: number;
  file: {
    approxCompletionTime: string;
    cid: string;
    description: string;
  };
  status: ProposalStatus;
  questId: string;
  fileCID: string;
  workCID?: string;
}

export interface LancerProposal {}

export enum ProposalStatus {
  Proposed = "Proposed",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Awarded = "Awarded",
}

export interface QuestProposer {
  address: string;
  description: string;
  email: string;
  imageCID: string;
  name: string;
  nonce: string;
  registered: boolean;
}
