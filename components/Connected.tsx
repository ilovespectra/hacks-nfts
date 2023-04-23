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
  const walletAdapter = useWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
  const [isMinting, setIsMinting] = useState(false)

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    if (!metaplex) return

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("YOUR_CANDY_MACHINE_ID"),
      })
      .then((candyMachine) => {
        console.log(candyMachine)
        setCandyMachine(candyMachine)
      })
      .catch((error) => {
        alert(error)
      })
  }, [metaplex])

  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return

      if (!walletAdapter.connected || !candyMachine) {
        return
      }

      try {
        setIsMinting(true)
        const nft = await metaplex.candyMachinesV2().mint({
          candyMachine,
    });
        console.log(nft)
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
      } catch (error) {
        alert(error)
      } finally {
        setIsMinting(false)
      }
    },
    [walletAdapter.connected, candyMachine, metaplex, router]
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
  }
  export default Connected
