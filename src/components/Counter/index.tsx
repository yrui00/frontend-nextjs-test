'use client';
import { useState, useEffect, useRef } from 'react';

type CounterProps = {
	initialCount: number;
	onCounterMount: () => void;
	onCounterUnmount: () => void;
	onCounterUpdate: (count: number) => void;
};


export const Counter: React.FC<CounterProps> = ({ initialCount, onCounterMount, onCounterUnmount, onCounterUpdate }) => {
	const [count, setCount] = useState(initialCount);
	const isMounted = useRef(false);


	useEffect(() => {
		if (isMounted.current) {
			onCounterUpdate(count);
		}
	}, [count]);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			onCounterMount();
			return;
		}

		return () => {
			if (isMounted.current) {
				onCounterUnmount();
			}
		};
	}, []);


	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
