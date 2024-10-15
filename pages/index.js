import Head from 'next/head'
import TextToSpeech from '../components/TextToSpeech'

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Next.js Text-to-Speech with ElevenLabs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Text-to-Speech</h1>
                <TextToSpeech />
            </main>
        </div>
    )
}
