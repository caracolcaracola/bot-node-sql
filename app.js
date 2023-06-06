const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')




const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowmenu = addKeyword(['menu']).addAnswer(
    [
'Cheese',
'Carne simple: Doble cheddar por medallón + papas fritas.',
'Precio: $1850',
'Carne doble: Doble cheddar por medallón + papas fritas.',
'(Sin precio adicional)',
'',
'Fried Onion',
'Carne simple: Doble cheddar por medallón y cebolla smasheada + papas fritas.',
'Precio: $1900',
'Carne doble: Doble cheddar por medallón y cebolla smasheada + papas fritas.',
'(Sin precio adicional)',
'',
'Royal',
'Carne simple: Doble cheddar por medallón, ketchup, mostaza y cebolla picada + papas fritas.',
'Precio: $1900',
'Carne doble: Doble cheddar por medallón, ketchup, mostaza y cebolla picada + papas fritas.',
'(Sin precio adicional)',
'',
'DTB',
'Carne simple: Queso danbo, tomate grillado, cebolla caramelizada y salsa DTB + papas fritas.',
'Precio: $1950',
'Carne doble: Queso danbo, tomate grillado, cebolla caramelizada y salsa DTB + papas fritas.',
'(Sin precio adicional)',
'',
'American',
'Carne simple: Doble cheddar por medallón, lechuga, tomate, cebolla morada y salsa DTB + papas fritas.',
'Precio: $2050',
'Carne doble: Doble cheddar por medallón, lechuga, tomate, cebolla morada y salsa DTB + papas fritas.',
'(Sin precio adicional)',
'',
'Big DTB',
'Carne simple: Doble cheddar por medallón, cebolla picada, pepino y salsa Big DTB + papas fritas.',
'Precio: $2150',
'Carne doble: Doble cheddar por medallón, cebolla picada, pepino y salsa Big DTB + papas fritas.',
'(Sin precio adicional)',
'',
'Roquechamp',
'Carne simple: Queso azul, champiñones salteados, cebolla caramelizada y salsa DTB + papas fritas.',
'Precio: $2250',
'Carne doble: Queso azul, champiñones salteados, cebolla caramelizada y salsa DTB + papas fritas.',
'(Sin precio adicional)',
'',
'Bacon',
'Carne simple: Doble cheddar por medallón, panceta ahumada y cebolla caramelizada + papas fritas.',
'Precio: $2150',
'Carne doble: Doble cheddar por medallón, panceta ahumada y cebolla caramelizada + papas fritas.',
'(Sin precio adicional)',
'',
'Crispy',
'Carne simple: Doble cheddar por medallón, cebolla morada, cebolla crispy, panceta ahumada y salsa DTB + papas fritas.',
'Precio: $2200',
'Carne doble: Doble cheddar por medallón, cebolla morada, cebolla crispy, panceta ahumada y salsa DTB + papas fritas.',
'(Sin precio adicional)',
'',
'Smoke Jack',
'Carne simple: Doble cheddar por medallón, panceta ahumada, aros de cebolla y smoked Jack Daniel´s BBQ + papas fritas.',
'Precio: $2250',
'Carne doble: Doble cheddar por medallón, panceta ahumada, aros de cebolla y smoked Jack Daniel´s BBQ + papas fritas.',
'(Sin precio adicional)'
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('🙌 Hola gracias por pedir en *DTB*')
    .addAnswer(
        [
            '👉Si decea realizar un pedido por whatsapp ingrese *menu*',
            '',
            '👉tambien tiene nuestra aplicacion para hacer su pedidos https://linktr.ee/dtburgers',
            '',
            '👉De otra forma si tiene alguna duda o queja *no dude en contactornos por llamada*'
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowmenu]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
