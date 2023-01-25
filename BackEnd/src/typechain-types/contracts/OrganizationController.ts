/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface OrganizationControllerInterface extends utils.Interface {
  functions: {
    "adminOf(uint256)": FunctionFragment;
    "changeAdmin(uint256,address)": FunctionFragment;
    "createOrganization(string,bytes)": FunctionFragment;
    "exists(uint256)": FunctionFragment;
    "organizationIds(address)": FunctionFragment;
    "organizations(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "totalOrganizations()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "updateImageCID(uint256,bytes)": FunctionFragment;
    "updateName(uint256,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "adminOf"
      | "changeAdmin"
      | "createOrganization"
      | "exists"
      | "organizationIds"
      | "organizations"
      | "owner"
      | "pause"
      | "paused"
      | "renounceOwnership"
      | "totalOrganizations"
      | "transferOwnership"
      | "unpause"
      | "updateImageCID"
      | "updateName"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "adminOf",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeAdmin",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createOrganization",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "exists",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "organizationIds",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "organizations",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalOrganizations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateImageCID",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateName",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "adminOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createOrganization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "organizationIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "organizations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalOrganizations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateImageCID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updateName", data: BytesLike): Result;

  events: {
    "AdminChanged(uint256,address,address)": EventFragment;
    "OrganizationCreated(uint256,address,string,bytes)": EventFragment;
    "OrganizationImageCIDChanged(uint256,bytes,bytes)": EventFragment;
    "OrganizationNameChanged(uint256,string,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrganizationCreated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "OrganizationImageCIDChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrganizationNameChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface AdminChangedEventObject {
  orgId: BigNumber;
  oldAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [BigNumber, string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface OrganizationCreatedEventObject {
  orgId: BigNumber;
  admin: string;
  name: string;
  imageCID: string;
}
export type OrganizationCreatedEvent = TypedEvent<
  [BigNumber, string, string, string],
  OrganizationCreatedEventObject
>;

export type OrganizationCreatedEventFilter =
  TypedEventFilter<OrganizationCreatedEvent>;

export interface OrganizationImageCIDChangedEventObject {
  orgId: BigNumber;
  oldImageCID: string;
  newImageCID: string;
}
export type OrganizationImageCIDChangedEvent = TypedEvent<
  [BigNumber, string, string],
  OrganizationImageCIDChangedEventObject
>;

export type OrganizationImageCIDChangedEventFilter =
  TypedEventFilter<OrganizationImageCIDChangedEvent>;

export interface OrganizationNameChangedEventObject {
  orgId: BigNumber;
  oldName: string;
  newName: string;
}
export type OrganizationNameChangedEvent = TypedEvent<
  [BigNumber, string, string],
  OrganizationNameChangedEventObject
>;

export type OrganizationNameChangedEventFilter =
  TypedEventFilter<OrganizationNameChangedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface OrganizationController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OrganizationControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    adminOf(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { admin: string }>;

    changeAdmin(
      orgId: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createOrganization(
      name: PromiseOrValue<string>,
      imageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exists(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    organizationIds(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    organizations(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, string] & {
        id: BigNumber;
        name: string;
        imageCID: string;
        admin: string;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalOrganizations(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateImageCID(
      orgId: PromiseOrValue<BigNumberish>,
      newImageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateName(
      orgId: PromiseOrValue<BigNumberish>,
      newName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  adminOf(
    orgId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  changeAdmin(
    orgId: PromiseOrValue<BigNumberish>,
    newAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createOrganization(
    name: PromiseOrValue<string>,
    imageCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exists(
    orgId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  organizationIds(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  organizations(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, string] & {
      id: BigNumber;
      name: string;
      imageCID: string;
      admin: string;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalOrganizations(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateImageCID(
    orgId: PromiseOrValue<BigNumberish>,
    newImageCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateName(
    orgId: PromiseOrValue<BigNumberish>,
    newName: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    adminOf(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    changeAdmin(
      orgId: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createOrganization(
      name: PromiseOrValue<string>,
      imageCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    exists(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    organizationIds(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    organizations(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, string] & {
        id: BigNumber;
        name: string;
        imageCID: string;
        admin: string;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    totalOrganizations(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    updateImageCID(
      orgId: PromiseOrValue<BigNumberish>,
      newImageCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateName(
      orgId: PromiseOrValue<BigNumberish>,
      newName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(uint256,address,address)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldAdmin?: PromiseOrValue<string> | null,
      newAdmin?: PromiseOrValue<string> | null
    ): AdminChangedEventFilter;
    AdminChanged(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldAdmin?: PromiseOrValue<string> | null,
      newAdmin?: PromiseOrValue<string> | null
    ): AdminChangedEventFilter;

    "OrganizationCreated(uint256,address,string,bytes)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      admin?: PromiseOrValue<string> | null,
      name?: null,
      imageCID?: null
    ): OrganizationCreatedEventFilter;
    OrganizationCreated(
      orgId?: PromiseOrValue<BigNumberish> | null,
      admin?: PromiseOrValue<string> | null,
      name?: null,
      imageCID?: null
    ): OrganizationCreatedEventFilter;

    "OrganizationImageCIDChanged(uint256,bytes,bytes)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldImageCID?: null,
      newImageCID?: null
    ): OrganizationImageCIDChangedEventFilter;
    OrganizationImageCIDChanged(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldImageCID?: null,
      newImageCID?: null
    ): OrganizationImageCIDChangedEventFilter;

    "OrganizationNameChanged(uint256,string,string)"(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldName?: null,
      newName?: null
    ): OrganizationNameChangedEventFilter;
    OrganizationNameChanged(
      orgId?: PromiseOrValue<BigNumberish> | null,
      oldName?: null,
      newName?: null
    ): OrganizationNameChangedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    adminOf(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeAdmin(
      orgId: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createOrganization(
      name: PromiseOrValue<string>,
      imageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exists(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    organizationIds(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    organizations(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalOrganizations(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateImageCID(
      orgId: PromiseOrValue<BigNumberish>,
      newImageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateName(
      orgId: PromiseOrValue<BigNumberish>,
      newName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    adminOf(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeAdmin(
      orgId: PromiseOrValue<BigNumberish>,
      newAdmin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createOrganization(
      name: PromiseOrValue<string>,
      imageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exists(
      orgId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    organizationIds(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    organizations(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalOrganizations(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateImageCID(
      orgId: PromiseOrValue<BigNumberish>,
      newImageCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateName(
      orgId: PromiseOrValue<BigNumberish>,
      newName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
