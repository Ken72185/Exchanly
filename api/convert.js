export default async function handler(req, res) {
    const { from } = req.query;
    // EXCHANGE_RATE_KEY adalah nama variable di dashboard Vercel nanti
    const API_KEY = process.env.EXCHANGE_RATE_KEY; 

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
        const data = await response.json();
        
        // Kirim data balik ke frontend
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}
