import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { setupServer } from "msw/node";
import { userEvent } from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { UseGenerateNinjaName } from "../hooks/useGenerateNinjaName";
import {
  NinjaNameGeneratorTab,
  makeNinjaNameGeneratorTab,
} from "../pages/NinjaNamePage/tabs/NinjaNameGeneratorTab";
import { API_URL } from "../api";

describe("NinjaNameGeneratorTab", () => {
  describe("unit tests", () => {
    const setup = (useGenerateNinjaName: UseGenerateNinjaName) => {
      const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
        useGenerateNinjaName,
      });

      return render(<NinjaNameGeneratorTab />);
    };

    const useGenerateNinjaNameInitialProps = {
      isGenerating: false,
      ninjaName: undefined,
      error: undefined,
      reset: () => {},
      generateNinjaName: async () => {},
    };

    describe("when isGenerating is true", () => {
      test("renders loading spinner", () => {
        const mockUseGenerateNinjaName: UseGenerateNinjaName = () => ({
          ...useGenerateNinjaNameInitialProps,
          isGenerating: true,
        });

        setup(mockUseGenerateNinjaName);

        const spinner = screen.getByRole("img", { name: /loading/i });
        expect(spinner).toBeInTheDocument();
      });
    });

    describe("when error is truthy", () => {
      test("renders error message", () => {
        const mockUseGenerateNinjaName: UseGenerateNinjaName = () => ({
          ...useGenerateNinjaNameInitialProps,
          error: true,
        });

        setup(mockUseGenerateNinjaName);

        const errorMessage = screen.getByTestId("ninja-name-generation-error");

        expect(errorMessage).toHaveTextContent(
          "Houve um erro ao gerar seu nome de ninja."
        );
      });

      test("renders back button", () => {
        const mockUseGenerateNinjaName: UseGenerateNinjaName = () => ({
          ...useGenerateNinjaNameInitialProps,
          error: true,
        });

        setup(mockUseGenerateNinjaName);

        const backButton = screen.getByRole("button", { name: /voltar/i });

        expect(backButton).toBeInTheDocument();
      });
    });

    describe("when ninja name is present", () => {
      test("renders ninja name", () => {
        const mockUseGenerateNinjaName: UseGenerateNinjaName = () => ({
          ...useGenerateNinjaNameInitialProps,
          ninjaName: "Jiraya",
        });

        setup(mockUseGenerateNinjaName);

        const ninjaName = screen.getByTestId("ninja-name");

        expect(ninjaName).toHaveTextContent("Jiraya");
      });

      test("renders back button", () => {
        const mockUseGenerateNinjaName: UseGenerateNinjaName = () => ({
          ...useGenerateNinjaNameInitialProps,
          ninjaName: "Jiraya",
        });

        setup(mockUseGenerateNinjaName);

        const backButton = screen.getByRole("button", { name: /voltar/i });

        expect(backButton).toBeInTheDocument();
      });
    });
  });

  describe("integration tests", () => {
    const server = setupServer();

    const setup = () => {
      return render(<NinjaNameGeneratorTab />);
    };

    beforeAll(() => {
      server.listen();
    });

    afterAll(() => {
      server.close();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    describe("when isGenerating is true", () => {
      test("renders loading spinner", async () => {
        const user = userEvent.setup();
        setup();

        const cardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const cardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const cardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        await user.type(cardExpirationDate, "12/2025");
        await user.type(cardNumberInput, "2222222222222222");
        await user.type(cardCvvInput, "123");

        const generateButton = screen.getByRole("button", { name: /gerar/i });
        await user.click(generateButton);

        const spinner = await screen.findByRole("img", { name: /loading/i });
        expect(spinner).toBeInTheDocument();
      });
    });

    describe("when error is truthy", () => {
      test("renders error message", async () => {
        server.use(
          http.post(`${API_URL}/ninja-names/generate`, () =>
            HttpResponse.error()
          )
        );

        const user = userEvent.setup();
        setup();

        const cardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const cardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const cardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        await user.type(cardExpirationDate, "12/2025");
        await user.type(cardNumberInput, "2222222222222222");
        await user.type(cardCvvInput, "123");

        const generateButton = screen.getByRole("button", { name: /gerar/i });
        await user.click(generateButton);

        const errorMessage = await screen.findByTestId(
          "ninja-name-generation-error"
        );

        expect(errorMessage).toHaveTextContent(
          "Houve um erro ao gerar seu nome de ninja."
        );
      });

      test("renders back button", async () => {
        server.use(
          http.post(`${API_URL}/ninja-names/generate`, () =>
            HttpResponse.error()
          )
        );

        const user = userEvent.setup();
        setup();

        const cardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const cardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const cardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        await user.type(cardExpirationDate, "12/2025");
        await user.type(cardNumberInput, "2222222222222222");
        await user.type(cardCvvInput, "123");

        const generateButton = screen.getByRole("button", { name: /gerar/i });
        await user.click(generateButton);

        const backButton = await screen.findByRole("button", {
          name: /voltar/i,
        });

        expect(backButton).toBeInTheDocument();
      });
    });

    describe("when ninja name is present", () => {
      test("renders ninja name", async () => {
        server.use(
          http.post(`${API_URL}/ninja-names/generate`, () =>
            HttpResponse.json({ ninjaName: "Jiraya" })
          )
        );

        const user = userEvent.setup();
        setup();

        const cardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const cardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const cardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        await user.type(cardExpirationDate, "12/2025");
        await user.type(cardNumberInput, "2222222222222222");
        await user.type(cardCvvInput, "123");

        const generateButton = screen.getByRole("button", { name: /gerar/i });
        await user.click(generateButton);

        const ninjaName = await screen.findByTestId("ninja-name");

        expect(ninjaName).toHaveTextContent("Jiraya");
      });

      test("renders back button", async () => {
        server.use(
          http.post(`${API_URL}/ninja-names/generate`, () =>
            HttpResponse.json({ ninjaName: "Jiraya" })
          )
        );

        const user = userEvent.setup();
        setup();

        const cardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const cardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const cardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        await user.type(cardExpirationDate, "12/2025");
        await user.type(cardNumberInput, "2222222222222222");
        await user.type(cardCvvInput, "123");

        const generateButton = screen.getByRole("button", { name: /gerar/i });
        await user.click(generateButton);

        const backButton = await screen.findByRole("button", {
          name: /voltar/i,
        });

        expect(backButton).toBeInTheDocument();
      });
    });

    describe("when the page is has form initial props", () => {
      test("rendes form", () => {
        setup();

        waitFor(() => {
          const form = screen.getByRole("form");
          expect(form).toBeInTheDocument();
        });
      });
    });
  });
});
