/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import axios from 'axios';
import { GetStaticProps } from 'next';

export default function Lista({ list }: { list: ICity[] }) {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const getCityList = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/cities/10');
			const data = await response.json();

			return data;
		} catch (error) {
			return []
		}
	}
	const cityList = await getCityList();
	return {
		props: {
			list: cityList,
		},
		revalidate: 60,
	}
}