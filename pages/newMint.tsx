import type { NextPage } from "next"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import MainLayout from "../components/MainLayout"
import {
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Button,
  Box, 
  HStack,
} from "@chakra-ui/react"
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { PublicKey } from "@solana/web3.js"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { useRouter } from 'next/router';

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
  const [metadata, setMetadata] = useState<any>()
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    metaplex
      .nfts()
      .findByMint({ mintAddress: mint })
      .then((nft) => {
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata)
          })
      })
  }, [mint, metaplex, walletAdapter])

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {},
    []
  )

  const router = useRouter();

  return (
    <MainLayout>
      <VStack spacing={16} width="100%" height="100%">
        <Container width="80%" maxW="80%" height="800%" p={0} overflowY="auto">
          <VStack spacing={6} width="100%" maxW="100%" height="100%" p={0} bg="black">
            <Button colorScheme="white" color="black" variant="ghost" onClick={() => router.push('/connect')}>
              Connect Wallet
            </Button>
            <Heading color="white" as="h1" size="xl" textAlign="center">
              It&apos;s time to get serious.
            </Heading>
            
            <Text color="bodyText" fontSize="l" textAlign="center">
              Congratulations, you secured a Dragino LT-22222-L sensor and a spot in the in-person onboarding course by HeliumDenver!<br></br> Join us over in 
              <a href="https://discord.gg/9PZpqtRPPb" target="_blank" rel="noreferrer" className="link"> The Official HeliumLava Community Discord </a>
               to confirm your course time/place!
            </Text>
  
          </VStack>
        </Container>
        <Box
          position="relative"
          top="0px" /* adjust the top value as necessary */
          width="60%"
          height="auto"
          display="flex"
          justifyContent="center"
        >
          <Image src={metadata?.image ?? ""} alt="" maxW="65%" maxH="65%" objectFit="contain" />
        </Box>
  
      </VStack>
    </MainLayout>
  )
  
}

interface NewMintProps {
  mint: PublicKey
}

NewMint.getInitialProps = async ({ query }) => {
  const { mint } = query

  if (!mint) throw { error: "no mint" }

  try {
    const mintPubkey = new PublicKey(mint)
    return { mint: mintPubkey }
  } catch {
    throw { error: "invalid mint" }
  }
}

export default NewMint
