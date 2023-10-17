import {useRouter} from 'next/router'
import ChartGenrePageUI from "./chartGenre.presenter";
import {  useEffect, useState } from 'react';
import axios from 'axios';

export default function ChartGenrePage() {
    const router = useRouter()

    const [genre, setGenre] = useState('')
    const [songData, setSongData] = useState([])
    const [nowData, setNowData] = useState([])
    const [pagenation, setPagenation] = useState(1)
    
    const  fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/song/${router.asPath.replace('/chart/','')}`,{
                headers: {
                    Authorization: `${token}`
                }
            })
            setSongData(response.data)
            setNowData(response.data.slice(0,9))
        }catch (error){
            console.log('Error', error)
        }
    }

    useEffect( () => {
        setGenre(router.asPath.replace('/chart/',''))
        fetchData();
    }, [])

    useEffect(() => {
        const tmp = songData.slice(pagenation*10 - 10, pagenation*10-1);
        setNowData(tmp);
    }, [pagenation]);

    const handlePageChange = (page:number) => {
        setPagenation(page)
    }

    return (
        <ChartGenrePageUI
            genre = {genre}
            handlePageChange = {handlePageChange}
            nowData = {nowData}
         />
    )
}