import { useState } from "react";

import { type DatePickerProps } from "antd";
import { Dayjs } from "dayjs";

export type CardFormValues = {
  cardNumber: string;
  cardVerificationValue: string;
  cardExpirationDate: NonNullable<DatePickerProps["value"]>;
};

const isDateInTheFuture = (date: Dayjs) => {
  const now = new Date();

  if (date.isAfter(now, "year")) return true;

  if (date.isSame(now, "year") && date.isAfter(now, "month")) return true;

  return false;
};

export const useCardForm = () => {
  const [cardNumber, setCardNumberState] = useState("");
  const [cardVerificationValue, setCardVerificationValueState] = useState("");
  const [cardExpirationDate, setCardExpirationDate] =
    useState<DatePickerProps["value"]>(null);

  const setCardNumber = (value: string) =>
    setCardNumberState(value.replace(/\D/g, "").slice(0, 16));

  const setCardVerificationValue = (value: string) =>
    setCardVerificationValueState(value.replace(/\D/g, "").slice(0, 3));

  const areInputsValid =
    cardNumber.length === 16 &&
    cardVerificationValue.length === 3 &&
    cardExpirationDate &&
    isDateInTheFuture(cardExpirationDate);

  return {
    isValid: areInputsValid,
    cardNumber,
    setCardNumber,
    cardVerificationValue,
    setCardVerificationValue,
    cardExpirationDate,
    setCardExpirationDate,
  };
};
