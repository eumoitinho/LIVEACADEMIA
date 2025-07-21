"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"

export const locations = [
  // Tradicionais
  {
    id: "cachoeirinha",
    name: "Cachoeirinha",
    address: "Avenida Ajuricaba, 660, Cachoeirinha",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c058a1514ca2f:0xa18406c769d761a2/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipNUN0DkThYECnzvBSdJFw85JeJkkvRULZFqwfAq%3Dw160-h106-k-no-pi-0-ya5.6600003-ro-0-fo100&ik=CAoSLEFGMVFpcE04cWNOaFp0X3p0bDlTcTJnc3BkNXRIdXJzaGE0N0hsX2hDTTVu",
  },
  {
    id: "camapua",
    name: "Camapuã",
    address: "Avenida Camapuã, 53, Cidade de Deus",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Atendimento domingos", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b8a016dedf9:0x8d3f037cd7b2e966/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipM8qcNhZt_ztl9Sq2gspd5tHursha47Hl_hCM5n%3Dw160-h106-k-no-pi0-ya287.75-ro-0-fo100&ik=CAoSLEFGMVFpcE04cWNOaFp0X3p0bDlTcTJnc3BkNXRIdXJzaGE0N0hsX2hDTTVu",
  },
  {
    id: "centro",
    name: "Centro",
    address: "Avenida Getúlio Vargas, 773, Centro",
    hours: "Seg-Sex: 5h-22h | Sáb: 8h-17h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c05ac84c35e4b:0xbb0273ed6eee3c4/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipPJ8mTnqSA2qhh0c_UlzZmJ8LtNyLaeE2m8Vz0q%3Dw160-h106-k-no-pi0-ya339.9-ro-0-fo100&ik=CAoSLEFGMVFpcFBKOG1UbnFTQTJxaGgwY19VbHpabUo4THROeUxhZUUybThWejBx",
  },
  {
    id: "chapeu-goiano",
    name: "Chapéu Goiano",
    address: "Rua Lirio do Mar, 15, Cidade Nova",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1ba09db0697b:0xb164a2560ee5add2/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMBZWcCixJnEtkGy8v0Y_WBXDn9MNzjFyy907np%3Dw160-h106-k-no-pi-0-ya179.84-ro-0-fo100&ik=CAoSLEFGMVFpcE1CWldjQ2l4Sm5FdGtHeTh2MFlfV0JYRG45TU56akZ5eTkwN25w",
  },
  {
    id: "cidade-de-deus",
    name: "Cidade de Deus",
    address: "Avenida Nossa Sra. da Conceição, 830, Cidade de Deus",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c190617c3bc8d:0xb1668739ba45df58/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipN822YU5IjJHRpUms2DobDm-Ue0RfPNuXQJRPY2%3Dw160-h106-k-no-pi0-ya277.07-ro-0-fo100&ik=CAoSLEFGMVFpcE44MjJZVTVJakpIUnBVbXMyRG9iRG0tVWUwUmZQTnVYUUpSUFky",
  },
  {
    id: "compensa",
    name: "Compensa",
    address: "Avenida Padre Agostinho Caballero Martin, 115, Compensa",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c0fd7e7437eb1:0x59bb2bb31113f6e6/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMr1VoKgiyLZHDhVPKQLolOTlrzG9dWGWcNGRgW%3Dw160-h106-k-no-pi0-ya329.01-ro-0-fo100&ik=CAoSLEFGMVFpcE1yMVZvS2dpeUxaSERoVlBLUUxvbE9UbHJ6RzlkV0dXY05HUmdX",
  },
  {
    id: "dom-pedro",
    name: "Dom Pedro",
    address: "Avenida Dom Pedro I, 27, Dom Pedro",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1069192eb7c3:0xa52edfef3288f314/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMdDuNmKcf06IAfGHb3CpQYHg9mSScVcduWqcdY%3Dw160-h106-k-no-pi-0-ya104.42998-ro-0-fo100&ik=CAoSLEFGMVFpcE1kRHVObUtjZjA2SUFmR0hiM0NwUVlIZzltU1NjVmNkdVdxY2RZ",
  },
  {
    id: "japiim",
    name: "Japiim",
    address: "Rua Fernando de Cordoba, 597, Japiim",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Atendimento domingos", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1069192eb7c3:0xa52edfef3288f314/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMdDuNmKcf06IAfGHb3CpQYHg9mSScVcduWqcdY%3Dw160-h106-k-no-pi-0-ya104.42998-ro-0-fo100&ik=CAoSLEFGMVFpcE1kRHVObUtjZjA2SUFmR0hiM0NwUVlIZzltU1NjVmNkdVdxY2RZ",
  },
  {
    id: "silves",
    name: "Silves",
    address: "Avenida Silves, 187, Raiz",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c0559ee4f7147:0xb00906fb92162d6d/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMoQX0ttgI4mbyIrxsh_CJPTsDivA_D3bAOOLzb%3Dw160-h106-k-no-pi0-ya350.4674-ro-0-fo100&ik=CAoSLEFGMVFpcE1vUVgwdHRnSTRtYnlJcnhzaF9DSlBUc0RpdkFfRDNiQU9PTHpi",
  },
  {
    id: "sumauma",
    name: "Sumaúma",
    address: "Avenida Bispo Pedro Massa, 306",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1bd737097627:0xea7340c01488fd98/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipP09YY7qi-HaagrYORpILqBZAjVNIsKQgiRQU5y%3Dw160-h106-k-no-pi-0-ya99.00001-ro-0-fo100&ik=CAoSLEFGMVFpcFAwOVlZN3FpLUhhYWdyWU9ScElMcUJaQWpWTklzS1FnaVJRVTV5",
  },
  {
    id: "tiradentes",
    name: "Tiradentes (Climatizada)",
    address: "Rua das Rosas, 107, Aleixo",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b8d54294d0b:0xb2ae73fa32778795/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOzMNyK8IfPnTbLA4IQqwFyw3PYkJ-iCFjE0Gn0%3Dw160-h106-k-no-pi-0.112540185-ya50.38746-ro-0-fo100&ik=CAoSLEFGMVFpcE96TU55SzhJZlBuVGJMQTRJUXF3Rnl3M1BZa0otaUNGakUwR24w",
  },
  {
    id: "torquato-allegro",
    name: "Torquato Allegro",
    address: "Avenida Torquato Tapajós, 6950, Tarumã",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c177615f96955:0xff91f3c041c55915/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipNumkb-qxs7Mmc6NKJucleQdh9OKpXetR77e22c%3Dw160-h106-k-no-pi-0-ya215-ro0-fo100&ik=CAoSLEFGMVFpcE51bWtiLXF4czdNbWM2TktKdWNsZVFkaDlPS3BYZXRSNzdlMjJj",
  },
  {
    id: "torquato-bemol",
    name: "Torquato Bemol (Climatizada)",
    address: "Avenida Torquato Tapajós, 8160, Colônia Terra Nova",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c17ab8aff2e3d:0xcb7a9926641198aa/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOFasd2oRUkiPspB1ngWgZY68k29iCf3Q-YYnL7%3Dw160-h106-k-no-pi-20-ya230-ro-0-fo100&ik=CAoSLEFGMVFpcE9GYXNkMm9SVWtpUHNwQjFuZ1ngWgZY68k29iCf3Q-YYnL7",
  },
  {
    id: "torquato-santos-dumont",
    name: "Torquato Santos Dumont",
    address: "Avenida Torquato Tapajós, 5555, Da Paz",
    hours: "Seg-Sex: 5h-22h | Sáb: 8h-20h | Dom: 9h-12h / 16h-20h | Feriado: 8h-20h",
    features: ["Sem fidelidade", "Aulas coletivas", "Atendimento domingos", "App acesso"],
    type: "tradicional",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1a762f955ed3:0xb99d5ff85beebf7d/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMw53g3AZtxizUMbo-n-BjAByo-6TXgQlmhUexN%3Dw160-h106-k-no-pi-0.112540185-ya86.16746-ro-0-fo100&ik=CAoSLEFGMVFpcE13NTNnM0FadHhpelVNYm8tbi1CakFCeW8tNlRYZ1FsbWhVZXhO",
  },
  {
    id: "torres",
    name: "Torres",
    address: "Rua Mitiko, 397, Parque Dez de Novembro",
    hours: "Seg-Sex: 5h-22h | Sáb: 7h-15h | Dom: 9h-12h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Atendimento domingos", "App acesso"],
    type: "tradicional",
    tourUrl: null, // AINDA NÃO TEM TOUR
  },
  // Premium
  {
    id: "belem",
    name: "Belém",
    address: "Rua Prof. Márciano Armond, 1544",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c05ca8a9987e3:0xaaf5bdf3ce23f97d/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOJsAEAdsN_DhlTK8e7uHn690s4ZnfL2hxE8eRK%3Dw160-h106-k-no-pi-10-ya299.9-ro-0-fo100&ik=CAoSLEFGMVFpcE9Kc0FFQWRzTl9EaGxUSzhlN3VIbjY5MHM0Wm5mTDJoeEU4ZVJL",
  },
  {
    id: "franceses-mirage",
    name: "Franceses Mirage",
    address: "Avenida Des. João Machado, 63, Planalto | Centro Comercial Mirage",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: Fechado | Feriado: 7h-17h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c11dc1d4e74ef:0x797c4ea9ce1f0a44/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipN2gujfUjmtlZKbR_bjdrkHrRzV7vhqZrsThJNb%3Dw160-h106-k-no-pi-0-ya94.850006-ro0-fo100&ik=CAoSLEFGMVFpcE4yZ3VqZlVqbXRsWktiUl9iamRya0hyUnpWN3ZocVpyc1RoSk5i",
  },
  {
    id: "jacira-reis",
    name: "Jacira Reis",
    address: "Avenida Jacira Reis, 1000, Dom Pedro",
    hours: "Seg-Sex: 5h-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1134d71caf43:0xf1d633566ca86f31/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipPd1Yhp_P0D2FrBXtyTleIFjfN9xWNnacH9INOq%3Dw160-h106-k-no-pi-0-ya75.89999-ro-0-fo100&ik=CAoSLEFGMVFpcFBkMVlocF9QMEQyRnJCWHR5VGxlSUZqZk45eFdObmFjSDlJTk9x",
  },
  {
    id: "parque-10",
    name: "Parque 10",
    address: "Rua José Bonaparte, S/N, Parque 10 de Novembro",
    hours: "Seg-Sex: 5h-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b30bebf6a99:0x7d8859a1f3837e8b/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOETseuHOMge6CKXWWUb6R0ZcImeYRB88MQ-X5h%3Dw160-h106-k-no-pi-10-ya343.67-ro-0-fo100&ik=CAoSLEFGMVFpcE9FVHNldUhPTWdlNkNLWFdXVWI2UjBaY0ltZVlSQjg4TVEtWDVo",
  },
  {
    id: "petropolis",
    name: "Petrópolis",
    address: "Rua Coronel Ferreira de Araújo, 100, Petrópolis",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c056f311e8b49:0xa9830541baf845af/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipMSJrhgftj3PTAEPfy3Yg2h0HkzByFWxu8arPt6%3Dw160-h106-k-no-pi-0-ya144.17001-ro0-fo100&ik=CAoSLEFGMVFpcE1TSnJoZ2Z0ajNQVEFFUGZ5M1lnMmgwSGt6QnlGV3h1OGFyUHQ2",
  },
  {
    id: "rodrigues-grande-circular",
    name: "Rodrigues Grande Circular",
    address: "Avenida Autaz Mirim, 7451, Tancredo Neves",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b502c67d417:0x4c13f9bd4df49530/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipNNbE-id7Vo03t0Y4Z7wUF8sNWT-KFdfXxnqRpl%3Dw160-h106-k-no-pi-0-ya150.76001-ro0-fo100&ik=CAoSLEFGMVFpcE5OYkUtaWQ3Vm8wM3QwWTRaN3dVRjhzTldULUtGZGZYeG5xUnBs",
  },
  {
    id: "vitoria-coroado",
    name: "Vitória Coroado",
    address: "Avenida Cosme Ferreira, 1620, Coroado I | Vitória Supermercados",
    hours: "Seg-Sex: 5h30-22h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "premium",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b9358b4a66d:0xa59d30976a07a255/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipPmk1ANVpCwQZ3-FQwyL-fhHQMNg2FYnPIQbMIf%3Dw160-h106-k-no-pi-0-ya236.99998-ro0-fo100&ik=CAoSLEFGMVFpcFBtazFBTlZwQ3dRWjMtRlF3eW0tZmhIUU1OZzJGWW5QSVFiTUlm",
  },
  // Diamante
  {
    id: "adrianopolis",
    name: "Adrianópolis",
    address: "Rua Neves de Fontoura, 254, Adrianópolis",
    hours: "Seg-Sex: 5h30-22h | Sáb: 7h-15h | Dom: Fechado | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Espaço Relax", "Espaço Yoga", "Espaço Pose", "Studio de Bike", "Aulas coletivas", "Climatização", "App acesso"],
    type: "diamante",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1bd263076b27:0x1d4f9fd27ac7c6d1/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOnXftNWuuYF8kl9ghoTBGCl727yGbi9v7wzLG4%3Dw160-h106-k-no-pi-10-ya1.5700045-ro-0-fo100&ik=CAoSLEFGMVFpcE9uWGZ0Tld1dVlGOGtsOWdob1RCR0NsNzI3eUdiaTl2N3d6TEc0",
  },
  {
    id: "alphaville",
    name: "Alphaville",
    address: "Avenida Thales Loureiro, 457, Tarumã",
    hours: "Seg-Sex: 5h-22h | Sáb: 7h-15h | Dom: 9h-12h | Feriado: 7h-17h",
    features: ["Sem fidelidade", "Espaço Relax", "Espaço Yoga", "Espaço Pose", "Studio de Bike", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "diamante",
    tourUrl: "https://www.google.com/local/place/fid/0x926c11a1b7855999:0x72c0cd225322b408/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipOixWgC9fithVz_94rqm-EWRPG0-0GBeE7gOla9%3Dw160-h106-k-no-pi-0-ya140.34001-ro0-fo100&ik=CAoSLEFGMVFpcE9peFdnQzlmaXRoVnpfOThycW0tRVdSUEcwLTBHQmVFN2dPbGE5",
  },
  {
    id: "ct-cidade-nova",
    name: "CT Cidade Nova",
    hours: "Seg-Sex: 5h-24h | Sáb: 8h-20h | Dom: 16h-20h | Feriado: 8h-20h",
    address: "Avenida Max Teixeira, 4066, Cidade Nova",
    features: ["Sem fidelidade", "Espaço Relax", "Espaço Yoga", "Espaço Pose", "Studio de Bike", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "diamante",
    tourUrl: null, // AINDA NÃO TEM TOUR
  },
  {
    id: "efigenio-salles",
    name: "Efigênio Salles",
    address: "Avenida Efigênio Salles, 1005, Parque 10 de Novembro",
    hours: "Seg-Sex: 5h-22h | Sáb: 7h-15h | Dom: 13h30-16h30 | Feriado: 7h-12h",
    features: ["Sem fidelidade", "Espaço Relax", "Espaço Yoga", "Espaço Pose", "Studio de Bike", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "diamante",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1abefb2bdbd1:0xae6305a8cfa14f2e/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipNpFnKvHIxEIOJ8znFRPa98CnQYpan9ov__c37t%3Dw160-h106-k-no-pi-0-ya167.78-ro0-fo100&ik=CAoSLEFGMVFpcE5wRm5LdkhJeEVJT0o4em5GUlBhOThDblFZcGFuOW92X19jMzd0",
  },
  {
    id: "flores",
    name: "Flores",
    address: "Rua Visconde de Sepetiba, 220, Flores",
    hours: "Seg-Sex: 5h-24h | Sáb: 8h-17h | Dom: 8h-14h | Feriado: 7h-17h",
    features: ["Sem fidelidade", "Espaço Relax", "Espaço Yoga", "Espaço Pose", "Studio de Bike", "Aulas coletivas", "Climatização", "Atendimento domingos", "App acesso"],
    type: "diamante",
    tourUrl: "https://www.google.com/local/place/fid/0x926c1b9358b4a66d:0xa59d30976a07a255/photosphere?iu=https://lh5.googleusercontent.com/p/AF1QipPmk1ANVpCwQZ3-FQwyL-fhHQMNg2FYnPIQbMIf%3Dw160-h106-k-no-pi-0-ya236.99998-ro0-fo100&ik=CAoSLEFGMVFpcFBtazFBTlZwQ3dRWjMtRlF3eW0tZmhIUU1OZzJGWW5QSVFiTUlm",
  },
  {
    id: "bom-prato",
    name: "Bom Prato",
    address: "Rua Santa Cecília, Cidade Nova | Próximo ao Bom Prato",
    hours: "INAUGURAÇÃO EM JUNHO | Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
  {
    id: "veneza",
    name: "Veneza",
    address: "Avenida do Turismo, 116, Tarumã | Supermercado Veneza",
    hours: "INAUGURAÇÃO EM JULHO | Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
  {
    id: "pedro-teixeira",
    name: "Pedro Teixeira",
    address: "Avenida Pedro Teixeira, 1552, Dom Pedro",
    hours: "INAUGURAÇÃO EM AGOSTO | Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
  {
    id: "cachoeirinha-em-breve",
    name: "Cachoeirinha",
    address: "EM BREVE | Aguardando informações",
    hours: "Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
  {
    id: "campos-eliseos",
    name: "Campos Elíseos",
    address: "EM BREVE | Aguardando informações",
    hours: "Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
  {
    id: "morada-do-sol-assinpa",
    name: "Morada do Sol Assinpa",
    address: "EM BREVE | Aguardando informações",
    hours: "Aguardando informações",
    features: [],
    type: "inauguracao",
    tourUrl: null,
  },
]

export default function LocationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = locations.length - 1
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1)
  }

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = (carouselRef.current.scrollWidth / locations.length) * currentIndex
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <section className="py-20 bg-live-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-live-textPrimary mb-4">Encontre a Live mais perto de você</h2>
          <p className="text-live-textSecondary mb-4">Estamos presentes em diversos pontos de Manaus.</p>
          <Link href="/unidades" className="text-live-accent hover:text-live-yellowLight transition font-semibold">
            Ver todas as unidades
          </Link>
        </motion.div>

        <div className="relative">
          <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:hidden">
            {locations.map((location) => (
              <div key={location.id} className="min-w-full snap-center px-4">
                <LocationCard location={{ ...location, tourUrl: location.tourUrl ?? undefined }} />
              </div>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {locations.slice(currentIndex, currentIndex + 3).map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <LocationCard location={{ ...location, tourUrl: location.tourUrl ?? undefined }} featured={index === 1} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button onClick={prevSlide} className="p-2 rounded-full bg-live-border hover:bg-live-border/80 text-live-textPrimary" aria-label="Anterior">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {locations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-live-accent w-6" : "bg-live-border"}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="p-2 rounded-full bg-live-border hover:bg-live-border/80 text-live-textPrimary" aria-label="Próximo">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

interface Location {
  id: string | number;
  name: string;
  address: string;
  hours: string;
  features: string[];
  type: string;
  tourUrl?: string | null;
}

interface LocationCardProps {
  location: Location;
  featured?: boolean;
}

function LocationCard({ location, featured = false }: LocationCardProps) {
  const getTypeColor = () => {
    switch (location.type) {
      case "tradicional":
        return "bg-live-accent text-live-bg";
      case "premium":
        return "bg-live-accent text-live-bg";
      case "diamante":
        return "bg-live-gray text-live-bg";
      default:
        return "bg-live-border text-live-textPrimary";
    }
  }

  const cardContent = (
    <div className={`bg-live-border/10 p-6 rounded-lg border border-live-border/30 hover:border-live-accent/50 transition ${featured ? "shadow-lg" : ""} cursor-pointer`}>
      <h3 className="text-xl font-bold text-live-textPrimary mb-2">{location.name}</h3>
      <div className="flex items-center text-live-textSecondary mb-4">
        <MapPin className="h-4 w-4 mr-2" />
        <p>{location.address}</p>
      </div>
      <p className="text-live-textSecondary mb-4">{location.hours}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {location.features.map((feature: string, i: number) => (
          <span key={i} className="text-sm bg-live-border/20 px-3 py-1 rounded-full text-live-textSecondary">
            {feature}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getTypeColor()}`}>
          {location.type.toUpperCase()}
        </span>
        {location.tourUrl ? (
          <Link href={location.tourUrl} className="text-live-accent hover:text-live-yellowLight font-semibold" onClick={(e) => e.stopPropagation()}>
            Tour Virtual
          </Link>
        ) : (
          <span className="text-live-textTernary">Tour em breve</span>
        )}
      </div>
    </div>
  )

  // Se não é unidade em inauguração, envolve com Link para a página da unidade
  if (location.type !== "inauguracao") {
    return (
      <Link href={`/unidades/${location.id}`}>
        {cardContent}
      </Link>
    )
  }

  // Se é unidade em inauguração, apenas o card sem link
  return cardContent
}