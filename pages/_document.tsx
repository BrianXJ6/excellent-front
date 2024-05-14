import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="pt-BR" className="h-100" data-bs-theme="dark">
            <Head />
            <body className="h-100">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
