import React, { useMemo } from 'react';
import { getSound } from '@/apis/sol';
import useApi from '@/hooks/useApi';
import { useAtomValue } from 'jotai';
import { objectsAtom } from '@/atoms/atom';
import { AnimationList } from './Animation/AnimationList';

export const Footer = () => {
    const objects = useAtomValue(objectsAtom);
    const { data } = useApi(getSound);
    const sounds = useMemo(() => data?.filter((sound) => sound.extension === 'mp3'), [data]);

    return (
        <React.Fragment>
            <div className="flex">
                <div className="w-full">
                    <div className="font-[700] mb-2">Animation</div>
                    <div className="px-[10px]">
                        {objects.map((object, index) => {
                            return <AnimationList key={index} object={object} sounds={sounds} />;
                        })}
                    </div>
                </div>
                {/* <div className="w-[55%] font-[700]">TimeLine</div> */}
            </div>
        </React.Fragment>
    );
};
