import { httpStatusCodes } from "../http/Status";

export function handleMoselError() {}

export class MoselError extends Error {
  status: number;
  source: string;
  description: string;
  parameters: string;

  constructor(
    description: string,
    status: number = httpStatusCodes.BAD_REQUEST,
    parameters: string = 'no parameter',
    source: string = "mosel"
  ) {
    super();
    this.description = description;
    this.message = description;
    this.status = status;
    this.source = source;
    this.parameters = parameters;
  }
}

export class MoselValidationError extends MoselError {}
