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

    mapping(uint256 => Organization) public organizations;

    uint256 public totalOrganizations;

    error Unauthorized();
    error InvalidOrganizationId();
    error ZeroAddressCannotBeAdmin();

    event OrganizationCreated(
        uint256 orgId,
        string name,
        bytes imageCID,
        address admin
    );
    event AdminChanged(uint256 orgId, address oldAdmin, address newAdmin);

    modifier onlyAdmin(uint256 orgId) {
        if (orgId >= totalOrganizations) revert InvalidOrganizationId();
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
        uint256 orgId = totalOrganizations++;
        organizations[orgId] = Organization({
            id: orgId,
            name: name,
            imageCID: imageCID,
            admin: msg.sender
        });
        emit OrganizationCreated(orgId, name, imageCID, msg.sender);
    }

    function changeAdmin(uint256 orgId, address newAdmin)
        public
        whenNotPaused
        onlyAdmin(orgId)
    {
        if (newAdmin == address(0)) revert ZeroAddressCannotBeAdmin();
        organizations[orgId].admin = newAdmin;
        emit AdminChanged(orgId, msg.sender, newAdmin);
    }

    function adminOf(uint256 orgId) public view returns (address admin) {
        if (orgId >= totalOrganizations) revert InvalidOrganizationId();
        admin = organizations[orgId].admin;
    }

    function exists(uint256 orgId) public view returns (bool) {
        return orgId < totalOrganizations;
    }
}
