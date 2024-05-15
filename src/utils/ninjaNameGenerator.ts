const clans = [
  "Aburame",
  "Akimichi",
  "Fūma",
  "Funato",
  "Hagoromo",
  "Hatake",
  "Hōki",
  "Hoshigaki",
  "Hyūga",
  "Iburi",
  "Inuzuka",
  "Kamizuru",
  "Karatachi",
  "Kodon",
  "Kumanoi",
  "Lee",
  "Nara",
  "Ōtsutsuki",
  "Sarutobi",
  "Sendō",
  "Senju",
  "Shiin",
  "Shimura",
  "Shirogane",
  "Tenrō",
  "Tsuchigumo",
  "Uchiha",
  "Uzumaki",
  "Wagarashi",
  "Yamanaka",
];

const names = [
  "Aiko",
  "Akira",
  "Ayumi",
  "Daiki",
  "Emi",
  "Hiroshi",
  "Kaede",
  "Kaito",
  "Keiko",
  "Kenji",
  "Hana",
  "Makoto",
  "Miyu",
  "Naoki",
  "Natsumi",
  "Ren",
  "Riko",
  "Ryota",
  "Sakura",
  "Shinji",
  "Sora",
  "Takumi",
  "Tomoko",
  "Yoshi",
  "Yui",
  "Yuki",
  "Yumi",
  "Yusuke",
  "Yuzuki",
  "Zen",
];

const digestString = (value: string) =>
  value
    .replace(/\D/g, "")
    .split("")
    .reduce((acc, curr) => acc + parseInt(curr), 0) % clans.length;

export type GenerateNinjaName = (args: {
  cardNumber: string;
  cardExpirationDate: string;
  cardVerificationValue: string;
}) => string;

export const generateNinjaName: GenerateNinjaName = ({
  cardNumber,
  cardExpirationDate,
  cardVerificationValue,
}) => {
  const name = names[digestString(cardNumber)];

  const clanName =
    clans[digestString(cardVerificationValue.concat(cardExpirationDate))];

  return `${name} ${clanName}`;
};
