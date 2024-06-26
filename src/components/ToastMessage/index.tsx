import { useContext, useState } from 'react';

import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';
import { ToastContext } from '@/context/toastContext';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const { hideToast } = useContext(ToastContext);

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={() => { hideToast(data) }}>╳</span>
		</div>
	);
};
