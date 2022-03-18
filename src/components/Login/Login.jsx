import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [invalidForm, setInvalidForm] = useState(true);
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const sendRequest = (event) => {
    console.log(datos.email + " hola" + datos.password);
    axios
      .post("http://challenge-react.alkemy.org/", {
        email: datos.email,
        password: datos.password,
      })
      .then(function (response) {
        console.log(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    // Actualizar el estado del formulario en base a los cambios de inputs
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    if (datos.email === "challenge@alkemy.org" && datos.password === "react") {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <h1>Welcome to Scalzo Restaurant</h1>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={handleChange}
              placeholder="challenge@alkemy.org"
              name="email"
            />
            <FormHelperText>
              {String(invalidForm)} {datos.email}
            </FormHelperText>
            {invalidForm ? (
              <FormHelperText>
                Enter the email challenge@alkemy.org
              </FormHelperText>
            ) : (
              <FormHelperText>Es valido</FormHelperText>
            )}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="react"
              onChange={handleChange}
              name="password"
            />
            <FormHelperText>{}</FormHelperText>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={() => sendRequest()}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
