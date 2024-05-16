import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { NinjaNameGeneratorPage } from "../pages/NinjaNameGeneratorPage";

const setup = () => {
  return render(<NinjaNameGeneratorPage />);
};

describe("NinjaNameGeneratorPage", () => {
  describe("First render", () => {
    test("Renders title", () => {
      const screen = setup();
      const title = screen.getByText(/Monte seu nome ninja/i);

      expect(title).toBeInTheDocument();
    });

    test("renders card number input", () => {
      const screen = setup();
      const cardNumberInput = screen.getByRole("textbox", {
        name: /card number/i,
      });

      expect(cardNumberInput).toBeInTheDocument();
      expect(cardNumberInput).toHaveValue("");
    });

    test("renders card cvv input", () => {
      const screen = setup();
      const cardCvvInput = screen.getByRole("textbox", {
        name: /card verification value/i,
      });

      expect(cardCvvInput).toBeInTheDocument();
      expect(cardCvvInput).toHaveValue("");
    });

    test("renders card expiration date input", () => {
      const screen = setup();
      const cardExpirationDate = screen.getByRole("textbox", {
        name: /card expiration date/i,
      });

      expect(cardExpirationDate).toBeInTheDocument();
      expect(cardExpirationDate).toHaveValue("");
    });

    test("generate button is disabled", () => {
      const screen = setup();
      const generateButton = screen.getByRole("button", { name: /gerar/i });

      expect(generateButton).toBeDisabled();
    });
  });

  describe("When at least one field is empty", () => {
    test("generate button is disabled", async () => {
      const screen = setup();
      const user = userEvent.setup();

      const cardNumberInput = screen.getByRole("textbox", {
        name: /card number/i,
      });
      const cardCvvInput = screen.getByRole("textbox", {
        name: /card verification value/i,
      });
      const cardExpirationDate = screen.getByRole("textbox", {
        name: /card expiration date/i,
      });

      await user.type(cardNumberInput, "232323232323");
      await user.type(cardCvvInput, "123");

      const generateButton = screen.getByRole("button", { name: /gerar/i });

      expect(cardNumberInput).toHaveValue("232323232323");
      expect(cardCvvInput).toHaveValue("123");
      expect(generateButton).toBeDisabled();
      expect(cardExpirationDate).toHaveValue("");
    });
  });

  describe("When expiration date is in the past", () => {
    test("generate button is disabled", async () => {
      const user = userEvent.setup();
      const screen = setup();

      const cardNumberInput = screen.getByRole("textbox", {
        name: /card number/i,
      });
      const cardCvvInput = screen.getByRole("textbox", {
        name: /card verification value/i,
      });
      const cardExpirationDate = screen.getByRole("textbox", {
        name: /card expiration date/i,
      });

      await user.type(cardNumberInput, "232323232323");
      await user.type(cardCvvInput, "123");
      await user.type(cardExpirationDate, "04/2023");

      const generateButton = await screen.findByRole("button", {
        name: /gerar/i,
      });

      expect(cardNumberInput).toHaveValue("232323232323");
      expect(cardCvvInput).toHaveValue("123");
      expect(generateButton).toBeDisabled();
      expect(cardExpirationDate).toHaveValue("04/2023");
    });
  });

  describe("form is valid", () => {
    test("generate button is enabled", async () => {
      const user = userEvent.setup();
      const screen = setup();

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

      const generateButton = await screen.findByRole("button", {
        name: /gerar/i,
      });

      expect(cardNumberInput).toHaveValue("2222222222222222");
      expect(cardCvvInput).toHaveValue("123");
      expect(cardExpirationDate).toHaveValue("12/2025");
      expect(generateButton).toBeEnabled();
    });

    test("ninja name is shown", async () => {
      const user = userEvent.setup();
      const screen = setup();

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

      const generateButton = await screen.findByRole("button", {
        name: /gerar/i,
      });

      await user.click(generateButton);

      const yourNameIs = await screen.findByText(/seu nome é/i);
      const ninjaName = await screen.findByTestId("ninja-name");

      expect(yourNameIs).toBeInTheDocument();
      expect(ninjaName).toHaveTextContent("Ayumi Shimura");
    });

    describe("clicking the back button returns to the initial form value", () => {
      test("ninja name is shown", async () => {
        const user = userEvent.setup();
        const screen = setup();

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

        const generateButton = await screen.findByRole("button", {
          name: /gerar/i,
        });

        await user.click(generateButton);

        const backButton = await screen.findByRole("button", {
          name: /voltar/i,
        });

        await user.click(backButton);

        const newCardNumberInput = screen.getByRole("textbox", {
          name: /card number/i,
        });
        const newCardCvvInput = screen.getByRole("textbox", {
          name: /card verification value/i,
        });
        const newCardExpirationDate = screen.getByRole("textbox", {
          name: /card expiration date/i,
        });

        expect(newCardNumberInput).toHaveValue("");
        expect(newCardCvvInput).toHaveValue("");
        expect(newCardExpirationDate).toHaveValue("");
      });
    })
  });
});
