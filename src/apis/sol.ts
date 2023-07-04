import axios from 'axios';
import { getConfigure } from './util';

const solClient = axios.create({ baseURL: `${import.meta.env.VITE_API_HOST}` });

const createGetRequest = <T = unknown>(url: string) => solClient.get<T>(url, getConfigure());
// const createPostRequest = (url: string, body?: any) => solClient.post(url, body, getConfigure());
// const createDeleteRequest = (url: string) => solClient.delete(url, getConfigure());

export const getImage = () => createGetRequest<TGetImage[]>(`/editor/image/D1`).then((r) => r.data);

export const getSound = () => createGetRequest<TGetSound[]>(`/editor/sound/D1`).then((r) => r.data);
