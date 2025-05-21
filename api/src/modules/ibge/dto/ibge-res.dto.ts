export class IbgeFrequencyByNameRes {
  name: string;
  locality: string;
  sex: string;
  res: [
    {
      period: string;
      frequency: string;
    },
  ];
}

export class IbgeFrequencyRankingRes {
  locality: string;
  sex: string;
  res: [
    {
      name: string;
      frequency: number;
      ranking: number;
    },
  ];
}
