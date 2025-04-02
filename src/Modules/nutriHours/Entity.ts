export class NutriHour {
  id?: number;
  nutri_id: number;
  service_init: Date;
  service_final: Date;
  void: boolean;

  constructor(nutri_id: number, service_init: Date, service_final: Date, voidStatus: boolean = true, id?: number) {
    this.id = id;
    this.nutri_id = nutri_id;
    this.service_init = service_init;
    this.service_final = service_final;
    this.void = voidStatus;
  }

  isValid(): boolean {
    return this.service_init < this.service_final;
  }

  getDuration(): number {
    return (this.service_final.getTime() - this.service_init.getTime()) / (1000 * 60);
  }

  toJSON(): object {
    return {
      id: this.id,
      nutri_id: this.nutri_id,
      service_init: this.service_init.toISOString(),
      service_final: this.service_final.toISOString(),
      void: this.void,
    };
  }
}
