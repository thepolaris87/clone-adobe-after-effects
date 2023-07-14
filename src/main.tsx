import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/styles';

const preloadFont = (font: string) =>
    new Promise((resolve) => {
        document.fonts.load(font).then(resolve);
    });

const fontList = ['30px NotoSansKRRegular', '30px NanumSquereRoundR', '30px NanumSquereRoundB', '30px OneMobilePOP'];

Promise.all([fontList.forEach((el) => preloadFont(el))]).then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        // <React.StrictMode>
        <App />
        // </React.StrictMode>,
    );
});
