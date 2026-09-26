import { z } from 'zod';

const SORT_FIELDS = ['id', 'title'];
const SORT_ORDERS = ['asc', 'desc'];

const requiredString = (field) => {
  const errorMessage = `Il campo ${field} è obbligatorio e deve essere una stringa non vuota`;

  return z
    .string({
      error: errorMessage,
    })
    .trim()
    .min(1, errorMessage);
};

const positiveInteger = (message) =>
  z.coerce.number({ error: message }).int(message).positive(message);

// SCHEMAS
export const postQuerySchema = z
  .object({
    tag: z
      .string({ error: 'Il parametro tag deve essere una stringa non vuota' })
      .trim()
      .min(1, 'Il parametro tag deve essere una stringa non vuota')
      .optional(),

    search: z
      .string({
        error: 'Il parametro search deve essere una stringa non vuota',
      })
      .trim()
      .min(1, 'Il parametro search deve essere una stringa non vuota')
      .optional(),

    sortBy: z
      .enum(SORT_FIELDS, {
        error: `Campo sortBy non valido. I valori consentiti sono: ${SORT_FIELDS.join(', ')}`,
      })
      .optional(),

    order: z
      .enum(SORT_ORDERS, {
        error: `Campo order non valido. I valori consentiti sono: ${SORT_ORDERS.join(', ')}`,
      })
      .optional(),

    _limit: positiveInteger(
      'Il parametro _limit deve essere un numero intero positivo',
    ).optional(),
  })

  .refine(({ order, sortBy }) => !order || sortBy, {
    error: 'Il parametro order richiede il parametro sortBy',
    path: ['order'],
  });

export const postParamsSchema = z.object({
  id: positiveInteger("L'id deve essere un numero intero positivo"),
});

export const postBodySchema = z.strictObject(
  {
    title: requiredString('title'),
    content: requiredString('content'),
    image: requiredString('image'),

    tags: z.array(
      z
        .string({ error: 'Tutti i tag devono essere stringhe non vuote' })
        .trim()
        .min(1, 'Tutti i tag devono essere stringhe non vuote')
        .transform((tag) => tag.toLowerCase()),

      { error: 'Il campo tags è obbligatorio e deve essere un array' },
    ),
  },

  {
    error: (issue) =>
      issue.code === 'unrecognized_keys' && issue.keys.includes('id')
        ? 'Il campo id viene generato dal server e non deve essere inviato'
        : 'Il body deve essere un oggetto JSON con i soli campi consentiti',
  },
);
