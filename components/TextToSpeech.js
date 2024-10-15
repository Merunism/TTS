import { useState } from 'react'
import VoiceSelector from './VoiceSelector'

export default function TextToSpeech() {
    const [text, setText] = useState('')
    const [selectedVoice, setSelectedVoice] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [audioUrl, setAudioUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, voiceId: selectedVoice }),
            })

            if (response.ok) {
                const audioBlob = await response.blob()
                const url = URL.createObjectURL(audioBlob)
                setAudioUrl(url)
            } else {
                console.error('Error generating speech')
            }
        } catch (error) {
            console.error('Error:', error)
        }

        setIsLoading(false)
    }

    const handleDownload = () => {
        if (audioUrl) {
            const a = document.createElement('a')
            a.href = audioUrl
            a.download = 'generated_speech.mp3'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }

    return (
        <div className="text-to-speech">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech"
                />
                <VoiceSelector onSelect={setSelectedVoice} />
                <button type="submit" disabled={isLoading || !selectedVoice || !text}>
                    {isLoading ? 'Converting...' : 'Convert to Speech'}
                </button>
            </form>
            {audioUrl && (
                <div className="audio-preview">
                    <audio controls src={audioUrl}>
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={handleDownload} className="download-button">
                        Download Audio
                    </button>
                </div>
            )}
        </div>
    )
}
