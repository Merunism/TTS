import axios from 'axios'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text, voiceId } = req.body
        const apiKey = process.env.ELEVEN_LABS_API_KEY

        console.log('API Key:', apiKey ? 'Set' : 'Not set')
        console.log('Voice ID:', voiceId)
        console.log('Text length:', text?.length)

        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not set' })
        }

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
            console.error('Full error:', error)
            console.error('Error response:', error.response?.data)
            res.status(500).json({
                error: 'Error generating speech',
                details: error.message,
                response: error.response?.data
            })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
