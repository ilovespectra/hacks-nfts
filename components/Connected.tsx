import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react"
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachine,
  CandyMachineV2
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"

const Connected: FC = () => {
  const { connection } = useConnection()
	@@ -35,14 +37,31 @@ const Connected: FC = () => {
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    if (!metaplex) return

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("8p4qfrt6Cr3piwsC4BN7yAXryV9aooTJZwYEbbsCHjyw"),
      })
      .then((candyMachine) => {
        console.log(candyMachine)
	@@ -80,47 +99,105 @@ const Connected: FC = () => {
  )

  return (
    <>
    <Container height="100vh" overflow="hidden">
      <Box
        bgColor="rgba(0, 0, 0, 0.6)"
        borderRadius="20px"
        p={8}
        w="100%"
        maxW="800px"
        mt={{ base: "10%", md: "5%" }}
      >
        <VStack spacing={2} alignItems="center" px={5} py={5}>
          <Heading
            color="white"
            as="h2"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Hacker!
          </Heading>
          <Text color="white" fontSize="l" textAlign="center">
            Each HACKs NFT represents a sensor purchase and in-person onboarding hacks session!
            This NFT represents the Dragino LT-22222-L, a Helium powered relay sensor.<br></br>
            <b>Price:</b> 4 SOL
          </Text>

          <HStack spacing={5}>
            <Image src="../images/avatar1.png" alt="" maxW="300px"/>
          </HStack>
          <Text><i>LT - Hacks NFT</i></Text><br />
          <Button
            bgColor="accent"
            color="white"
            maxW="420px"
            isLoading={isMinting}
            onClick={handleClick}
          >
            <Text>Mint "LT"</Text>
          </Button>
        </VStack>
        </Box></Container></>
    );
  };
