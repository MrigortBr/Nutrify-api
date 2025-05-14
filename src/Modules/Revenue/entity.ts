export type Revenue = {
  id: number;
  nutri_id: number;
  picture: string;
  name: string;
  typeRevenue: string;
  initHour: string;
  finalHour: string;
  kcal: number;
  recipe: string;
};

export type RevenueDate = {
  id: number;
  nutri_id: number;
  picture: string;
  name: string;
  nameType: string;
  dateInit: string;
  dateFinal: string;
  kcal: number;
  recipe: string;
};

export type RevenuePlan = {
  id: number;
  picture: string;
  name: string;
  nameType: string;
  dateInit: string;
  dateFinal: string;
  kcal: number;
  recipe: string;
};
