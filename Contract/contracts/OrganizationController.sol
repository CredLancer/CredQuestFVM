// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract OrganizationController is Ownable, Pausable {
    struct Organization {
        uint256 id;
        string name;
        bytes imageCID;
        address admin;
    }

    mapping(uint256 => Organization) public organizations; // f: (organizationId) -> organization
    mapping(address => uint256) public organizationIds; // f: (adminAddress) -> organizationId

    uint256 public totalOrganizations;

    error Unauthorized();
    error InvalidOrganizationId();
    error ZeroAddressCannotBeAdmin();
    error OrganizationsPerAddressLimitReached();

    event OrganizationCreated(
        uint256 indexed orgId,
        address indexed admin,
        string name,
        bytes imageCID
    );
    event AdminChanged(
        uint256 indexed orgId,
        address indexed oldAdmin,
        address indexed newAdmin
    );
    event OrganizationNameChanged(
        uint256 indexed orgId,
        string oldName,
        string newName
    );
    event OrganizationImageCIDChanged(
        uint256 indexed orgId,
        bytes oldImageCID,
        bytes newImageCID
    );

    modifier onlyAdmin(uint256 orgId) {
        if (!exists(orgId)) revert InvalidOrganizationId();
        if (organizations[orgId].admin != msg.sender) revert Unauthorized();
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function createOrganization(string calldata name, bytes calldata imageCID)
        public
        whenNotPaused
    {
        if (organizationIds[msg.sender] != 0)
            revert OrganizationsPerAddressLimitReached();
        uint256 orgId = ++totalOrganizations;
        organizations[orgId] = Organization({
            id: orgId,
            name: name,
            imageCID: imageCID,
            admin: msg.sender
        });
        organizationIds[msg.sender] = orgId;
        emit OrganizationCreated(orgId, msg.sender, name, imageCID);
    }

    function updateName(uint256 orgId, string calldata newName)
        public
        whenNotPaused
        onlyAdmin(orgId)
    {
        string memory oldName = organizations[orgId].name;
        organizations[orgId].name = newName;
        emit OrganizationNameChanged(orgId, oldName, newName);
    }

    function updateImageCID(uint256 orgId, bytes calldata newImageCID)
        public
        whenNotPaused
        onlyAdmin(orgId)
    {
        bytes memory oldImageCID = organizations[orgId].imageCID;
        organizations[orgId].imageCID = newImageCID;
        emit OrganizationImageCIDChanged(orgId, oldImageCID, newImageCID);
    }

    function changeAdmin(uint256 orgId, address newAdmin)
        public
        whenNotPaused
        onlyAdmin(orgId)
    {
        if (newAdmin == address(0)) revert ZeroAddressCannotBeAdmin();
        if (organizationIds[newAdmin] != 0)
            revert OrganizationsPerAddressLimitReached();
        organizations[orgId].admin = newAdmin;
        organizationIds[msg.sender] = 0;
        organizationIds[newAdmin] = orgId;
        emit AdminChanged(orgId, msg.sender, newAdmin);
    }

    function adminOf(uint256 orgId) public view returns (address admin) {
        if (!exists(orgId)) revert InvalidOrganizationId();
        admin = organizations[orgId].admin;
    }

    function exists(uint256 orgId) public view returns (bool) {
        return orgId <= totalOrganizations && orgId != 0;
    }
}
