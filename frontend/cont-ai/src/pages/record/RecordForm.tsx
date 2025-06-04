import { format, parse } from "date-fns";
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Record, TYPE_CREDIT, TYPE_DEBIT } from '../../interfaces/Record';
import { getById, save, update, validateRecordFields } from '../../services/RecordServices';
import Alert from "../../components/Alert";


type RecordFormProps = {
    recordId: number;
    isEditing?: boolean;
    isClose: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onSubmit: Function;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onCancel: Function;
}

const RecordForm = (recordFormProps: RecordFormProps) => {
    const [id, setId] = useState<number | null>(null);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<number>(0);

    const [showErrorMessage, setShowErrorMessage] = useState('');

    const handleSubmit = async () => {
        const record: Record = {
            id: id,
            date: date,
            description: description,
            amount: parseFloat(amount.replace(',', '.')),
            type: type,
        } as Record;

        console.log('Record antes da validação:', record);

        const validationError = validateRecordFields(record);
        if (validationError) {
            setShowErrorMessage(validationError);
            return;
        } else {
            setShowErrorMessage('');
        }

        try {
            if (!record.id) {
                await save(record);
                recordFormProps.onSubmit();
            } else {
                await update(record);
                recordFormProps.onSubmit();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setShowErrorMessage(error.message);
        }
    };
    useEffect(() => {
        const loadRecord = async () => {
            const record = await getById(recordFormProps.recordId);
            if (record.id != null) {
                setId(record.id);
                setDate(record.date ?? '');
                setDescription(record.description ?? '');
                setAmount(record.amount != null ? String(record.amount) : '');
                setType(record.type ?? 0);
            }
        }

        if (recordFormProps.isEditing) {
            loadRecord();
        } else if (!recordFormProps.isEditing || recordFormProps.isClose) {
            setId(null);
            setDate('');
            setDescription('');
            setAmount('');
            setType(3);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordFormProps.isClose]);

    return (
        <div className="w-full">
            <form className="p-6 rounded-xl bg-base-100 ">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {recordFormProps.isEditing ? 'Editar Lançamento' : 'Novo Lançamento'}
                </h2>

                {/* Hidden ID */}
                <input type="hidden" id="id" defaultValue={id ?? ''} />

                {/* Date */}
                <div>
                    <label htmlFor="date" className="label">
                        <span className="label-text font-medium"> Data (DD/MM/YYYY)</span>
                    </label>
                    <DatePicker
                        id="date"
                        selected={date ? parse(date, "dd/MM/yyyy", new Date()) : null}
                        onChange={(date: Date | null) =>
                            setDate(date ? format(date, "dd/MM/yyyy") : "")
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione uma data"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="label">
                        <span className="label-text font-medium">Descrição</span>
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="label">
                        <span className="label-text font-medium">Valor (R$)</span>
                    </label>
                    <input
                        id="amount"
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Ex: 100.99"
                        className="input input-bordered w-full"
                        required
                    />
                </div>


                {/* Type */}
                <div>
                    <label htmlFor="type" className="label">
                        <span className="label-text font-medium">Tipo de Transação (débito ou crédito)</span>
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(Number(e.target.value))}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value={3} disabled>
                            Selecione o tipo
                        </option>
                        <option value={TYPE_CREDIT.value}>{TYPE_CREDIT.desc}</option>
                        <option value={TYPE_DEBIT.value}>{TYPE_DEBIT.desc}</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    {recordFormProps.isEditing ? (
                        <>
                            <button onClick={() => recordFormProps.onCancel()} type="button" className="btn btn-ghost">
                                Cancelar
                            </button>
                            <button onClick={handleSubmit} type="button" className="btn btn-success">
                                Atualizar
                            </button>
                        </>
                    ) : (
                        <button onClick={handleSubmit} type="button" className="btn btn-neutral w-1/2">
                            Registrar
                        </button>
                    )}
                </div>
            </form>
            {showErrorMessage != '' && (
                <Alert alertType="alert-error" onClick={() => setShowErrorMessage('')}>
                    {showErrorMessage}
                </Alert>
            )}
        </div>
    );
};

export default RecordForm;
