import React, { useState } from 'react';
import Row from './Row';
import { formSchema } from '../schemas/formSchema';

const Form: React.FC = () => {
	const [client, setClient] = useState('');
	const [rows, setRows] = useState([{ amount: '', groupName: '' }]);
	const [shouldBeDisabled, setShouldBeDisabled] = useState(true);
	const [errors, setErrors] = useState<{ client?: string; rows?: string[] }>(
		{}
	);

	const addRow = () => {
		setRows([...rows, { amount: '', groupName: '' }]);
	};

	const removeRow = (index: number) => {
		setRows(rows.filter((_, i) => i !== index));
	};

	const updateRow = (index: number, field: string, value: string) => {
		const updatedRows = rows.map((row, i) =>
			i === index ? { ...row, [field]: value } : row
		);
		setRows(updatedRows);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Валидация със Zod
		try {
			formSchema.parse({ client, rows });
			setErrors({}); // Изчистваме грешките, ако валидацията е успешна
			console.log('Формата е валидна:', { client, rows });
		} catch (err: any) {
			// Обработваме грешките от Zod
			const validationErrors: any = {};
			if (err.errors) {
				err.errors.forEach((error: any) => {
					if (error.path[0] === 'client') {
						validationErrors.client = error.message;
					} else if (error.path[0] === 'rows') {
						const rowIndex = error.path[1];
						validationErrors.rows = validationErrors.rows || [];
						validationErrors.rows[rowIndex] = error.message;
					}
				});
			}
			setErrors(validationErrors);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div>
				<label>Клиент:</label>
				<input
					type="text"
					value={client}
					onChange={e => setClient(e.target.value)}
					disabled={shouldBeDisabled}
					className={`border p-2 ${errors.client ? 'border-red-500' : ''}`}
				/>
				{errors.client && (
					<p className="text-red-500 text-sm">{errors.client}</p>
				)}
			</div>
			<div>
				<label>IBAN:</label>
				<input
					type="text"
					value="BG00XXXX00000000000000"
					disabled
					className="border p-2"
				/>
			</div>
			{rows.map((row, index) => (
				<Row
					key={index}
					index={index}
					row={row}
					updateRow={updateRow}
					removeRow={removeRow}
					disabled={shouldBeDisabled}
					error={errors.rows?.[index]}
				/>
			))}
			<button
				type="button"
				onClick={addRow}
				disabled={shouldBeDisabled}
				className="bg-blue-500 text-white p-2"
			>
				Добави ред
			</button>
			<div className="flex space-x-2">
				<button
					type="button"
					onClick={() => setShouldBeDisabled(false)}
					className="bg-yellow-500 text-white p-2"
				>
					Промени
				</button>
				<button type="submit" className="bg-green-500 text-white p-2">
					Запамети
				</button>
				<button
					type="button"
					onClick={() => setShouldBeDisabled(true)}
					className="bg-red-500 text-white p-2"
				>
					Откажи
				</button>
			</div>
		</form>
	);
};

export default Form;
