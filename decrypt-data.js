const crypto = require('crypto');
const fs = require('fs');

// Chave fornecida
const RAW_SECRET = 'a+oZvP9a2ob1vl54zwT9BlSCxHgI4o+lfMXPyjnDc2g=';
const KEY = crypto.createHash('sha256').update(RAW_SECRET).digest();

// Dados criptografados
const encryptedData = [
  '{"v":1,"iv":"VpjRZu/zACZ2dV99","tag":"tyEmmJUGe175eD+MvTTJAw==","data":"ICpE3i+7E2XsfH5TtJFDZ+YtB5e0HvfqiOnKRVOXpK+SRvPVu5LRBrnd1+EZhVpc9f1rkEFlpevXsWgqnNcbuZuNJvM2lxml7Ts="}',
  '{"v":1,"iv":"3D8HwvuiAZgOcioq","tag":"MtdLrAU71xhdNuqlJFtOVQ==","data":"lhX+65v/ZUhlF/Aj+83CxMvrRSKZsDSGhk7mhX0jEMWgJ5XoksOkfbV6aKQk5wI/L9GcgZPxzoVETj6NwhTIBp8k8nf/0PAXwss="}',
  '{"v":1,"iv":"65vmVEt85moqxalG","tag":"UlANO9YDAsI2Ejwf+RzICQ==","data":"qkXNHRnxApWWhcLhDFRRG+08ANBEyJcacZWIbrqWieSdD7Ntj7D8eRGtdqSIUEHTodPtBtY/wsT2o3CuTdn3o3hwyKL4SyYeTRA="}',
  '{"v":1,"iv":"K6FVP9GweFxlbbBQ","tag":"j3Ve/QEpzwpSYlSdVbj8Bg==","data":"f2IeGlLwLJeAzEcq9k6yYgMB5RieX5l3mh5F+ux9JkNZ0pHMSVIcIwff87NxzGqMzpvQocDxPSkhnP99z1TTibbuDBAxWzzGOqc="}',
  '{"v":1,"iv":"o5o3eklXeQpu1vGG","tag":"+v0iD3xgeypJzEkbFGVAyA==","data":"1CWLHiy/iD6yNcN2wXDei8FYRwFE/RPsXhP25Wx4+Sqa5b5S5pv+b3m0PIlBWNvB7oCZGc7FLH2O4+BfQ267KNAdShh89/AVgDE="}',
  '{"v":1,"iv":"yV9nkWVAtHvNs/tX","tag":"PfPKP1hYPzHcOcQ/9q5bSg==","data":"eYwo8mXagSxnYDXDotEYXz9i9EQCSk8aJM0nIsmE2V1MxUOQ5VrbwzCASvoo6scvJzRL2x7SVb5V7TEU2QeroKog6irMXjF/v3c="}',
  '{"v":1,"iv":"aK2WEFhy3jHXy8PG","tag":"+VUhLrG223dXgCP8T/4IqQ==","data":"C3jm6kCatwJyBgvCmubK6Yg/mBSS0fzU9UrYKlRZpkF1mXEpQP+ffmz6Qo15DFSwl83grpPymm1UAC4XOkkBbBIF88y28pdcMbo="}',
  '{"v":1,"iv":"18TjPCE2RUODyaQX","tag":"J/pfxZ526QEDLkAardOAuQ==","data":"AQ15HzG50paXhWgGwMLIELjjygEoCzXUcaiH8KWZdJI/mhZKgv5pwOy/ptWv/LjEMfgcHiSxeH0ymeVX5MORnzHdpULndgNSM2s="}',
  '{"v":1,"iv":"huG2VKUr6AHqsWls","tag":"61RP9WCup/08/tuMTwyORw==","data":"NUfF/KVeroLmcyS6sySx2lE7KOlERnveJUrYwJcXUPh3J7AM4ub6cvDWOx0/fSFevfI0ilqMdG9SOVh6mdtHkYn5vrVB4VqwbMg="}',
  '{"v":1,"iv":"JHUT3h1PlJ+6aWRD","tag":"adjy2hIWOwO9f8acif3cIw==","data":"Kh2VdrCR7iS+p6uLqoGsZNDH/FOXKpoks59Po1CyFMd7h+sw3GCX7fBdDx/h6QyPYjKGZqFVoh03WYi59pbhvEQ50FhJ/fEblLo="}',
  '{"v":1,"iv":"16oytgrHkOwADSGj","tag":"XwLHpfpCGOiZg5axMJF8EQ==","data":"UwrtnD86+EWVPCAiqylxQ2aqnQRWuMwtJTvyZUbkF4jrH2raF4LyWjVMmsv3F4PI+kNEBqLwjRouu9XkATsV3u9ZtHlGD4MtRII="}',
  '{"v":1,"iv":"0O5dv2NSWmazp2gc","tag":"0w61XsQRh7+WOIRWIpG6fQ==","data":"4xKC5901KJT+DgA4ukaf4OqhssD4QXnlBCnxcfMy+pMjaG+EK73Wt8ln0eKKsj9+/H0/prLDUZSA6zKJU79Nq3a37hCfHRyUvkA="}',
  '{"v":1,"iv":"KRE+3oSwBOaGnyLT","tag":"1+Ue2fezk01hR8P/T3AhWA==","data":"py2Xegg2RDTYbkDrAIr3+3bavScpemO8/Yi0ooic0j2tqKnkASsm32wxDjPG+3mKjDQjFgVxJJlQLIE/xcxHvioTE9LL4KWJf8E="}',
  '{"v":1,"iv":"nbnKtMI7bgRELMTf","tag":"xrhn6JYWuCAnjX1aaS0bbg==","data":"XTRxq4aK6DB1mcGEUA6sg8fgAFNIPTiT5aWqi10rfYOVkDD17ks1nlzW/jvxtQ92k/an5GszJ6SUjunKfKQqxeXNVjU3bDubQ0I="}',
  '{"v":1,"iv":"+2ozXqYMhml3mwgv","tag":"MDHQUm7teg+YmT0wqecAOQ==","data":"QwQT3fTT0SxPPvxdch+NucJjWtA0ByrfmpXbQXQx42nV9ZyzWM+Wks4YCguGr/unZCQiufXg7qy3yfFf0qq9xHcJX/FJDyE9ayk="}',
  '{"v":1,"iv":"wBsprGiWGZ9J3uN1","tag":"SPCIZ6RRFVW1AMsgdXenMw==","data":"UXzJdmqfeqh/9BEinV4kvm8+ousJBm/Y2TKs8XwO6l7NIuRe9+6zbpqp3YbJTJ9PVT3LwRMQRst0rZl2+/Oo+sv6SRAbCGLS8zA="}',
  '{"v":1,"iv":"JTQhL1f1j0gbTv9l","tag":"yTaOgPuQBNNd/ZI6OBcHIA==","data":"LKWvRkTMjU/25Om+173S8ueWgGVie1tYynPEa2B47QOuBQwnF9YJZ9RNFztI4OemgLic7uc+5xTm37pSFyi6+C4Xl6U6xphPTZo="}',
  '{"v":1,"iv":"3so2zC+u6MRzOk24","tag":"YGtC8xJ+mYMc6vhe16T4Fg==","data":"Rl22jkCqJojkX/4SGQGTgGdXIbiegLnIBHwlzcEVAmsnnXBtnkzUhc3b0Ue6uqKum69NQK2xaDzcuI/vNUdnhYxjmdTzvZmmNYQ="}',
  '{"v":1,"iv":"6lcqXBBMXnm0BwnT","tag":"DijzFfBNemVMY5zjgSCo9g==","data":"Qum6+DIbyJXWt3l25r0VIZT4VwSFyy4oOk+1WMpGipQVy1P6Y71LMHC1UeAAMnOm6hVIgMpJZEfTuuw+B5Ie8F/ctbWnewNNhUM="}',
  '{"v":1,"iv":"HwcYQ3sUQPuSG/dt","tag":"3IfSKhhwkGMT9El6ObWm4g==","data":"Rg2WzYMYWjF632MLGjn+M/vbMzEk4c5i4lozTz+AOCqrhgRrxM13U8PQrgKZbFmzInKkE6wH7+Uw6+UxHZLnWzWN1njcel7QJTs="}',
  '{"v":1,"iv":"8N2nG4GzF301avYk","tag":"Nla5ql5RF5/Szj1kOzZrAA==","data":"q7F1oOEoRIEMA1S/04fjFqU54UW3U5X/z9NXFSQ0q4qYrWg6SvbqUjf3QCW6rDH8JnyZd3gr5uKBlMFbpwXR4bEOGHrNkofTbFs="}',
  '{"v":1,"iv":"YVn+vP4cxx3HrEmj","tag":"Ohsrgpcn7JoTo/QzmoR3RA==","data":"Hv5SX0ZLljSiyHBB2NHK1QrftEJueDkbTHhfUB01eMj4KiIUqZEWjGENmh8YAUcpDXY6RhnShdPukizaJV7eOWgoEnEp96Qtago="}',
  '{"v":1,"iv":"DqH0zHs5PmMYoAsA","tag":"66fSqfJltlceGmkLDeiUMQ==","data":"ISoRgHts7U1mfKvzI7h7G6aYrAOQGv1ZR/8qsGKHjfjaOaERVnIm24EKVXIa7BW48jFuhqrrQHhErLAneG826mr1mvoJySJhmMU="}',
  '{"v":1,"iv":"YUoarxB7MJVKEaO3","tag":"rwxRnAqRvp9Fs8Y5uJDNzQ==","data":"OhoCSQ3zE91IZlcBjMq7gVJL1SyfxuX/cj1bLbaPlPD2phGCzFzCZbC1wKU+fh7dCx4hL/9jRAxqaPxkAZNRVAfdj4ixxPNUOAc="}',
  '{"v":1,"iv":"0AQnUOdyKq7x8ray","tag":"YiMfhAVU6tJtkIjIJSXlOQ==","data":"HKvKjB+ADP2g8II28oDdVYDK0H70W9K/62TM34ZsHTSjbw4jq2Hf4eWIsT39g+U06VN0UQqjHNgenfsSGfYwNHYBTdXQl0ayEes="}',
  '{"v":1,"iv":"ZnCOiVzy1B5aaRAu","tag":"Wp9kT6wjTr2fjKyGmZManA==","data":"W6lwBiCxh6eW492L3QPLp4cG5o7c4ASOBCInNjfO0zhSnD7NXbsJvaYPD1n9zJNA3Z5XniZ7B0eLk/yYMQQ6GxIptY7sWc7OuKA="}',
  '{"v":1,"iv":"gkMexlr+Zu0+81K3","tag":"jl8lrtUruGrx8LfnEXqUaQ==","data":"5ynydkd6A2/1o9orlxmKLJpMXc74a4L1X70wvR9x2Mya4aTWnHx8+vp1NUVz7CRvgoyNpuaUxPOaEcxmSrTpemEAXxVwaqOjKWE="}',
  '{"v":1,"iv":"ZTf5cHLme7Vmekxj","tag":"I+eTmtQT8kovgJfgrlKU1g==","data":"3jyiI/OpvZXQPbKGrkXpypLts2xWg/W8qPPo1ZJroJFhPcxGsxp9wOlGeXQKF68eJLn7abMANSCPZ75b5qodmEFy351Pax2M49w="}',
  '{"v":1,"iv":"j+ea95MQ6ptZlQW8","tag":"lEnXVgpRsO1C5F6wxJQJsw==","data":"As+AYaNo0VlqpNHvMeq58+2J05eHNXRBqota5kIWwxHPo6J49hPqNePpge0ePY1tenIcMxjE+aWFrA3thWx5XWAvWsrQK/nFsAA="}',
  '{"v":1,"iv":"DNHRRWWV3ZjFSOGc","tag":"83JDApnqDDrUFsRHqMEKmg==","data":"XVrrOIdxJJXYQBlrH2mViKBJxK02VglQW85wrez/um82ePTBnwL8qCDZCR+c/lX6jf99K97Tt9yWI2PY9nQbuhW8hVbxouoXAyc="}',
  '{"v":1,"iv":"KaCHB3lnSckrg1HQ","tag":"KsTKqLBM47lm3VJkZ2PuBg==","data":"K2eU74tGtMoydPGfnnn2Nope4bPEZcm2UN65VBPqKrY5w+5odEQNeKsdhvxmsmWdZZ8A9dkE9yeNWA0Ds2PcDAoooXkHWsBFM7g="}',
  '{"v":1,"iv":"79UdWi2/cDq2+Be9","tag":"H81fiExjUTMTlX168bEvng==","data":"I/Af3ez8NEHG1jn10iE2LMdgHyBuczLGcNwIxfTLZXzFyYBLN2j8ifNf8vW05PjgdliemgY10hHvZ3of1gZiPRJCAy0pC54SNWk="}',
  '{"v":1,"iv":"PUigke3hgIKOIoll","tag":"sbBjgvXRFtu2gPhpkICH4w==","data":"s9xjabc3qKHTuOuaWmF8f5Z60/88tkf7DLjMc2aKtCKuV3ClsVLgAm7gQHhuvSbUzNighX6bapGuhivmz0I6dD41a+MwFkd0hUo="}',
  '{"v":1,"iv":"aVOC6WrCUHjhn7Js","tag":"mmnzhrWJ8TW9KnvHhI7dpQ==","data":"5MnNwSzGbxGFcWj0SBtaUJne8KBUwOOGuEkLhVQVNVzj/aKVwKEj8EF3b0ffolk5Gicl3J5N9wvRI6wXrZYv0S/+FJARl+LZ7Eg="}',
  '{"v":1,"iv":"lNEzEgRkJH90J8CH","tag":"Q35RT44qWDOIbhNZ+5pQ0A==","data":"AiU/XdOjSrJEFI6j4KMzUyvDuC8OZmZOvgce8nT9p0d5TWmFvxd6ufYkgOaVECHDVANLLxPoU+T4b/PgRYwgw1n1t6JQYYXsSOQ="}',
];

function decrypt(serialized) {
  try {
    const payload = JSON.parse(serialized);
    if (payload.v !== 1) throw new Error('Versão de payload desconhecida');
    const iv = Buffer.from(payload.iv, 'base64');
    const tag = Buffer.from(payload.tag, 'base64');
    const data = Buffer.from(payload.data, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (err) {
    console.error('[crypto] Falha ao decriptar', err);
    throw new Error('Falha na decriptação');
  }
}

// Descriptografar todos os dados
const results = [];
encryptedData.forEach((data, index) => {
  try {
    const decrypted = decrypt(data);
    console.log(`Dado ${index + 1}: ${decrypted}`);
    results.push(decrypted);
  } catch (error) {
    console.error(`Erro ao descriptografar dado ${index + 1}:`, error.message);
    results.push('ERRO');
  }
});

// Criar CSV
const csvContent = results.map((item, index) => `"${index + 1}","${item.replace(/"/g, '""')}"`).join('\n');
const csvHeader = '"Index","Decrypted Data"\n';
fs.writeFileSync('decrypted-data.csv', csvHeader + csvContent);
console.log('\nArquivo CSV criado: decrypted-data.csv');