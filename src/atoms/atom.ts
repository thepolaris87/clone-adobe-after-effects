import Editor from '@/Editor/Editor';
import { atom } from 'jotai';
import { fabric } from 'fabric';

export const editorAtom = atom<null | Editor>(null);

export const objectsAtom = atom<fabric.Object[]>([]);
