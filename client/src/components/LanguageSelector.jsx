import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box>
      <Text mb={2} fontSize="lg" color="white" fontFamily="Merriweather">
        Language:
      </Text>
      <Menu isLazy>
        <MenuButton
          as={Button}
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.600" }}
          borderRadius="md"
          paddingX={4}
          rightIcon={<span className="material-icons">arrow_drop_down</span>}
        >
          {language}
        </MenuButton>
        <MenuList bg="#2D3748" color="white" borderRadius={5} zIndex="1">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : "gray.200"}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.800",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.400" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
