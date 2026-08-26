import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import { store, type RootState } from './store';

export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
