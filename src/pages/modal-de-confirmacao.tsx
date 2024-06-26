/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';

import styles from '@/styles/modal.module.css';
import { ConfirmationModal } from '@/components/ConfirmationModal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState('confirmar');

	function handleModalConfirm() {
		setModalIsOpen(false);
		alert('confirmado');
	}

	function handleModalClose() {
		setModalIsOpen(false);
	}

	function renderModalContent() {
		return (
			<div data-modal-content className={styles['modal-form']}>
				<p>Deseja realmente {modalContent}?</p>
			</div>
		);
	}

	function openModal(type: string) {
		setModalContent(type);
		setModalIsOpen(true);
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => openModal('confirmar')}>
					Abrir modal de confirmação
				</button>
				<button type="button" onClick={() => openModal('deletar')}>
					Abrir modal de deletar
				</button>
			</main>

			{/* Renderizar modal de confirmação */}
			<ConfirmationModal
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				footer={{ confirmText: 'Confirmar' }}>
				{renderModalContent()}
			</ConfirmationModal>
		</>
	);
}
