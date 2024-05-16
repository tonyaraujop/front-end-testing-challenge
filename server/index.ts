import fastify from "fastify";
import cors from "@fastify/cors";

import z from "zod";
import hash from "object-hash";

import { generateNinjaName } from "./ninjaNameGenerator";

const randomDelay = async () =>
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

const randomFail = () => {
  if (Math.random() < 0.4) {
    throw new Error("Internal server error");
  }
};

const app = fastify({ logger: true });

app.register(cors);

const ninjaGenerationBodySchema = z.object({
  cardNumber: z.string(),
  cardExpirationDate: z.string(),
  cardVerificationValue: z.string(),
});

app.post("/ninja-names/generate", async (req, res) => {
  await randomDelay();

  randomFail();

  try {
    const cardData = ninjaGenerationBodySchema.parse(req.body);

    const ninjaName = generateNinjaName(cardData);

    res.send({ ninjaName });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.errors });
      return;
    }

    throw error;
  }
});

const generateRandomString = (): string => {
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    result += characters[randomIndex];
  }

  return result;
};

app.get("/ninja-names", async (_, res) => {
  await randomDelay();

  randomFail();

  const ninjaNames = Array(10)
    .fill(null)
    .map(() => {
      const name = generateNinjaName({
        cardNumber: generateRandomString(),
        cardExpirationDate: generateRandomString(),
        cardVerificationValue: new Date().toISOString(),
      });

      return { id: hash(name), name };
    });

  res.send({ ninjaNames });
});

await app.listen({ port: 3000 });
