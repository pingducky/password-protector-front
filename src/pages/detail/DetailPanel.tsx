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
import {
    createElement,
    emptyElement,
    getElementByID,
    getPassword,
    getTypes,
    savePassword,
    updateElement,
    updatePassword
} from "../../api/DetailPanel.ts";
import EditLine from "../../components/shared/detail/EditLine.tsx";
import BasicLine from "../../components/shared/detail/BasicLine.tsx";

function Detail() {
    const {id} = useParams();
    const [types, setTypes] = useState<string[]>(["Aucun"]);
    const [basicType, setBasicType] = useState<BasicType[]>([]);
    const [element, setElement] = useState(emptyElement);
    const [editable, setEditable] = useState(true);

    const [elementID, setElementID] = useState("")

    const [editPasswordIndex, setEditPasswordIndex] = useState<number | null>(null);
    const [passwordString, setPassword] = useState("");

    const [nameState, setName] = useState("");
    const [urlState, setUrl] = useState("");
    const [descriptionState, setDescription] = useState("");
    const [typeState, setType] = useState("Aucun");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            Subscript,
            Color,
            TextStyle
        ],
        content: element.passwords.length > 0 && editPasswordIndex !== null ? element.passwords[editPasswordIndex].comment : "",
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
                    setElementID(response.data.id)

                    setName(response.data.name);
                    setUrl(response.data.url);
                    setDescription(response.data.description);
                    setType(response.data.type ? response.data.type.name : "Aucun");
                }
            });
        } else {
            createElement().then((response) => {
                if (response.ok) {
                    setElementID(response.data.message)
                }
            })
        }
    }, [id]);


    useEffect(() => {
        getTypes().then((response) => {
            if (response.ok && response.data.length > 0) {
                console.log(response.data)

                setBasicType(response.data)
                setTypes(response.data.map((type) => type.name));
            }
        });
    }, []);


    function setBasicTypes(value: string) {
        const type = basicType.find((type) => type.name === value);

        if (type) {
            element.type = type;
        }
    }

    function addPassword() {
        const password: BasicPassword = {
            id: "",
            identifier: "",
            comment: ""
        }

        element.passwords.push(password);
        setEditPasswordIndex(element.passwords.length - 1);
    }

    function editLine(index: number) {
        console.log("click")
        setEditPasswordIndex(index);

        getPassword(element.passwords[index].id).then((response) => {
            setPassword(response.data.password);
        })
    }

    function saveData() {
        if (editable) {
            const elementRequest: ElementUpdateRequest = {
                name: element.name,
                url: element.url,
                description: element.description,
                typeID: element.type ? element.type.id : "",
            }

            updateElement(elementRequest, elementID).then(() => {
                setEditable(!editable);
            });
        } else {
            setEditable(!editable);
        }
    }

    function finishPassword(password: BasicPassword) {
        if (password.id !== "") {
            const passwordRequest: PasswordUpdateRequest = {
                identifier: password.identifier,
                password: passwordString,
                comment: password.comment
            }

            updatePassword(passwordRequest, password.id).then(() => {
                setEditPasswordIndex(null)
            })
        } else {
            const passwordRequest: PasswordCreateRequest = {
                elementID: elementID,
                identifier: password.identifier,
                password: passwordString,
                comment: password.comment
            }

            savePassword(passwordRequest).then(() => {
                setEditPasswordIndex(null)
            })
        }
    }


    return (
        <Flex w={"100%"} mih={"100vh"} direction={"column"} gap={"32px"}>
            <BackHeader title={"Detail"} backURL={"/dashboard"}/>

            <Flex w={"100%"} p={"0 70px 70px 70px"} direction={"column"} gap={"56px"}>
                <Flex w={"100%"} justify={"flex-end"}>
                    <Button color={editable ? "green" : "violet"} onClick={() => saveData()}>
                        {editable ? "Enregistrer" : "Editer"}
                    </Button>
                </Flex>
                <Flex w={"100%"} gap={"40px"}>
                    <Flex direction={"column"} w={"40%"} className={styles.card}>
                        <Text size={"20px"}> Information Générales</Text>

                        <Flex direction={"column"} gap={"16px"}>
                            <Flex className={styles.textInputBox} gap={"8px"}>
                                <div className={styles.textInputSize}>
                                    <TextField label={"Nom"} placeholder={"Entrez le nom"} value={nameState}
                                               isRequired={true}
                                               disabled={!editable}
                                               onChange={value => element.name = value}>
                                    </TextField>
                                </div>

                                <div className={styles.textInputSize}>
                                    <SelectInput label={"Type"} value={typeState}
                                                 options={types}
                                                 disabled={!editable}
                                                 onChange={setBasicTypes}/>
                                </div>
                            </Flex>


                            <TextField label={"URL"} placeholder={"Entrez l'URL du site"} value={urlState}
                                       isRequired={true}
                                       disabled={!editable}
                                       onChange={value => element.url = value}>
                            </TextField>
                        </Flex>
                    </Flex>

                    <Flex w={"60%"} className={styles.card}>
                        <Text size={"20px"}>Description</Text>

                        <TextAreaInput label={"Description"} value={descriptionState} disabled={!editable}
                                       onChange={value => element.description = value}/>
                    </Flex>
                </Flex>

                <Flex w={"100%"} gap={"40px"}>
                    <Flex w={"55%"} className={styles.card}>
                        <Flex direction={"column"} gap={"20px"}>
                            <Text size={"20px"}>Comptes</Text>

                            {
                                element.passwords.length > 0 ? (
                                    element.passwords.map((password, index) => (
                                        editable ? (
                                            index === editPasswordIndex ? (
                                                <EditLine identifier={password.identifier}
                                                          password={passwordString}
                                                          setPassword={value => setPassword(value)}
                                                          savePassword={() => finishPassword(password)}
                                                          setIdentifier={value => password.identifier = value}/>
                                            ) : (
                                                <BasicLine identifier={password.identifier} editable={editPasswordIndex === null}
                                                           setEditable={() => editLine(index)}/>
                                            )
                                        ) : (
                                            <BasicLine identifier={password.identifier} editable={editPasswordIndex === null}
                                                       setEditable={() => editLine(index)}/>
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
                                    <ActionIcon size={"lg"} color={"violet"} onClick={() => addPassword()}
                                                disabled={editPasswordIndex !== null}>
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