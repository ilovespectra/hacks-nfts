import { FC, MouseEventHandler, useCallback } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"


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
        <VStack spacing={10}>
          <Heading
            color="white"
            as="h1"
            size="4xl"
            noOfLines={4}
            textAlign="center"
          >
          <Box
          bgColor="rgba(0, 0, 0, 0.6)"
          borderRadius="20px"
          p={5}
          w="100%"
          maxW="800px"
          mt={{ base: "30%", md: "10%" }}
          textAlign="center" // added textAlign property
          fontSize={{ base: "2xl", md: "4xl" }}
        >
            Feeling<br />
            Philanthropic?

            <Box textAlign="center" // added textAlign property
          fontSize={{ base: "sm", md: "l" }}><br />HeliumDenver - LavaDAO</Box>
            
            </Box>
          </Heading>
          
          <Button
            bgColor="blue"
            color="white"
            maxW="380px"
            onClick={handleClick}
          >
            <HStack>
              <Text>Join LavaDAO</Text>
              <ArrowForwardIcon />
            </HStack>
          </Button>
        </VStack>
      </Container>
    </>
  )
}

export default Disconnected
