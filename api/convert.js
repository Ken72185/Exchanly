export default async function handler(req, res) {
    const { from } = req.query;
    const API_KEY = process.env.EXCHANGE_RATE_KEY;

    // Cek apakah API Key sudah di-set di Vercel
    if (!API_KEY) {
        return res.status(500).json({ 
            error: "API Key belum di-setting di Dashboard Vercel, brok!" 
        });
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
        const data = await response.json();

        if (data.result === "error") {
            return res.status(400).json({ error: data['error-type'] });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal nyambung ke server pusat" });
    }
}
