import {Flex, Text} from "@mantine/core";
import {IoMdArrowBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";

function BackHeader(props: BackHeaderProps) {
    const navigate = useNavigate();

    function onBackClick() {
        console.log("Here ?")
        navigate(props.backURL);
    }

    return (
        <Flex p={"0 70px"} justify={"space-between"} align={"center"} w={"100%"} h={"70px"} bg={"#8E94F5"}>
            <IoMdArrowBack size={"32px"} cursor={"pointer"} onClick={onBackClick}/>

            <Text size={"32px"}>{props.title}</Text>

            <div style={{width: "32px"}}/>
        </Flex>
    )
}

export default BackHeader;