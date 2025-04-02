import DatabaseConnection from "../../data/connection";
import { NutriHour } from "./Entity";
import NutriHourModel from "./Model";

export default class NutriHourService {
  private model: NutriHourModel;

  constructor() {
    this.model = new NutriHourModel(DatabaseConnection.getInstance());
  }

  async getFullHoursByTime(date: string | undefined, nutriId: number | undefined) {
    if (!date) throw new Error("NC-E-NP");
    if (!nutriId) throw new Error("NC-E-NN");

    const newDate: Date = this.parseDate(date);

    return await this.model.getForDate(newDate, nutriId);
  }

  async getFullHoursByTimeAndID(date: string | undefined, nutriId: string | undefined) {
    if (!date) throw new Error("NC-E-NP");
    if (!nutriId) throw new Error("NC-E-NN");

    const newDate: Date = this.parseDate(date);

    return await this.model.getForDateAndId(newDate, nutriId);
  }

  async updateHoursById(nutriId: number | undefined, data: NutriHour) {
    if (!nutriId) throw new Error("NC-E-NN");

    return await this.model.updateHoursById(nutriId, data);
  }

  async createHours(nutriId: number | undefined, data: NutriHour) {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!nutriId) throw new Error("NC-E-NN");

    return await this.model.createHours(nutriId, data);
  }

  async deleteHours(nutriId: number | undefined, id: string | undefined) {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!id) throw new Error("NC-E-NN");

    return await this.model.deletehour(nutriId, id);
  }

  private parseDate(dateString: string): Date {
    // Expressão regular para validar o formato "YYYY-MM-DD"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateString)) {
      throw new Error("NC-E-NP");
    }

    // Converter a string para um objeto Date
    const date = new Date(dateString);

    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      throw new Error("NC-E-NP");
    }

    return date;
  }
}
