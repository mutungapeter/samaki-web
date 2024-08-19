import { z, ZodType } from "zod";

export   const addressSchema = z.object({
    name: z.string().nonempty("Name is required"),
    phone_number: z.string().nonempty("Phone number is required"),
    id_number: z.string().nonempty("ID number is required"),
    county: z.number().int().nonnegative("County is required"),
    sub_county: z.number().int().nonnegative("Sub-county is required"),
    ward: z.number().int().nonnegative("Ward is required"), 
    pickup_station: z.number().int().optional(),
    description: z.string().optional(),
    // customer: z.number().int().nonnegative("Customer is required"),
    town: z.string().nonempty("Town is required")
  });