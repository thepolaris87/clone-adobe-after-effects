declare module '*.mp3';

declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

interface ImportMetaEnv {
    readonly VITE_API_HOST: string;
    // 다른 환경 변수들에 대한 타입 정의...
}
