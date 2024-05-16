import axios from "axios";

export const API_URL = "http://localhost:3000";

type GenerateNinjaNameApiResponse = {
  ninjaName: string;
};

export type GenerateNinjaNameApiInput = {
  cardNumber: string;
  cardExpirationDate: string;
  cardVerificationValue: string;
};

export const generateNinjaName: GenerateNinjaName = (values) =>
  axios
    .post<GenerateNinjaNameApiResponse>(`${API_URL}/ninja-names/generate`, {
      cardNumber: values.cardNumber,
      cardExpirationDate: values.cardExpirationDate,
      cardVerificationValue: values.cardVerificationValue,
    })
    .then(({ data }) => data.ninjaName);

export type GenerateNinjaName = (
  input: GenerateNinjaNameApiInput
) => Promise<string>;

type GenerateNinjaNamesApiResponse = {
  ninjaNames: Array<{ id: string; name: string }>;
};

export const fetchNinjaNames: FetchNinjaNames = () =>
  axios
    .get<GenerateNinjaNamesApiResponse>(`${API_URL}/ninja-names`)
    .then(({ data }) => data.ninjaNames);

export type FetchNinjaNames = () => Promise<
  Array<{ id: string; name: string }>
>;
