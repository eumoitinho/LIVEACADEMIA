const https = require('https');

function testAPI() {
    const url = 'https://app.pactosolucoes.com.br/api/prest/v2/vendas/fcceacc50b1db2fc4e8872b06099c142/unidade/1';
    
    console.log('Testing URL:', url);
    
    const options = {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'origin': 'https://livemargarita.hotsite.in',
            'referer': 'https://livemargarita.hotsite.in/',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        }
    };

    const req = https.get(url, options, (res) => {
        console.log('Status:', res.statusCode);
        console.log('Headers:', res.headers);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Response length:', data.length);
            try {
                const parsed = JSON.parse(data);
                console.log('Logo URL:', parsed.logo);
                console.log('Nome:', parsed.nome);
                console.log('Full data:', JSON.stringify(parsed, null, 2));
            } catch (e) {
                console.log('Raw data:', data.substring(0, 500));
                console.log('Parse error:', e.message);
            }
        });
    });
    
    req.on('error', (err) => {
        console.error('Request error:', err);
    });
    
    req.setTimeout(10000, () => {
        console.log('Request timeout');
        req.destroy();
    });
}

testAPI();