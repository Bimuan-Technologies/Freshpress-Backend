import { SetMetadata } from "@nestjs/common";

export class Public = () => SetMetadata('isPublic', true)