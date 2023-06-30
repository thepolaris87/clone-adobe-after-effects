import Editor from '@/Editor/Editor';
import { atom } from 'jotai';

export const editorAtom = atom<null | Editor>(null);
