import { useModal } from '../../context/Modal';

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed

	id, className
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return <div id={id} className={className} onClick={onClick}>{buttonText}</div>;
}

export default OpenModalButton;