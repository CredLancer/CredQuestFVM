/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  OrganizationController,
  OrganizationControllerInterface,
} from "../../contracts/OrganizationController";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOrganizationId",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "OrganizationsPerAddressLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddressCannotBeAdmin",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "imageCID",
        type: "bytes",
      },
    ],
    name: "OrganizationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "oldImageCID",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "newImageCID",
        type: "bytes",
      },
    ],
    name: "OrganizationImageCIDChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "OrganizationNameChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
    ],
    name: "adminOf",
    outputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "imageCID",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "createOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nonceUsed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "organizationIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "organizations",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "imageCID",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
    ],
    name: "setSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "signer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalOrganizations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "newImageCID",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "updateImageCID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orgId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "updateName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61014060405234801561001157600080fd5b506040518060400160405280601781526020017f4f7267616e697a6174696f6e20436f6e74726f6c6c6572000000000000000000815250604051806040016040528060018152602001603160f81b81525061007861007361012e60201b60201c565b610132565b6000805460ff60a01b19169055815160208084019190912082518383012060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81880181905281830187905260608201869052608082019490945230818401528151808203909301835260c00190528051940193909320919290916080523060c052610120525050600380546001600160a01b03191633179055506101829050565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60805160a05160c05160e0516101005161012051611a186101d160003960006110b201526000611101015260006110dc015260006110350152600061105f015260006110890152611a186000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c8063715018a6116100b257806394d0d3a611610081578063edd76d0511610066578063edd76d05146102b1578063ef5235d3146102d1578063f2fde38b146102e457600080fd5b806394d0d3a61461026b578063e792dd8a1461028e57600080fd5b8063715018a61461023757806382e885cf1461023f5780638456cb59146102525780638da5cb5b1461025a57600080fd5b806353e76f2c116101095780635c975abb116100ee5780635c975abb146101d55780636c19e783146101e75780636cc5af291461022457600080fd5b806353e76f2c146101af5780635537a6fa146101c257600080fd5b8063238ac9331461013b5780633f4ba83a1461016b5780634cf5d552146101755780634f558e791461018c575b600080fd5b60035461014e906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101736102f7565b005b61017e60055481565b604051908152602001610162565b61019f61019a3660046113bd565b610309565b6040519015158152602001610162565b6101736101bd366004611418565b610322565b61014e6101d03660046113bd565b61048f565b600054600160a01b900460ff1661019f565b6101736101f5366004611480565b6003805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6101736102323660046114a2565b6104d6565b610173610637565b61017361024d3660046114e4565b610649565b6101736108be565b6000546001600160a01b031661014e565b61019f6102793660046113bd565b60046020526000908152604090205460ff1681565b6102a161029c3660046113bd565b6108ce565b6040516101629493929190611617565b61017e6102bf366004611480565b60026020526000908152604090205481565b6101736102df36600461165d565b610a0f565b6101736102f2366004611480565b610d04565b6102ff610d99565b610307610df3565b565b6000600554821115801561031c57508115155b92915050565b61032a610e48565b8261033481610309565b610351576040516312485c8960e11b815260040160405180910390fd5b6000818152600160205260409020600301546001600160a01b0316331461038a576040516282b42960e81b815260040160405180910390fd5b600084815260016020819052604082200180546103a690611700565b80601f01602080910402602001604051908101604052809291908181526020018280546103d290611700565b801561041f5780601f106103f45761010080835404028352916020019161041f565b820191906000526020600020905b81548152906001019060200180831161040257829003601f168201915b50505050509050838360016000888152602001908152602001600020600101918261044b929190611789565b50847fb5929b76d8a9106e5191d6484bfec92bf3aad66cec348a40bf2c24ab30170e4a82868660405161048093929190611873565b60405180910390a25050505050565b600061049a82610309565b6104b7576040516312485c8960e11b815260040160405180910390fd5b506000908152600160205260409020600301546001600160a01b031690565b6104de610e48565b816104e881610309565b610505576040516312485c8960e11b815260040160405180910390fd5b6000818152600160205260409020600301546001600160a01b0316331461053e576040516282b42960e81b815260040160405180910390fd5b6001600160a01b03821661057e576040517fb6b8b2a100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038216600090815260026020526040902054156105b55760405163a430873f60e01b815260040160405180910390fd5b3360008181526002602090815260408083208390556001600160a01b0386168084528184208890558784526001909252808320600301805473ffffffffffffffffffffffffffffffffffffffff1916831790555190929186917f900f0b7d796ac23c299d8b9ea7a0f715aad3bb4e1f5afd2000cdf36d82de42a29190a4505050565b61063f610d99565b6103076000610ea2565b610651610e48565b8461065b81610309565b610678576040516312485c8960e11b815260040160405180910390fd5b6000818152600160205260409020600301546001600160a01b031633146106b1576040516282b42960e81b815260040160405180910390fd5b60008281526004602052604090205460ff16156106e157604051633ab3447f60e11b815260040160405180910390fd5b60006107627fe10dceb9af22805112ef3cba7fb6ba4432a26e931a4f4b091cad893b042618528888886040516107189291906118a3565b604051908190038120610747939291889060200193845260208401929092526040830152606082015260800190565b60405160208183030381529060405280519060200120610eff565b905060006107708286610f68565b6003549091506001600160a01b038083169116146107a157604051638baa579f60e01b815260040160405180910390fd5b6000848152600460209081526040808320805460ff191660019081179091558b8452909152812060020180546107d690611700565b80601f016020809104026020016040519081016040528092919081815260200182805461080290611700565b801561084f5780601f106108245761010080835404028352916020019161084f565b820191906000526020600020905b81548152906001019060200180831161083257829003601f168201915b50505060008c81526001602052604090209293505060029091019050610876888a83611789565b50887f5f2adde33903cdbdcc3d653702ed8f954dacf6edcca75f73d31eeeefa61e5b2a828a8a6040516108ab93929190611873565b60405180910390a2505050505050505050565b6108c6610d99565b610307610f8c565b6001602081905260009182526040909120805491810180546108ef90611700565b80601f016020809104026020016040519081016040528092919081815260200182805461091b90611700565b80156109685780601f1061093d57610100808354040283529160200191610968565b820191906000526020600020905b81548152906001019060200180831161094b57829003601f168201915b50505050509080600201805461097d90611700565b80601f01602080910402602001604051908101604052809291908181526020018280546109a990611700565b80156109f65780601f106109cb576101008083540402835291602001916109f6565b820191906000526020600020905b8154815290600101906020018083116109d957829003601f168201915b505050600390930154919250506001600160a01b031684565b610a17610e48565b60008181526004602052604090205460ff1615610a4757604051633ab3447f60e11b815260040160405180910390fd5b3360009081526002602052604090205415610a755760405163a430873f60e01b815260040160405180910390fd5b6000610b057f34a7c079ef5ecd9b5540adcbd2df369beae7b2b3d3be5b53bd20703e223cb0e2338a8a604051610aac9291906118a3565b60405180910390208989604051610ac49291906118a3565b6040519081900381206107479493929188906020019485526001600160a01b0393909316602085015260408401919091526060830152608082015260a00190565b90506000610b4b85858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508693925050610f689050565b6003549091506001600160a01b03808316911614610b7c57604051638baa579f60e01b815260040160405180910390fd5b6000838152600460205260408120805460ff19166001179055600580548290610ba4906118b3565b919050819055905060405180608001604052808281526020018b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250604080516020601f8c018190048102820181019092528a815291810191908b908b908190840183828082843760009201829052509385525050336020938401525083815260018083526040909120835181559183015190820190610c5a90826118da565b5060408201516002820190610c6f90826118da565b50606091909101516003909101805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0390921691909117905533600081815260026020526040908190208390555182907f0e495a78e01f57e15768b90aee1976ba20bae3dbee3a5ebc3a173ae5532334b990610cf0908e908e908e908e9061199a565b60405180910390a350505050505050505050565b610d0c610d99565b6001600160a01b038116610d8d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b610d9681610ea2565b50565b6000546001600160a01b031633146103075760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d84565b610dfb610fcf565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054600160a01b900460ff16156103075760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a20706175736564000000000000000000000000000000006044820152606401610d84565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600061031c610f0c611028565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000610f77858561114f565b91509150610f8481611194565b509392505050565b610f94610e48565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e2b3390565b600054600160a01b900460ff166103075760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610d84565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561108157507f000000000000000000000000000000000000000000000000000000000000000046145b156110ab57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b60008082516041036111855760208301516040840151606085015160001a611179878285856112f9565b9450945050505061118d565b506000905060025b9250929050565b60008160048111156111a8576111a86119cc565b036111b05750565b60018160048111156111c4576111c46119cc565b036112115760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610d84565b6002816004811115611225576112256119cc565b036112725760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610d84565b6003816004811115611286576112866119cc565b03610d965760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610d84565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561133057506000905060036113b4565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611384573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166113ad576000600192509250506113b4565b9150600090505b94509492505050565b6000602082840312156113cf57600080fd5b5035919050565b60008083601f8401126113e857600080fd5b50813567ffffffffffffffff81111561140057600080fd5b60208301915083602082850101111561118d57600080fd5b60008060006040848603121561142d57600080fd5b83359250602084013567ffffffffffffffff81111561144b57600080fd5b611457868287016113d6565b9497909650939450505050565b80356001600160a01b038116811461147b57600080fd5b919050565b60006020828403121561149257600080fd5b61149b82611464565b9392505050565b600080604083850312156114b557600080fd5b823591506114c560208401611464565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806000608086880312156114fc57600080fd5b85359450602086013567ffffffffffffffff8082111561151b57600080fd5b61152789838a016113d6565b9096509450604088013591508082111561154057600080fd5b818801915088601f83011261155457600080fd5b813581811115611566576115666114ce565b604051601f8201601f19908116603f0116810190838211818310171561158e5761158e6114ce565b816040528281528b60208487010111156115a757600080fd5b82602086016020830137600092810160200192909252509699959850939660600135949350505050565b6000815180845260005b818110156115f7576020818501810151868301820152016115db565b506000602082860101526020601f19601f83011685010191505092915050565b84815260806020820152600061163060808301866115d1565b828103604084015261164281866115d1565b9150506001600160a01b038316606083015295945050505050565b60008060008060008060006080888a03121561167857600080fd5b873567ffffffffffffffff8082111561169057600080fd5b61169c8b838c016113d6565b909950975060208a01359150808211156116b557600080fd5b6116c18b838c016113d6565b909750955060408a01359150808211156116da57600080fd5b506116e78a828b016113d6565b989b979a50959894979596606090950135949350505050565b600181811c9082168061171457607f821691505b60208210810361173457634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561178457600081815260208120601f850160051c810160208610156117615750805b601f850160051c820191505b818110156117805782815560010161176d565b5050505b505050565b67ffffffffffffffff8311156117a1576117a16114ce565b6117b5836117af8354611700565b8361173a565b6000601f8411600181146117e957600085156117d15750838201355b600019600387901b1c1916600186901b178355611843565b600083815260209020601f19861690835b8281101561181a57868501358255602094850194600190920191016117fa565b50868210156118375760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60408152600061188660408301866115d1565b828103602084015261189981858761184a565b9695505050505050565b8183823760009101908152919050565b6000600182016118d357634e487b7160e01b600052601160045260246000fd5b5060010190565b815167ffffffffffffffff8111156118f4576118f46114ce565b611908816119028454611700565b8461173a565b602080601f83116001811461193d57600084156119255750858301515b600019600386901b1c1916600185901b178555611780565b600085815260208120601f198616915b8281101561196c5788860151825594840194600190910190840161194d565b508582101561198a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6040815260006119ae60408301868861184a565b82810360208401526119c181858761184a565b979650505050505050565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220da2b5ad84022677d99dab8306c1aebdbbfcfa737bb68c147e13092a4f69d4f9764736f6c63430008110033";

type OrganizationControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrganizationControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrganizationController__factory extends ContractFactory {
  constructor(...args: OrganizationControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OrganizationController> {
    return super.deploy(overrides || {}) as Promise<OrganizationController>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OrganizationController {
    return super.attach(address) as OrganizationController;
  }
  override connect(signer: Signer): OrganizationController__factory {
    return super.connect(signer) as OrganizationController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrganizationControllerInterface {
    return new utils.Interface(_abi) as OrganizationControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrganizationController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OrganizationController;
  }
}
