import { useCallback, useEffect, useState } from 'react';
type TUseApi<T = unknown> = {
    data: null | T;
    loading: boolean;
    error: unknown;
};

export default function useApi<T = unknown>(api: () => Promise<T>) {
    const [state, setState] = useState<TUseApi<Awaited<ReturnType<typeof api>>>>({ data: null, loading: false, error: null });

    const fetch = useCallback(async () => {
        setState((state) => ({ ...state, loading: true }));
        try {
            const data = await api();
            setState({ data, loading: false, error: null });
            return data;
        } catch (e) {
            setState({ data: null, loading: false, error: e });
        }
    }, [api]);

    useEffect(() => {
        fetch();
    }, [fetch]);
    return { ...state, refetch: fetch };
}
