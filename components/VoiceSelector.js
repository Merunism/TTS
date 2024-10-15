import { useState, useEffect } from 'react'
import axios from 'axios'

export default function VoiceSelector({ onSelect }) {
    const [voices, setVoices] = useState([])

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
                    headers: {
                        'xi-api-key': process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY,
                    },
                })
                setVoices(response.data.voices)
            } catch (error) {
                console.error('Error fetching voices:', error)
            }
        }

        fetchVoices()
    }, [])

    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select a voice</option>
            {voices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                    {voice.name}
                </option>
            ))}
        </select>
    )
}
