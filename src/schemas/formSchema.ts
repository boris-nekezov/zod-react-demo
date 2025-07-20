import { z } from 'zod';

export const formSchema = z.object({
	client: z.string().nonempty('Клиентът е задължителен'),
	rows: z.array(
		z.object({
			amount: z.string().nonempty('Сумата е задължителна'),
			groupName: z.string().nonempty('Името на групата е задължително'),
		})
	),
});
