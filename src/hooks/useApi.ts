import { useCallback, useEffect, useRef, useState } from 'react';
type TUseApiOptions = {
    suspense?: boolean;
    enabled?: boolean;
};

type TUseApiState<T = unknown> = {
    data: null | T;
    loading: boolean;
    error: unknown;
};

export default function useApi<T = unknown>(api: () => Promise<T>, options?: TUseApiOptions) {
    const [state, setState] = useState<TUseApiState<Awaited<ReturnType<typeof api>>>>({ data: null, loading: false, error: null });

    const suspender = useRef<Promise<void>>();

    const fetch = useCallback(() => {
        setState((state) => ({ ...state, loading: true }));
        suspender.current = api()
            .then((data) => {
                setState({ data: data as Awaited<ReturnType<typeof api>>, loading: false, error: null });
            })
            .catch((e) => {
                setState({ data: null, loading: false, error: e });
            });
    }, [api]);

    useEffect(() => {
        if (typeof options?.enabled === 'undefined') fetch();
        if (typeof options?.enabled === 'boolean' && options.enabled) fetch();
    }, [fetch, options?.enabled]);

    if (options?.suspense && state.loading) throw suspender.current;

    if (state.error) throw state.error;

    return { ...state, refetch: fetch };
}
