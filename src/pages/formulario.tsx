/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { IUserCreate } from '@/types/user';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

export default function Form() {
	const userSchema = yup.object({
		name: yup.string().required('O nome é obrigatório'),
		email: yup.string().required('O e-mail é obrigatório').email('E-mail inválido')
	})

	const { register, handleSubmit, formState } = useForm<IUserCreate>({
		resolver: yupResolver(userSchema)
	});
	const { errors } = formState;

	async function submitForm(formData: IUserCreate) {
		try {
			await axios.post('api/users/create', formData);
		} catch (e) {
			throw new Error('Ocorreu um erro ao enviar os dados');
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(submitForm)}>
					<div >
						<input placeholder="Name" {...register('name')} />
						{errors.name && (<p className={styles.error}>* {errors.name?.message}</p>)}
					</div>
					<div >
						<input placeholder="E-mail"  {...register('email')} />
						{errors.email && (<p className={styles.error}>* {errors.email?.message}</p>)}
					</div>

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
