Building a CredLancer Mobile Demo for the ZK Hackathon by Bekeley https://zk-hacking.org/

Track: ZK Application, Celo Mobile App

CredLancer: a digital reputation platform that verifies accomplishments & skills. Orgs issue tamper-proof credentials to members & freelancers who accomplish bounty secured quests. With AI integrations, freelancers can showcase real-time skill and professional development credentials, stored and verified with IPFS & FVM.

The CredQuest Contracts power CredLancer, providing an open marketplace for gig opportunities and secured bounties, where freelancers can showcase their real-time experience & skills credentials, stored and verified with InterPlanetary File System (IPFS) and Filecoin Virtual Machine (FVM). (We are exploring data storage on Ceramic as we develop a more robust DAPP) CredQuest Credentials provide the community an accurate, reliable and searchable representation of real time freelancer qualifications and professional development.

Goals

CredLancer aims to deliver tamper-proof credentials, showcase professional development and achievement, while maintaining data privacy and sovereignty. We aim to address three major problems:

The lack of trust and verifiability in professional credentials Difficulty in demonstrating professional development and achievements Lack of interoperability and portability of professional data Using ZKP Technology The integration of Zero-Knowledge Proofs will benefit the product design in the following areas:

Privacy: Integrating Identity Login protocols that ensure personal data remains private with opt-in credential visibility
Scalibility & Fees: Layer 2 solutions on Ethereum can improve platform fees. Solutions like ZKSync Era & Starkware´s Starknet have the added benefit of account abstraction built in natively.
Project Repos: Starkware/Staknet DEMO Repo: https://github.com/captainahab0x/CredLancer_Starknet (Cairo)
IPFS/FVM Demo Repo: https://github.com/CredLancer/CredQuestFVM

Link to demo or website, if applicable: Pitch Video: https://www.loom.com/share/45c880278d0041c7889c6f3d65a3eabd Demo: https://www.loom.com/share/47564c02330340038544ebb5f75b73b4

License: MIT

Technologies explored:

ETHGlobal FVM Hack 2022 Badges, Credentials, & GIG Proposal Data stored on IPFS with Filecoin & FVM executing contracts Tech Used: FEVM, Solidity, next.js, react.js hardhat-kit, Web3.Storage, Lighthouse (encryption & token (credential gating))

User Profile Data: Information such as name, contact information, professional qualifications, and other details about users' professional background could be stored on IPFS. This data would be hashed and encrypted before being stored on IPFS to ensure privacy and security. Here we plan to dive into Lighthouse incorporate their solutions.

Credentials: Self-attested digital credentials such as degrees, certificates, and badges issued to users could be stored on IPFS. Organization issued Soul Bound Token Credentials (ERC1155) can also be stored.

Professional Development Data: Information about professional development activities, such as training courses, workshops, and conferences that users have participated in could be stored on IPFS.

Further Development:

Reputation and skills scoring: We can create a system that incorporated smart contracts deployed on FVM to read data stored on IPFS and create a tamper-proof record of users’ professional achievements, allowing them to demonstrate their skills and reputation on-chain. As these are connected to a specific CID, they are portable for other uses.

