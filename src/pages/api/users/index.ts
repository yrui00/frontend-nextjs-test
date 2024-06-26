/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Método de requisição não autorizado" });
	}

	const users: IUser[] = [
		{
			id: 1,
			name: 'Yuri Salinas',
			email: 'yuri.salinas@gmail.com',
		},
		{
			id: 2,
			name: 'Isis Rodrigues',
			email: 'isis.rodrigues@gmail.com',
		},
		{
			id: 3,
			name: 'Osiris Alves',
			email: 'Osiris.alves@gmail.com',
		}
	];

	return res.status(200).json(users);
};
