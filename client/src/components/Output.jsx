import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current; // Assuming editorRef.current holds the source code
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);

      // Process output and error
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr); // Set error state based on stderr
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
      setOutput([error.message || "An unknown error occurred."]); // Display error message
      setIsError(true); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="white" borderRadius={5} boxShadow="lg" p={4}>
      <Text fontSize="lg" color="white" fontFamily="Merriweather">
        Output:
      </Text>
      <Button
        variant="outline"
        background="black"
        color="white"
        size="xl"
        fontFamily="Merriweather"
        borderRadius={10}
        mb={2}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        flexGrow={1}
        height="60vh"
        p={2}
        color={isError ? "red.500" : "black"} // Change text color based on error state
        border="1px solid"
        borderRadius={2}
        borderColor={isError ? "red.500" : "white"} // Change border color based on error state
        overflowY="auto"
      >
        {isError && (
          <Text color="red.500" fontWeight="bold">
            Error: {output.join(", ")}
          </Text>
        )}
        {!isError && output && output.map((line, index) => (
          <Text key={index} whiteSpace="pre-wrap">{line}</Text>
        ))}
        {!output && !isLoading && (
          <Text color="gray.400">Click "Run Code" to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;
