import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ActionIcon, Button, Flex, Text} from "@mantine/core";
import BackHeader from "../../components/shared/header/BackHeader.tsx";
import TextField from "../../components/shared/input/TextInput.tsx";
import styles from './DetailPanel.module.scss';
import TextAreaInput from "../../components/shared/input/TextAreaInput.tsx";
import SelectInput from "../../components/shared/input/SelectInput.tsx";
import AddIcon from "../../components/shared/svg/AddIcon.tsx";
import {useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {RichTextEditor} from "@mantine/tiptap";
import Highlight from '@tiptap/extension-highlight';
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {Underline} from "@tiptap/extension-underline";
import {Subscript} from "@tiptap/extension-subscript";
import {emptyElement, getElementByID, getPassword, getTypes} from "../../api/DetailPanel.ts";
import EditLine from "../../components/shared/detail/EditLine.tsx";
import BasicLine from "../../components/shared/detail/BasicLine.tsx";

function Detail() {
    const {id} = useParams();
    const [types, setTypes] = useState<BasicType[]>([]);
    const [element, setElement] = useState(emptyElement);
    const [editable, setEditable] = useState(true);

    const [editPasswordIndex, setEditPasswordIndex] = useState<number | null>(null);
    const [passwordString, setPassword] = useState("");


    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            Subscript,
            Color,
            TextStyle
        ],
        content: element.passwords.length > 0 ? element.passwords[editPasswordIndex].comment : "",
        onUpdate: ({editor}) => {
            element.passwords[editPasswordIndex].comment = editor.getHTML();
        }
    });


    useEffect(() => {
        if (id) {
            setEditable(false)

            getElementByID(id).then((response) => {
                if (response.ok && response.data.id !== "") {
                    setElement(response.data);

                    const index = response.data.passwords.length > 0 ? response.data.passwords.length - 1 : 0;
                    setEditPasswordIndex(index);

                    getPassword(response.data.passwords[index].id).then((response) => {
                        setPassword(response.data.password);
                    });
                }
            });
        }
    }, [id]);


    useEffect(() => {
        getTypes().then((response) => {
            if (response.ok && response.data.length > 0) {
                setTypes(response.data);
            }
        });
    }, []);

    function setType(value: string) {
        const type = types.find((type) => type.name === value);

        if (type) {
            element.type = type;
        }
    }


    return (
        <Flex w={"100%"} mih={"100vh"} direction={"column"} gap={"32px"}>
            <BackHeader title={"Detail"} backURL={"/dashboard"}/>

            <Flex w={"100%"} p={"0 70px 70px 70px"} direction={"column"} gap={"56px"}>
                <Flex w={"100%"} justify={"flex-end"}>
                    <Button color={editable ? "green" : "violet"} onClick={() => setEditable(!editable)}>
                        {editable ? "Enregistrer" : "Editer"}
                    </Button>
                </Flex>
                <Flex w={"100%"} gap={"40px"}>
                    <Flex direction={"column"} w={"40%"} className={styles.card}>
                        <Text size={"20px"}> Information Générales</Text>

                        <Flex direction={"column"} gap={"16px"}>
                            <Flex className={styles.textInputBox} gap={"8px"}>
                                <div className={styles.textInputSize}>
                                    <TextField label={"Nom"} placeholder={"Entrez le nom"} value={element.name}
                                               isRequired={true}
                                               disabled={!editable}
                                               onChange={value => element.name = value}>
                                    </TextField>
                                </div>

                                <div className={styles.textInputSize}>
                                    <SelectInput label={"Type"} value={types.length > 0 ? types[0].name : "Aucun"}
                                                 options={types.length > 0 ? types.map((type) => type.name) : ["Aucun"]}
                                                 disabled={!editable}
                                                 onChange={setType}/>
                                </div>
                            </Flex>


                            <TextField label={"URL"} placeholder={"Entrez l'URL du site"} value={element.url}
                                       isRequired={true}
                                       disabled={!editable}
                                       onChange={value => element.url = value}>
                            </TextField>
                        </Flex>
                    </Flex>

                    <Flex w={"60%"} className={styles.card}>
                        <Text size={"20px"}>Description</Text>

                        <TextAreaInput label={"Description"} disabled={!editable}
                                       onChange={value => element.description = value}/>
                    </Flex>
                </Flex>

                <Flex w={"100%"} gap={"40px"}>
                    <Flex w={"55%"} className={styles.card}>
                        <Flex direction={"column"}>
                            <Text size={"20px"}>Comptes</Text>

                            {
                                element.passwords.length > 0 ? (
                                    element.passwords.map((password, index) => (
                                        editable ? (
                                            index === editPasswordIndex ? (
                                                <EditLine identifier={password.identifier} password={passwordString}
                                                          setPassword={setPassword}/>
                                            ) : (
                                                <BasicLine identifier={password.identifier} editable={false}/>
                                            )
                                        ) : (
                                            <BasicLine identifier={password.identifier} editable={true}/>
                                        )
                                    ))
                                ) : (
                                    <Flex w={"100%"} justify={"center"}>
                                        <Text>Aucun mot de passe enregistré</Text>
                                    </Flex>
                                )
                            }
                        </Flex>

                        {
                            editable ? (
                                <Flex w={"100%"} justify={"center"}>
                                    <ActionIcon size={"lg"} color={"violet"}>
                                        <AddIcon/>
                                    </ActionIcon>
                                </Flex>
                            ) : null
                        }
                    </Flex>

                    {
                        editable && editPasswordIndex !== null ? (
                            <Flex w={"100%"} className={styles.card}>
                                <Text size={"20px"}>Commentaires associés</Text>

                                <Flex direction={"column"} w={"100%"} h={"100%"}>
                                    <Text>Commentaires</Text>

                                    <RichTextEditor h={"180px"} editor={editor}>
                                        <RichTextEditor.Toolbar>
                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.Bold/>
                                                <RichTextEditor.Italic/>
                                                <RichTextEditor.Underline/>
                                                <RichTextEditor.Strikethrough/>
                                                <RichTextEditor.Highlight/>
                                                <RichTextEditor.ClearFormatting/>
                                            </RichTextEditor.ControlsGroup>

                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.ColorPicker
                                                    colors={[
                                                        '#25262b',
                                                        '#868e96',
                                                        '#fa5252',
                                                        '#e64980',
                                                        '#be4bdb',
                                                        '#7950f2',
                                                        '#4c6ef5',
                                                        '#228be6',
                                                        '#15aabf',
                                                        '#12b886',
                                                        '#40c057',
                                                        '#82c91e',
                                                        '#fab005',
                                                        '#fd7e14',
                                                    ]}
                                                />
                                                <RichTextEditor.UnsetColor/>
                                            </RichTextEditor.ControlsGroup>

                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.Undo/>
                                                <RichTextEditor.Redo/>
                                            </RichTextEditor.ControlsGroup>
                                        </RichTextEditor.Toolbar>

                                        <RichTextEditor.Content/>
                                    </RichTextEditor>
                                </Flex>
                            </Flex>
                        ) : null
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Detail;