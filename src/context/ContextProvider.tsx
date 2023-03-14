import { createContext, useState } from 'react';
import { IUser } from '../interfaces/interfaces';

export const GlobalContext = createContext<GlobalState | null>(null);

interface ContextProviderProps {
	children: React.ReactNode;
}

interface GlobalState {
	authorizationToken?: string;
	user?: IUser;
	setState: (state: GlobalState) => void;
}

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
	const [state, setState] = useState<GlobalState | null>(null);
	return (
		<GlobalContext.Provider
			value={{
				authorizationToken: state?.authorizationToken,
				user: state?.user,
				setState,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
