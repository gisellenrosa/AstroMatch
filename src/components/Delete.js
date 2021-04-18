import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
border:1px solid #762d88;
padding:10px;
font-size:18px;
color:#762d88;
font-family:'Roboto', sans-serif;
font-weight:500;
border-radius:10px;
cursor: pointer;
transition:300ms;
:hover{
 background-color:#762d88;
 color:white;
  
}

`;

export default function Delete(props) {
    const [clear, setClear] = useState([]);
   
    const deleteMatches = () => {
        axios
            .put(
            "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/clear"
            )
            .then((res) => {
            setClear([]);
            props.onDeleted()
            })
            .catch((err) => {
            console.log(err);
            });
        };
    return (
        <div>
            <Button onClick={() => { deleteMatches(); }} >
                Reininciar AstroMatch
            </Button>
        </div>
        );
}
