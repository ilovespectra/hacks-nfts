 return (
    <>
      <Container>
        <VStack spacing={20}>
          <Heading
            color="white"
            as="h1"
            size="4xl"
            noOfLines={3}
            textAlign="center"
          >
          <Box
          bgColor="rgba(0, 0, 0, 0.6)"
          borderRadius="20px"
          p={8}
          w="100%"
          maxW="800px"
          mt={{ base: "30%", md: "10%" }}
          textAlign="center" // added textAlign property
          fontSize={{ base: "2xl", md: "4xl" }}
        >
            Mint HACKs.<br />
            Learn skills.<br />
            Level up.
            </Box>
          </Heading>
          <Button
            bgColor="blue"
            color="white"
            maxW="380px"
            onClick={handleClick}
          >
            <HStack>
              <Text>Become a Hacker</Text>
              <ArrowForwardIcon />
            </HStack>
          </Button>
        </VStack>
      </Container>
    </>
  )
}
export default Disconnected
