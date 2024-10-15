import axios from 'axios'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text, voiceId } = req.body
        const apiKey = process.env.ELEVEN_LABS_API_KEY

        try {
            const response = await axios.post(
                `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
                { text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xi-api-key': apiKey,
                    },
                    responseType: 'arraybuffer',
                }
            )

            res.setHeader('Content-Type', 'audio/mpeg')
            res.send(response.data)
        } catch (error) {
            res.status(500).json({ error: 'Error generating speech' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
