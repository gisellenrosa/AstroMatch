import { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../components/Delete"
import styled from "styled-components";
import Astromach from "../../images/Astromach.png";
import MyMatch from "../../images/man.svg"


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

const Logo = styled.img`
margin-left: 140px;
width: 40%;
`;
const Img = styled.img`
border-radius:10px;
height:480px;
width: 450px;
`;
const ImgMatches = styled.img`
margin-left: 80px;
cursor: pointer;
`;
const ProfileText = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:flex-start;
margin-top: -120px;
color:white;
padding:20px;
width:410px;
height:75px;
border-radius: 0 0 10px 10px;
background-color:rgba(0,0,0,0.6);
position:absolute;
`;
const Span = styled.span`
 font-weight:500;
 `;
const Bio = styled.p`
 margin-top: -10px;
 `;
const ChooseButtons = styled.div`
display:flex;
justify-content:center;
margin-top:20px;

`;
const Love = styled.div`
background-color:#d6d6d6;
width:50px;
height:50px;
padding:8px;
font-size:28px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
margin-left:60px;
color:green;
border:1px solid green;
cursor: pointer;
transition:300ms;
:hover{
  color:white;
  background-color:green;
}
 `;

const Skip = styled.div`
background-color:#d6d6d6;
margin-right:60px;
width:50px;
height:50px;
padding:8px;
font-size:28px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
color:red;
border:1px solid red;
cursor: pointer;
transition:300ms;
:hover{
  color:white;
  background-color:red;
}
 `;

 const DeleteButton = styled.div`
  margin-top:50px;
  margin-right:80px;
 `;

 const NotFoundBox = styled.div`
  background-color:#d6d6d6;
  border:1px solid #a00;
  border-radius:10px;
  color:#a00;
  margin-top: 250px;
 `;

export default function Match(props) {
  const [profile, setprofile] = useState(null);
  const [choose, setChoose] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/person`
      )
      .then((res) => {
        setprofile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const choosePerson = () => {
    const body = { id: profile.id, choice: true };
    axios
      .post(
        "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/:aluno/choose-person",
        body
      )
      .then((res) => {
        setChoose(res.data);
        getProfile();
      })
      .catch((err) => {
        console.log(err);
        alert("Ocorreu um problema");
      });
  };

  return (
    <DivContent>
      <Container>
        <Box>
          <Header>
            <Logo src={Astromach} alt={"Logo Astromach"} />
            <ImgMatches src={MyMatch} alt={"Trocar para Pagina seguinte"} onClick={() => {
                props.change("MatchList");
              }}/>
          </Header>
          
          
              {profile ? (
                <div>
                  <Img
                    src={profile.photo}
                    alt={"Foto do perfil"}
                    
                  />
                  <ProfileText>
                    <h3>{profile.name}, <Span>{profile.age}</Span> </h3>
                    <Bio><Span>{profile.bio}</Span></Bio>
                  </ProfileText>
                  <ChooseButtons>
                    <Skip onClick={() => {
                      getProfile();
                    }}>
                        X
                    </Skip>
                    <Love onClick={() => {
                      choosePerson();
                    }}>
                        ❤
                    </Love>
                  </ChooseButtons>
                
                
                </div>
              ): <NotFoundBox> <p>Carregando, tente reininciar o Astromach</p>
              </NotFoundBox>}
              
          </Box>
                
      </Container>
      <DeleteButton>
        <Delete onDeleted={()=>{getProfile()}}/>
      </DeleteButton>
      
    </DivContent>
  );
}
