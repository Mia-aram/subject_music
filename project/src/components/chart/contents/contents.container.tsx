import ContentsPageUI from "./contents.presenter";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { nickState } from "@/src/store/states";

export default function ContentsPage() {

    const [inputData, setInputData] = useState([]);
    const [comment, setComment] = useState('');

    const [localNick, setLocalNick] = useRecoilState(nickState);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/contents/${parseInt(localStorage.getItem("index") || "")}`)
            setInputData(response.data)
        } catch (error) {
            console.log('Error', error)
        }
    }

    const fetchBoardData = async () => {
        try{
            const response =await axios.post(`http://localhost:8080/contents/${parseInt(localStorage.getItem("index") || "")}/board`)
            console.log(response)
        }catch(error){
            console.log('Error',error)
        }
    }

    useEffect(() => {
        fetchData();
        fetchBoardData();
    }, [])

    const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
        console.log(comment)
    }

    const onClickSubmit = async () => {
        if (!comment) {
            alert('댓글을 작성해주세요.')
            return;
        }

        /* 댓글을 보내는 api */
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8080/contents/${parseInt(localStorage.getItem("index") || "")}/boardUpdate`, {
                nickname: localNick,
                comment: comment,

            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            alert(response.data.message)
            console.log(response)
        } catch (error) {
            console.log('Error', error)
        }

    }

    return (
        <ContentsPageUI
            inputData={inputData.length > 0 ? inputData : []}
            onChangeComment={onChangeComment}
            onClickSubmit={onClickSubmit}
        />
    )
}