import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import WarningModal from "../../components/WarningModal";
import { GroupedRecords } from "../../interfaces/GroupedRecords";
import { Record } from "../../interfaces/Record";
import { getGroupedRecords, getLiteralType, remove } from "../../services/RecordServices";
import RecordForm from "./RecordForm";
import RecordInfo from "./RecordInfo";

export default function RecordList() {

    const [recordInfo, setRecordInfo] = useState<Record>({} as Record); // For editing
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);  // Record selected for details
    const [groupedRecords, setGroupedRecords] = useState<GroupedRecords[]>([]); // Grouped records by month and year

    const [loading, setLoading] = useState(false); // Visual loading spinning

    const [warningModalAction, setWarningModalAction] = useState<"delete" | null>(null); // Action for warning modal
    const [recordInfoModalOpen, setRecordInfoModalOpen] = useState<boolean>(false); // Show or hidde modal info
    const [recordModalOpen, setRecordModalOpen] = useState<boolean>(false); // Show or hidde modal form


    const refreshRecords = async () => {
        setLoading(true);
        await getGroupedRecords().then((groupedRecords) => {
            setGroupedRecords(groupedRecords != null ? groupedRecords : []);
            setTimeout(() => setLoading(false), 1000);
        });
    };

    useEffect(() => {
        refreshRecords();
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
            await refreshRecords();
        }, 100);
        setRecordModalOpen(false);
        setRecordInfoModalOpen(false);
    };

    const openForm = (record: Record) => {
        setRecordInfo(record);
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
                    <h1 className="text-4xl font-bold text-left"> Registros financeiros</h1>
                    <div>
                        <button
                            onClick={() => openForm({} as Record)}
                            className="mr-5 btn btn-xl"
                        >
                            Criar
                        </button>
                        <button
                            onClick={async () => {
                                await refreshRecords();
                            }}
                            className="mr-5 btn btn-xl"
                        >
                            Atualizar
                        </button>
                    </div>
                </div>

                {loading ? (
                    <span className="loading loading-lg loading-ring absolute top-1/2 left-1/2"></span>
                ) : (
                    <>
                        {groupedRecords.length === 0 ? (
                            <div className="flex justify-center items-center w-full h-2xl">
                                <p className="text-sm text-gray-500 mt-2">
                                    Nenhum registro encontrado
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-y-auto h-[90%] space-y-8">
                                {groupedRecords.map((group) => (
                                    <div key={group.monthYear} className="bg-base-100 p-4 rounded-xl shadow-md">
                                        <h2 className="text-2xl font-semibold mb-2">{group.monthYear}</h2>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Total Crédito: R${group.totalCredit} | Total Débito: R${group.totalDebit}
                                        </p>
                                        <table className="table table-fixed w-full shadow-sm" >
                                            <thead className="text-md bg-base-200">
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Descrição</th>
                                                    <th>Valor (R$)</th>
                                                    <th>Tipo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {group.records.map((record) => (
                                                    <tr
                                                        className="cursor-pointer"
                                                        key={record.id}
                                                        onClick={() => openRecordDetails(record)}
                                                    >
                                                        <td>{record.date}</td>
                                                        <td>{record.description}</td>
                                                        <td>R${record.amount}</td>
                                                        <td>{getLiteralType(record.type)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>

                        )}

                        {/* Modal for record details */}
                        <Modal
                            modalId="record_info_modal"
                            width="w-[385px]"
                            isOpen={recordInfoModalOpen}
                            onCloseClick={() => setRecordInfoModalOpen(false)}
                        >
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
                                Tem certeza que deseja deletar este lançamento?
                            </WarningModal>
                        )}

                        {/* Create/Edit Modal */}
                        <Modal
                            width="w-[490px]"
                            modalId="record_form_modal"
                            isOpen={recordModalOpen}
                            onCloseClick={() => setRecordModalOpen(false)}
                        >
                            <RecordForm
                                key={recordInfo.id}
                                recordId={recordInfo.id as number}
                                isClose={!recordModalOpen}
                                isEditing={recordInfo.id !== undefined}
                                onSubmit={handleSubmit}
                                onCancel={() => setRecordModalOpen(false)}
                            />
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
}