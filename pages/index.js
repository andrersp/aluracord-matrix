// Component React

import { Box, Button, Text, TextField, Image } from '@skynexui/components'


import { useState } from 'react'
import { useRouter } from 'next/router'

import appConfig from '../config.json';


// const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY





function Title(props) {
    // console.log(props)
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
        ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 24px;
            font-weight: 600;
        }
`}</style></>


    );
}


// function HomePage() {

//     // JSX
//     return (
//         <div>
//             {/* <GlobalStyle /> */}
//             <Title tag='h2'>Boas vindas de volta!</Title>
//             <h2>Disrcod - Alura Matrix</h2>


//         </div>
//     )
// }

// export default HomePage


export default function PaginaInicial() {
    // const username = 'andrersp';
    const [username, setUsername] = useState('')
    const roteamento = useRouter();

    const onChangeHandler = event => {
        setUsername(event.target.value)
    }


    return (
        <>


            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        opacity: '0.9',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 5px 10px 5px rgb(255 255 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formul??rio */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            console.log("Algu??m submeteu o form")
                            // window.location.href = "/chat";
                            roteamento.push(`/chat?username=${username}`)
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            placeholder='GitHub Username'
                            onChange={onChangeHandler}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formul??rio */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image

                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}


