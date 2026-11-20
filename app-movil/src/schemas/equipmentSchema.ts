
import { z } from 'zod';

export const equipmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'El nombre del equipo es obligatorio.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),

  category: z
    .string()
    .trim()
    .min(1, 'Selecciona una categoría.'),

  brand: z
    .string()
    .trim()
    .min(1, 'La marca es obligatoria.'),

  quantity: z
    .string()
    .trim()
    .min(1, 'La cantidad es obligatoria.')
    .regex(/^-?\d+$/, 'La cantidad debe ser un número entero.')
    .transform(Number)
    .pipe(
      z.number().int().min(0, 'La cantidad no puede ser negativa.')
    ),

  status: z
    .string()
    .trim()
    .min(1, 'Selecciona el estado del equipo.'),

  pricePerDay: z
    .string()
    .trim()
    .min(1, 'El precio por día es obligatorio.')
    .regex(/^-?\d+$/, 'El precio debe ser un número entero.')
    .transform(Number)
    .pipe(
      z.number().int().min(0, 'El precio no puede ser negativo.')
    ),

  description: z
    .string()
    .trim()
    .min(1, 'La descripción es obligatoria.')
    .max(500, 'La descripción no puede superar los 500 caracteres.'),
});

export type EquipmentFormValues = z.input<typeof equipmentSchema>;
export type EquipmentFormData = z.output<typeof equipmentSchema>;
