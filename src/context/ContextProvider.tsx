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
		retryEventRefreshDelay: number;
		retryTicketReserveDelay: number;
	};
	setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const initialState: GlobalState = {
	settings: {
		retryEventRefreshDelay: 1000,
		retryTicketReserveDelay: 500,
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
					retryEventRefreshDelay:
						state?.settings.retryEventRefreshDelay,
					retryTicketReserveDelay:
						state?.settings.retryTicketReserveDelay,
				},
				setState,
				event: state?.event,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
