'use client'

import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const ANIMALS = [
	'Lion',
	'Tiger',
	'Bear',
	'Eagle',
	'Shark',
	'Wolf',
	'Fox',
	'Hawk',
	'Panther',
	'Leopard',
];
const STORAGE_KEY = 'chat_username';

const generateUsername = () => {
	const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
	return `anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
	const [username, setUsername] = useState('Narek');

	useEffect(() => {
		const main = () => {
			const stored = localStorage.getItem(STORAGE_KEY);

			if (stored) {
				setUsername(stored);
				return;
			} else {
				const newUsername = generateUsername();
				localStorage.setItem(STORAGE_KEY, newUsername);
				setUsername(newUsername);
			}
		};

		main();
	}, []);

	return { username };
};
