const https = require('https');

function testAPI(chave) {
    const url = `https://app.pactosolucoes.com.br/api/prest/v2/vendas/${chave}/unidade/1`;
    
    console.log(`Testing: ${url}`);
    
    const options = {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        }
    };

    https.get(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                console.log('\n✅ SUCCESS!');
                console.log(`Unit: ${parsed.nome}`);
                console.log(`Logo: ${parsed.logo}`);
                console.log(`City: ${parsed.cidade}, ${parsed.estado}`);
                console.log(`Key: ${chave}`);
            } catch (e) {
                console.log('\n❌ Failed to parse JSON');
                console.log('Raw response:', data.substring(0, 200));
            }
        });
    }).on('error', (err) => {
        console.log('\n❌ Request failed:', err.message);
    });
}

// Test known keys
const knownKeys = [
    'fcceacc50b1db2fc4e8872b06099c142', // Margarita
    '7724bf6109e5370177c8129aa431b922', // Vieiralves
];

knownKeys.forEach((key, index) => {
    setTimeout(() => {
        console.log(`\n=== Test ${index + 1} ===`);
        testAPI(key);
    }, index * 2000);
});