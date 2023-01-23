import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import Image from "next/image";
import React from "react";
import * as LancerKnight from "../../assets/pngs/knight-logo.png";

interface RoleData {
  name: string;
  id: string;
  logo?: string;
}

const DisplayRoleBox: React.FC<RoleData> = ({ name, logo }) => {
  return (
    <Box
      border="5px solid white"
      borderTopWidth="40px"
      p="20px"
      bg="#29116C"
      textAlign="center"
    >
      <Box width="100%">
        <Image src={logo ?? LancerKnight} alt={name} />
      </Box>
      <Text>{capitalize(name)}</Text>
    </Box>
  );
};

const roles: RoleData[] = [
  { id: "org", name: "organization" },
  { id: "hunter", name: "credlancer" },
];

interface ModalProp {
  handleClose: () => void;
  isOpen?: boolean;
}

export const SelectRoleModal: React.FC<ModalProp> = ({
  handleClose,
  isOpen = true,
}) => {
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent background="black" padding="2em" borderRadius="10px">
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Heading textAlign="center" fontFamily="Aclonica">
              Join as a:
            </Heading>

            <Grid mt="12" gap="4" gridTemplateColumns="repeat(2, 1fr)">
              {roles.map((role) => (
                <GridItem key={role.id}>
                  <DisplayRoleBox {...role} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
