import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

import { ButtonSendSticker } from '../src/components/ButtonSendStriker'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


function escutaMesnagemEmTempoReal(addMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            console.log({ respostaLive });
            console.log("Nova Mensagem")
            addMensagem(respostaLive.new)
        })
        .subscribe()

}





export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username
    // console.log(usuarioLogado)
    // console.log(roteamento.query)

    const [mensagem, setMensagem] = useState('')
    const [listMensagem, setlistaMensagem] = useState([
        // {
        //     id: 1,
        //     de: "andrersp",
        //     texto: ":sticker:https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_3.png"

        // },
        // {
        //     id: 2,
        //     de: "andrersp",
        //     texto: "Uma mensagem de texto"

        // }
    ])

    useEffect(() => {
        const dadosSupaBase = supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log(data);
                setlistaMensagem(data)
            });
        escutaMesnagemEmTempoReal((nomeMensagem) => {
            console.log(nomeMensagem)
            setlistaMensagem((valorAtualDaLista) => {
                return [

                    nomeMensagem,
                    ...valorAtualDaLista
                ]

            });
            // handleNovaMensagem(nomeMensagem)
        });

    }, [])



    const handleNovaMensagem = (novaMensagem) => {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,


        }
        console.log(mensagem)
        supabaseClient.from('mensagens').insert([mensagem])
            .then(({ data }) => {
                console.log(data)
                // console.log(oquevem)
                // setlistaMensagem([

                //     data[0],
                //     ...listMensagem
                // ]);
            });
        setMensagem('');
        // console.log(novaMensagem);
        // setlistaMensagem([

        //     mensagem,
        //     ...listMensagem
        // ]);
    }
    // Sua lógica vai aqui
    //Usuario
    /*
    - usuario Digita no Campo texto
    - Aperta Enter para enviar
    - Adicionar texto na listagem

    //Dev 
    - [x]Campo Criado
    - [x]onchange + UseState
    - Lista de Mensagem
      
     */

    // ./Sua lógica vai aqui
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: appConfig.theme.colors.primary[500],
                    // backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                    color: appConfig.theme.colors.neutrals['000'],
                    opacity: '0.95'
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >
                        {/* {mensagem} */}
                        <MessageList mensagens={listMensagem} />
                        {/* {listMensagem.map((msg) => {
                        return (
                            <li key={msg.id}>
                                {msg.de}: {msg.mensage}
                            </li>
                        )
                    })} */}

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={(event) => {

                                    const value = event.target.value;
                                    setMensagem(value)
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {

                                        event.preventDefault()
                                        handleNovaMensagem(mensagem)
                                        // setMensagem('')


                                    }

                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],

                                }}
                            />
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    // console.log("salva o componente no DB", sticker)
                                    handleNovaMensagem(`:sticker:${sticker}`)
                                }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        key={mensagem.id}
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:') ? (
                            <Image src={mensagem.texto.replace(":sticker:", '')} width='120' />
                        ) :
                            (mensagem.texto)
                        }
                        {/* {console.log(mensagem.message)} */}
                        {/* {mensagem.texto} */}
                    </Text>
                )

            })}


        </Box>
    )
}