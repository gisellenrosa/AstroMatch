import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Delete from "../../components/Delete"
import MyMatch from "../../images/man.svg"
import Astromach from "../../images/Astromach.png";

const DivContent = styled.div`
display:flex; 
background-color:#8aaa;
`;
const Container = styled.div`
width: 100vw;
height: 100vh;
margin:0;
display:flex;
justify-content: center;
align-items:center;
`;
const Box = styled.div`
margin-left:100px;
margin-top:-20px;
background-color:white;
border-radius:10px;
width: 450px;
height:650px;
padding: 10px;
border:1px solid black;
`;

const Header = styled.div`
display:flex; 
justify-content:center;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 80px;
  width: 80px;
`;
const Logo = styled.img`
width: 40%;
margin-left: 140px;

`;
const ImgMatches = styled.img`
margin-left: 80px;
cursor: pointer;
`;

const DeleteButton = styled.div`
margin-top:50px;
margin-right:80px;
`;
const NameMatch = styled.div`
display:flex;
align-items:center;
margin-left: 20px;
`;
const TheMatch = styled.div`
display:flex;
justify-content:flex-start;
width:500px;`;

const ListMatches = styled.div`
margin-top:50px;
margin-left:40px;
`;
export default function MatchList(props) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches();
  }, [matches]);

  const getMatches = () => {
    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/matches"
      )
      .then((res) => {
        setMatches(res.data.matches);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <DivContent>
        <Container>
      <Box>
        <Header>
          <Logo src={Astromach} alt={"Logo Astromach"} />
          <ImgMatches src={MyMatch} alt={"Voltar a tela anterior"} onClick={() => {
              props.change("Match");
            }}/>
        </Header>
        <ListMatches>
          {matches.map((match) => {
            return (
              <TheMatch>
                <Img src={match.photo} alt={"foto perfil"} />
                <NameMatch>{match.name}</NameMatch>
              </TheMatch>
            );
          })}
        </ListMatches>
       
        
      </Box>
      
    </Container>
    <DeleteButton>
          <Delete/>
    </DeleteButton>

    </DivContent>
    
  );
}
