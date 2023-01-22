// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./OrganizationController.sol";

contract QuestController is Ownable, Pausable {
    enum ProposalStatus {
        Proposed,
        Accepted,
        Rejected
    }

    struct Quest {
        uint256 id;
        bytes cid;
        uint256 reward;
        uint256 orgId;
    }

    struct Proposal {
        uint256 id;
        bytes cid;
        address proposer;
        uint256 questId;
        ProposalStatus status;
    }

    mapping(uint256 => Quest) public quests; // f: (questId) -> quest
    mapping(uint256 => Proposal) public proposals; // f: (proposalId) -> proposal
    mapping(uint256 => mapping(address => uint256)) public proposalIds; // f: (questId, proposerAddress) -> proposalId

    uint256 public totalQuests;
    uint256 public totalProposals;

    OrganizationController public organizationController;

    event QuestCreated(
        uint256 questId,
        bytes questCID,
        uint256 reward,
        uint256 organizationId
    );
    event ProposalCreated(
        uint256 proposalId,
        bytes proposalCID,
        address proposer,
        uint256 questId
    );
    event ProposalStatusChanged(
        uint256 proposalId,
        ProposalStatus oldStatus,
        ProposalStatus newStatus
    );

    error InvalidOrganizationId();
    error Unauthorized();
    error InvalidValue();
    error InvalidQuestId();
    error InvalidProposalId();
    error ProposalAlreadySent();
    error ProposalAlreadyInSameStatus();
    error ProposalAlreadyRejected();

    constructor(OrganizationController _organizationController) {
        organizationController = _organizationController;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function createQuest(
        bytes calldata questCID,
        uint256 reward,
        uint256 orgId
    ) public payable whenNotPaused {
        if (!organizationController.exists(orgId))
            revert InvalidOrganizationId();
        if (organizationController.adminOf(orgId) != msg.sender)
            revert Unauthorized();
        if (msg.value != reward) revert InvalidValue();
        // TODO: Also do some server signature validation before creating a quest
        // TODO: Also verify the cid
        uint256 questId = totalQuests++;
        quests[questId] = Quest({
            id: questId,
            cid: questCID,
            reward: reward,
            orgId: orgId
        });
        emit QuestCreated(questId, questCID, reward, orgId);
    }

    function sendProposal(uint256 questId, bytes calldata proposalCID)
        public
        payable
    {
        // TODO: The organization admin should not be able to send proposal
        if (!questExists(questId)) revert InvalidQuestId();
        if (proposalIds[questId][msg.sender] != 0) revert ProposalAlreadySent();
        // TODO: verify the signature
        // TODO: verify the cid
        uint256 proposalId = ++totalProposals;
        proposals[proposalId] = Proposal({
            id: proposalId,
            cid: proposalCID,
            proposer: msg.sender,
            questId: questId,
            status: ProposalStatus.Proposed
        });
        proposalIds[questId][msg.sender] = proposalId;
        emit ProposalCreated(proposalId, proposalCID, msg.sender, questId);
    }

    function acceptProposal(uint256 proposalId) public {
        _changeProposalStatus(proposalId, ProposalStatus.Accepted);
    }

    function rejectProposal(uint256 proposalId) public {
        _changeProposalStatus(proposalId, ProposalStatus.Rejected);
    }

    function proposalExists(uint256 proposalId) public view returns (bool) {
        return proposalId < totalProposals;
    }

    function questExists(uint256 questId) public view returns (bool) {
        return questId < totalQuests;
    }

    function _changeProposalStatus(uint256 proposalId, ProposalStatus newStatus)
        private
    {
        if (!proposalExists(proposalId)) revert InvalidProposalId();
        Proposal memory proposal = proposals[proposalId];
        uint256 orgId = quests[proposal.questId].orgId;
        address admin = organizationController.adminOf(orgId);
        if (admin != msg.sender) revert Unauthorized();
        if (proposal.status == newStatus) revert ProposalAlreadyInSameStatus();
        ProposalStatus oldStatus = proposal.status;
        proposals[proposalId].status = newStatus;
        emit ProposalStatusChanged(proposalId, oldStatus, newStatus);
    }
}
