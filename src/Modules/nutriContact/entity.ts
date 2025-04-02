import { Knex } from "knex";

export type nutriSimple = {
  nutri_id: number;
  name: string;
  picture: string;
  price: number;
  rating: number;
  number_service: number;
};

export type NutriLast = {
  user_id: number;
  nutri_id: string;
  rating: number;
  created_at: Date;
  picture: string;
  name: string;
  ratingNutri: string;
  price: number;
  username: string;
};

export type NutriOpen = {
  user_id: number;
  nutri_id: string;
  service_init: Date;
  service_final: Date;
  picture: string;
  name: string;
  username: string;
  finished: boolean;
  rating: number;
};
