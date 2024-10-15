export default function handler(req, res) {
    const apiKey = process.env.ELEVEN_LABS_API_KEY
    res.status(200).json({
        apiKeySet: !!apiKey,
        apiKeyPreview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : null
    })
}
