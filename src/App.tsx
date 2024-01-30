// App.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface UserProfile {
  login: string;
  name: string;
  public_repos: number;
  created_at: string;
  joinDate: string;
  pseudoName: string;
  socials: string[];
  followers: number;
  following: number;
  avatar_url: string;
  location: string; // Added location
  url: string; // Added URL
  buildingPlace: string; // Added buildingPlace
  bio: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 70px;
  border-radius: 15px;
  margin-bottom: 10px;
  width: 634px;
  padding-left: 48px;
  padding-right: 48px;
  color: #4B6A9B;
  font-family: "Space Mono";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  border-radius: 15px;
  background: #FEFEFE;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.20);
`;

const Button = styled.button`
  width: 106px;
  height: 50px;
  margin-left: -118px;
  color: #FFF;
  font-family: "Space Mono";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 10px;
  border: none;
  background-color: #2D9CDB;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  width: 634px;
  height: 420px;
  padding: 48px;
  margin-top: 20px;
  border-radius: 15px;
  background: #FEFEFE;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.20);
`;

// const ProfileLink = styled.h2`
//   cursor: pointer;
//   text-decoration: none;
//   color: #0079FF;
//   font-family: "Space Mono";
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
//   margin: 0;
//   margin-top: -30px;
// `;

const ContainerForFollow = styled.div`
  width: 355px;
  height: 85px;
  padding-left: 32px;
  padding-right: 83px;
  background-color: #F6F8FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & p {
    display: grid;
    flex-direction: column;
    color: #4B6A9B;
    font-family: "Space Mono";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    & span {
      color: #2B3442;
      font-family: "Space Mono";
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
`;

const Name = styled.p`
  margin: 0;
  color: #2B3442;
  font-family: "Space Mono";
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  color: #4B6A9B;
  font-family: "Space Mono";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  a {
    color: #0079FF;
    text-decoration: none;
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const LeftForFollow = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-end;
  flex-direction: column;
`;



const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<{ profile: UserProfile | null }>({
    profile: null,
  });

  const handleSearch = async () => {
    try {
      if (!username) {
        alert('Please enter a GitHub username');
        return;
      }

      const profileResponse = await fetch(`https://api.github.com/users/${username}`);

      if (!profileResponse.ok) {
        alert('GitHub user not found');
        return;
      }

      const profileData: UserProfile = await profileResponse.json();

      setProfileData({ profile: enrichProfileData(profileData) });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  const enrichProfileData = (profileData: UserProfile): UserProfile => {
    return {
      ...profileData,
      joinDate: new Date(profileData.created_at).toLocaleDateString(),
      pseudoName: profileData.login,
      // Add the following line to include bio field
      bio: profileData.bio || 'No bio available',
      location: profileData.location || 'No location available',
      url: profileData.url || 'No URL available',
      buildingPlace: profileData.buildingPlace || 'No building place available'
    };
  };


  return (
    <Container>
      <h1>GitHub Profile Searcher</h1>
      <div className="input">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {profileData.profile && (
        <ProfileInfo>
          <Head>
            {profileData.profile.avatar_url && (
              <img
                src={profileData.profile.avatar_url}
                alt="Profile"
                style={{ borderRadius: '50%', width: '117px', height: '117px', marginBottom: '10px' }}
              />
            )}
            <Names>
              <Name>{profileData.profile.name}</Name>
              <p>
                <a href={`https://github.com/${profileData.profile.login}`} target="_blank" rel="noopener noreferrer">
                  @{profileData.profile.pseudoName}
                </a>
              </p>
            </Names>
            <p>Join Date: {profileData.profile.joinDate}</p>
          </Head>
          <LeftForFollow>
            <ContainerForFollow>
              <p>Repos <span>{profileData.profile.public_repos}</span></p>
              <p>Followers <span>{profileData.profile.followers}</span></p>
              <p>Following <span>{profileData.profile.following}</span></p>
            </ContainerForFollow>
            <SocialLinks>
              {profileData.profile.socials?.map((social, index) => (
                <a href={social} key={index} target="_blank" rel="noopener noreferrer">
                  {social}
                </a>
              ))}
            </SocialLinks>
            {/* New fields */}
            <p>Bio: {profileData.profile.bio}</p>
            <p>Location: {profileData.profile.location}</p>
            <p>URL: {profileData.profile.url}</p>
            <p>Building Place: {profileData.profile.buildingPlace}</p>
          </LeftForFollow>

        </ProfileInfo>
      )}
    </Container>
  );
};


export default App;
