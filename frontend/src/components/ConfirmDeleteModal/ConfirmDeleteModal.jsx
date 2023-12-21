import { useModal } from '../../context/Modal';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ confirmed, text }) {
	const { closeModal } = useModal();

	return (
		<div class="confirmDeleteModal">
			<h2>{text.title}</h2>
			<div>{text.desc}</div>
			<div className="redBtn btnDeleteModalYes" onClick={()=>{confirmed(); closeModal()}}>{text.btnYes}</div>
			<div className="redBtn btnDeleteModalNo alt" onClick={closeModal}>{text.btnNo}</div>
		</div>
	);
}

export default ConfirmDeleteModal;