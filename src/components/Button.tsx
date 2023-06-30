import classNames from 'classnames';
import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

type TButtonWithChildren<T = HtmlHTMLAttributes<HTMLButtonElement>> = PropsWithChildren & T;

export const IconButtonV1 = ({ children, className, ...props }: TButtonWithChildren) => {
    return (
        <button className={classNames('p-1 rounded border', className)} {...props}>
            {children}
        </button>
    );
};
