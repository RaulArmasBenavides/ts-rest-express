

export type CreateLeadDto = {
  name: string;
  email?: string;
  phone?: string;
  source?: string;
};


export class CreateLeadDTO {
  static create(props: any): [string?, CreateLeadDto?] {
    const name = String(props?.name ?? '').trim();
    if (!name) return ['name is required'];

    const email =
      props?.email !== undefined ? String(props.email).trim().toLowerCase() : undefined;

    const phone =
      props?.phone !== undefined ? String(props.phone).trim() : undefined;

    const source =
      props?.source !== undefined ? String(props.source).trim() : undefined;

    const dto: CreateLeadDto = { name, email, phone, source };
    return [undefined, dto];
  }
}

export type UpdateLeadDto = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
};


export class UpdateLeadDTO {
  static create(props: any): [string?, UpdateLeadDto?] {
    const id = String(props?.id ?? '').trim();
    if (!id) return ['id is required'];

    const name =
      props?.name !== undefined ? String(props.name).trim() : undefined;

    const email =
      props?.email !== undefined ? String(props.email).trim().toLowerCase() : undefined;

    const phone =
      props?.phone !== undefined ? String(props.phone).trim() : undefined;

    const source =
      props?.source !== undefined ? String(props.source).trim() : undefined;

    // Al menos un campo a actualizar
    if (
      name === undefined &&
      email === undefined &&
      phone === undefined &&
      source === undefined
    ) {
      return ['At least one field must be provided'];
    }

    const dto: UpdateLeadDto = { id, name, email, phone, source };
    return [undefined, dto];
  }
}