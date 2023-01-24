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

    enum QuestStatus {
        Open,
        Closed,
        Awarded
    }

    struct Quest {
        uint256 id;
        bytes cid;
        uint256 reward;
        uint256 orgId;
        QuestStatus status;
    }

    struct Proposal {
        uint256 id;
        bytes cid;
        address proposer;
        uint256 questId;
        ProposalStatus status;
        bytes workCID;
    }

    mapping(uint256 => Quest) public quests; // f: (questId) -> quest
    mapping(uint256 => Proposal) public proposals; // f: (proposalId) -> proposal
    mapping(uint256 => mapping(address => uint256)) public proposalIds; // f: (questId, proposerAddress) -> proposalId

    uint256 public totalQuests;
    uint256 public totalProposals;

    OrganizationController public organizationController;

    event QuestCreated(
        uint256 indexed questId,
        uint256 indexed organizationId,
        bytes questCID,
        uint256 reward
    );
    event ProposalCreated(
        uint256 indexed questId,
        uint256 indexed proposalId,
        address indexed proposer,
        bytes proposalCID
    );
    event ProposalStatusChanged(
        uint256 indexed questId,
        uint256 indexed proposalId,
        ProposalStatus oldStatus,
        ProposalStatus newStatus
    );
    event WorkSubmitted(
        uint256 indexed questId,
        uint256 indexed proposalId,
        address indexed worker,
        bytes workCID
    );

    error InvalidOrganizationId();
    error Unauthorized();
    error InvalidValue();
    error InvalidQuestId();
    error InvalidProposalId();
    error ProposalAlreadySent();
    error ProposalAlreadyInSameStatus();
    error ProposalAlreadyRejected();
    error QuestNotOpen();
    error ProposalNotFound();
    error ProposalNotAccepted();

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
        uint256 questId = ++totalQuests;
        quests[questId] = Quest({
            id: questId,
            cid: questCID,
            reward: reward,
            orgId: orgId,
            status: QuestStatus.Open
        });
        emit QuestCreated(questId, orgId, questCID, reward);
    }

    function sendProposal(uint256 questId, bytes calldata proposalCID) public {
        // TODO: The organization admin should not be able to send proposal
        if (!questExists(questId)) revert InvalidQuestId();
        if (proposalIds[questId][msg.sender] != 0) revert ProposalAlreadySent();
        if (quests[questId].status != QuestStatus.Open) revert QuestNotOpen();
        // TODO: verify the signature
        // TODO: verify the cid
        uint256 proposalId = ++totalProposals;
        proposals[proposalId] = Proposal({
            id: proposalId,
            cid: proposalCID,
            proposer: msg.sender,
            questId: questId,
            status: ProposalStatus.Proposed,
            workCID: bytes("")
        });
        proposalIds[questId][msg.sender] = proposalId;
        emit ProposalCreated(questId, proposalId, msg.sender, proposalCID);
    }

    function submitWork(uint256 questId, bytes calldata workCID) public {
        if (!questExists(questId)) revert InvalidQuestId();
        if (quests[questId].status != QuestStatus.Open) revert QuestNotOpen();
        uint256 proposalId = proposalIds[questId][msg.sender];
        if (proposalId == 0) revert ProposalNotFound();
        Proposal storage proposal = proposals[proposalId];
        if (proposal.status != ProposalStatus.Accepted)
            revert ProposalNotAccepted();
        // TODO: check the cid
        proposal.workCID = workCID;
        emit WorkSubmitted(questId, proposalId, msg.sender, workCID);
    }

    function acceptProposal(uint256 proposalId) public {
        _changeProposalStatus(proposalId, ProposalStatus.Accepted);
    }

    function rejectProposal(uint256 proposalId) public {
        _changeProposalStatus(proposalId, ProposalStatus.Rejected);
    }

    function proposalExists(uint256 proposalId) public view returns (bool) {
        return proposalId <= totalProposals && proposalId != 0;
    }

    function questExists(uint256 questId) public view returns (bool) {
        return questId <= totalQuests && questId != 0;
    }

    function _changeProposalStatus(uint256 proposalId, ProposalStatus newStatus)
        private
    {
        // TODO: check if quest is closed first
        if (!proposalExists(proposalId)) revert InvalidProposalId();
        Proposal memory proposal = proposals[proposalId];
        uint256 orgId = quests[proposal.questId].orgId;
        address admin = organizationController.adminOf(orgId);
        if (admin != msg.sender) revert Unauthorized();
        if (proposal.status == newStatus) revert ProposalAlreadyInSameStatus();
        ProposalStatus oldStatus = proposal.status;
        proposals[proposalId].status = newStatus;
        emit ProposalStatusChanged(
            proposal.questId,
            proposalId,
            oldStatus,
            newStatus
        );
    }
}
