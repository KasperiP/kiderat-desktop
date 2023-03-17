import { createContext, useState } from 'react';
import { IEvent, IUser } from '../interfaces/interfaces';

export const GlobalContext = createContext<GlobalState | null>(null);

interface ContextProviderProps {
	children: React.ReactNode;
}

interface GlobalState {
	authorizationToken?: string;
	user?: IUser;
	event?: IEvent;
	settings: {
		amount: number | null;
	};
	setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const initialState: GlobalState = {
	settings: {
		amount: null,
	},
	setState: () => {
		return;
	},
};

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
	const [state, setState] = useState<GlobalState>(initialState);
	return (
		<GlobalContext.Provider
			value={{
				authorizationToken: state?.authorizationToken,
				user: state?.user,
				settings: {
					amount: state?.settings.amount,
				},
				setState,
				event: state?.event,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
