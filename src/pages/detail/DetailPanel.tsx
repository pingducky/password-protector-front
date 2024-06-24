import {useEffect, useState} from "react";
import {getQuery} from "../../utils/apiUtils.ts";
import {useParams} from "react-router-dom";
import {Flex, Text} from "@mantine/core";
import BackHeader from "../../components/shared/header/BackHeader.tsx";
import TextField from "../../components/shared/TextInput.tsx";
import styles from './DetailPanel.module.scss';

function Detail() {
    const {id} = useParams();
    const [nameValue, setNameValue] = useState("");
    const [urlValue, setUrlValue] = useState("");

    useEffect(() => {
        if (id) {
            getQuery("element/id/" + id).then((response) => {
                console.log(response);
            });
        }
    }, [id]);

    return (
        <Flex w={"100%"} h={"100vh"} direction={"column"} gap={"32px"}>
            <BackHeader title={"Detail"} backURL={"/dashboard"}/>

            <Flex w={"100%"} p={"0 70px"}>
                <Flex gap={"16px"}>
                    <Flex direction={"column"} bg={"white"} p={"16px"} className={styles.flexCard}>
                        <Text> Information Générales</Text>

                        <Flex gap={"8px"}>
                            <TextField label={"Nom"} placeholder={"Entrez le nom"} value={nameValue}
                                       isRequired={true}
                                       onChange={event => setNameValue(event.currentTarget.value)}>
                            </TextField>

                            {/*TODO : Mettre un select */}
                        </Flex>

                        <TextField label={"URL"} placeholder={"Entrez l'URL du site"} value={urlValue}
                                   isRequired={true}
                                   onChange={event => setUrlValue(event.currentTarget.value)}>
                        </TextField>
                    </Flex>

                    <Flex gap={"16px"}>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Detail;