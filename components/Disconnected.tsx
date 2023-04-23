import { FC, MouseEventHandler, useCallback } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import "typeface-inter";



const Disconnected: FC = () => {
  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }

      if (!wallet) {
        modalState.setVisible(true)
      } else {
        connect().catch(() => {})
      }
    },
    [wallet, connect, modalState]
  )

  return (
    <>
      <Container>
      <Box
  backgroundImage="url('/images/hacks.png')"
  width="100%"
  height="100%"
  backgroundSize="cover"
  backgroundRepeat="no-repeat"
  backgroundPosition="center center"
  border="none"
  margin={0}
  padding={0}
  my={2}
  mx="auto"
>
<Image
  src="/images/hacks.png"
  alt="hacks"
  width="100%"
  height="100%"
  objectFit="cover"
  />
</Box>
<Box><Text align="center" fontFamily="Inter">HeliumDenver presents the HACKs NFT collection. Each of these NFTs represents the purchase of a sensor and ticket to an IRL onboarding hacks session with HeliumDenver.</Text></Box>
        
        <VStack spacing={10}>
          <Heading
            color="white"
            as="h1"
            size="4xl"
            noOfLines={4}
            textAlign="center"
          >
          <Box
          bgImage="/images/eruption.gif"
          bgSize="cover"
          bgColor="rgba(0, 0, 0, 0.6)"
          borderRadius="20px"
          p={10}
          w="100%"
          maxW="800px"
          mt={{ base: "20%", md: "10%" }}
          textAlign="center"
          fontSize={{ base: "2xl", md: "4xl" }}
        ><Button
            bgColor="black"
            color="white"
            maxW="400px"
            onClick={handleClick}
          >
            <HStack>
              <Text> Enter </Text>
              <ArrowForwardIcon />
            </HStack> 
          </Button>
          </Box>
          </Heading>
        </VStack>
      </Container>
    </>
  )
}

export default Disconnected
