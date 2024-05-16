import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCardForm } from "../../hooks/useCardForm";
import dayjs from "dayjs";

describe("when hook is rendered", () => {
  test("form fields are empty", () => {
    const { result } = renderHook(() => useCardForm());

    const { cardNumber, cardVerificationValue, cardExpirationDate } =
      result.current;

    expect(cardNumber).toBe("");
    expect(cardVerificationValue).toBe("");
    expect(cardExpirationDate).toBe(null);
  });
});

describe("when setting the card number", () => {
  describe("when there are non-numbers characters", () => {
    test("filters non-number characters", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardNumber("1a2b3c4d");
      });
      const { cardNumber } = result.current;

      expect(cardNumber).toBe("1234");
    });
  });

  describe("with less than 16 digits", () => {
    test("changes cardNumber field", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardNumber("1234");
      });
      const { cardNumber } = result.current;

      expect(cardNumber).toBe("1234");
    });
  });

  describe("with 16 digits", () => {
    test("changes cardNumber field to 16 digits", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardNumber("1234567891011121");
      });
      const { cardNumber } = result.current;

      expect(cardNumber).toBe("1234567891011121");
    });
  });

  describe("with more than 16 digits", () => {
    test("changes cardNumber field to 16 digits", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardNumber("12345678910111213141516");
      });
      const { cardNumber } = result.current;

      expect(cardNumber).toBe("1234567891011121");
    });
  });
});

describe("when setting the card verification value", () => {
  describe("when there are non-numbers characters", () => {
    test("filters non-number characters", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardVerificationValue("1a2b3c");
      });
      const { cardVerificationValue } = result.current;

      expect(cardVerificationValue).toBe("123");
    });
  });

  describe("with less than 3 digits", () => {
    test("changes cardVerificationValue field", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardVerificationValue("12");
      });
      const { cardVerificationValue } = result.current;

      expect(cardVerificationValue).toBe("12");
    });
  });

  describe("with 3 digits", () => {
    test("changes cardVerificationValue field to 3 digits", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardVerificationValue("123");
      });
      const { cardVerificationValue } = result.current;

      expect(cardVerificationValue).toBe("123");
    });
  });

  describe("with more than 3 digits", () => {
    test("changes cardVerificationValue field to 3 digits", () => {
      const { result } = renderHook(() => useCardForm());

      act(() => {
        result.current.setCardVerificationValue("123456");
      });
      const { cardVerificationValue } = result.current;

      expect(cardVerificationValue).toBe("123");
    });
  });
});

describe("when all fields are valid (16 digits card number, 3 digits card verification value and date in the future)", () => {
  test("isValid is set to true", () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardNumber("1234567891012131");
      result.current.setCardVerificationValue("123");
      result.current.setCardExpirationDate(dayjs(new Date(2030, 11, 30)));
    });

    const { isValid } = result.current;

    expect(isValid).toBe(true);
  });
});

describe("when all fields are valid (16 digits card number, 3 digits card verification value and date in the same year)", () => {
  test("isValid is set to true", () => {
    const { result } = renderHook(() => useCardForm());
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const month = currentDate.getMonth() + 2;
    const day = currentDate.getDay();

    act(() => {
      result.current.setCardNumber("1234567891012131");
      result.current.setCardVerificationValue("123");
      result.current.setCardExpirationDate(dayjs(new Date(currentYear, month, day)));
    });

    const { isValid } = result.current;

    expect(isValid).toBe(true);
  });
});

describe("when at least one field is invalid (date in the past)", () => {
  test("isValid is set to true", () => {
    const { result } = renderHook(() => useCardForm());

    act(() => {
      result.current.setCardNumber("1234567891012131");
      result.current.setCardVerificationValue("123");
      result.current.setCardExpirationDate(dayjs(new Date(2010, 11, 30)));
    });

    const { isValid } = result.current;

    expect(isValid).toBe(false);
  });
});
