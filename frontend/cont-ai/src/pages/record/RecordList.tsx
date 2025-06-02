/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Record } from "../../interfaces/Record";
import WarningModal from "../../components/WarningModal";
import RecordInfo from "./RecordInfo";
import RecordForm from "./RecordForm";
import Navbar from "../../components/Navbar";
import { getAllRecords, remove } from "../../services/RecordServices";

export default function RecordList() {
    const [recordInfo, setRecordInfo] = useState<Record>({} as Record);

    const [recordInfoModalOpen, setRecordInfoModalOpen] = useState<boolean>(false);
    const [recordModalOpen, setRecordModalOpen] = useState<boolean>(false);

    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
    const [records, setRecords] = useState<Array<Record>>([]);

    const [warningModalAction, setWarningModalAction] = useState<"delete" | "restart" | null>(null);

    //Controla a máscara de carregamento
    const [loading, setLoading] = useState(false)

    const refreshRecords = async () => {
        setLoading(true)
        await getAllRecords().then((recordList) => {
            setRecords(recordList != null ? recordList : []);
            setTimeout(() => setLoading(false), 100)
        })
    };

    useEffect(() => {
        refreshRecords()
    }, []);

    const handleDelete = async () => {
        if (selectedRecord?.id !== undefined) {
            await remove(selectedRecord.id).then(async () => {
                await refreshRecords();
                setRecordInfoModalOpen(false);
            });
        }
    };

    const handleSubmit = () => {
        setTimeout(async () => {
            await refreshRecords()
        }, 100)
        setRecordModalOpen(false);
        setRecordInfoModalOpen(false);
    };

    const openForm = (record: Record) => {
        setRecordInfo(record);   // seta o novo
        setRecordModalOpen(true);
    };

    const openRecordDetails = (record: Record) => {
        setSelectedRecord(record);
        setRecordInfoModalOpen(true);
    };

    return (
        <div className="h-screen">
            <Navbar />
            <div className="h-full px-12 py-8">
                <div className="flex justify-between space-x-2 mb-4">
                    <h1 className="text-4xl font-bold text-left">Accounting Records</h1>
                    <div>
                        <button onClick={() => openForm({} as Record)} className="mr-5 btn btn-xl">
                            Criar
                        </button>
                        <button onClick={async () => { await refreshRecords() }} className="mr-5 btn btn-xl">
                            Atualizar
                        </button>
                    </div>
                </div>

                {loading ? (
                    <span className="loading loading-lg loading-ring absolute top-1/2 left-1/2"></span>
                ) : (
                    <div className="overflow-y-auto h-[90%]">
                        <table className="table table-fixed shadow-sm">
                            <thead className="text-xl bg-base-200">
                                <tr>
                                    <th className="w-32 rounded-tl-xl"></th>
                                    <th>Date</th>
                                    <th className="w-[350px]">Description</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records?.map((record) => (
                                    <tr className="cursor-pointer" key={record.id} onClick={() => openRecordDetails(record)}>
                                        <th>{record.id}</th>
                                        <td>{record.date}</td>
                                        <td>{record.description}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal for record details */}
                        <Modal modalId="record_info_modal" width="w-[385px]" isOpen={recordInfoModalOpen} onCloseClick={() => setRecordInfoModalOpen(false)}>
                            <RecordInfo
                                onEditClick={(record: Record) => openForm(record)}
                                onDeleteClick={() => setWarningModalAction("delete")}
                                recordId={selectedRecord?.id as number}
                                isOpen={recordInfoModalOpen}
                            />
                        </Modal>

                        {warningModalAction === "delete" && (
                            <WarningModal
                                isClose={false}
                                acceptBtnType="btn-error"
                                onAcceptClick={() => {
                                    handleDelete();
                                    setWarningModalAction(null);
                                }}
                                onDenyClick={() => setWarningModalAction(null)}
                            >
                                Tem certeza que deseja deletar este servidor?
                            </WarningModal>
                        )}

                        {/* Create/Edit Modal */}
                        <Modal width="w-[490px]" modalId="record_form_modal" isOpen={recordModalOpen} onCloseClick={() => setRecordModalOpen(false)}>
                            <RecordForm
                                key={recordInfo.id ?? 'new'} // força re-render
                                recordId={recordInfo.id ?? 0} // ou talvez até evitar passar se for novo
                                isClose={!recordModalOpen}
                                isEditing={recordInfo.id !== undefined}
                                onSubmit={handleSubmit}
                                onCancel={() => setRecordModalOpen(false)}
                            />

                        </Modal>

                    </div>
                )}
            </div>
        </div>
    );
}