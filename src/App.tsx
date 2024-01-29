// App.tsx
import React, { useState} from 'react';
import styled from 'styled-components';

// Define types for user profile and repository
interface UserProfile {
  login: string;
  name: string;
  public_repos: number;
  created_at: string; // Assuming 'created_at' represents the join date
  // Additional properties
  joinDate: string;
  pseudoName: string;
  socials: string[]; // Assuming an array of social media links
  followers: number;
  following: number;
}

interface Repository {
  id: number;
  name: string;
  // Add more properties as needed
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 70px;
  border-radius: 15px;
  margin-bottom: 10px;
  width: 730px;
  padding-left: 20px;
  color: #4B6A9B;
  font-family: "Space Mono";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 138.889% */
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
width: auto;
height: 420px;
padding: 48px;
margin-top: 20px;
border-radius: 15px;
background: #FEFEFE;
box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.20);

`;

const ProfileLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #0079FF;
font-family: "Space Mono";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin: 0;
`;

const ContainerForFollow = styled.div`
width: 480px;
height: 85px;
padding-left: 32px;
padding-right: 83px;
background-color: #F6F8FF;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: space-between;
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
align-items: center;
justify-content: space-between;
& p {
  margin: 0;
  color: #4B6A9B;
font-family: "Space Mono";
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
`;



// Function to enrich profile data with additional properties
const enrichProfileData = (profileData: UserProfile): UserProfile => {
  return {
    ...profileData,
    joinDate: new Date(profileData.created_at).toLocaleDateString(),
    pseudoName: profileData.login,
    socials: profileData.socials, // Add actual social media links
    followers: profileData.followers,
    following: profileData.following,
  };
};

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<{ profile: UserProfile | null; repositories: Repository[] | null }>({
    profile: null,
    repositories: null,
  });

  const handleSearch = async () => {
    try {
      if (!username) {
        // If username is empty, show an alert or handle the validation as needed
        alert('Please enter a GitHub username');
        return;
      }

      // Fetch user profile data
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      
      if (!profileResponse.ok) {
        // If the profile data fetch is not successful, handle the error
        alert('GitHub user not found');
        return;
      }

      const profileData: UserProfile = await profileResponse.json();

      // Fetch user repositories
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);

      if (!repoResponse.ok) {
        // If the repository data fetch is not successful, handle the error
        alert('Error fetching repositories');
        return;
      }

      const repoData: Repository[] = await repoResponse.json();

      // Combine profile and repository data
      setProfileData({ profile: enrichProfileData(profileData), repositories: repoData });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
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
          <Names>
       <p><Name>{profileData.profile.name}</Name></p>
          <h2>
            <ProfileLink href={`https://github.com/${profileData.profile.login}`} target="_blank" rel="noopener noreferrer">
              @{profileData.profile.pseudoName}
            </ProfileLink>
          </h2>
       </Names>
          <p>Join Date: {profileData.profile.joinDate}</p>
          </Head>
         <ContainerForFollow>
          <p>Repos <span>{profileData.profile.public_repos}</span></p>
            {/* <p>Socials: {profileData.profile.socials}</p> */}
            <p>Followers <span>{profileData.profile.followers}</span></p>
            <p>Following <span>{profileData.profile.following}</span></p>
         </ContainerForFollow>

          <h3>Repositories:</h3>
          <ul>
            {profileData.repositories?.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </ProfileInfo>
      )}
    </Container>
  );
};

export default App;
