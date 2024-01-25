// App.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Define types for user profile and repository
interface UserProfile {
  login: string;
  name: string;
  public_repos: number;
  // Add more properties as needed
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
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
`;

const ProfileInfo = styled.div`
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<{ profile: UserProfile | null; repositories: Repository[] | null }>({
    profile: null,
    repositories: null,
  });

  const handleSearch = async () => {
    try {
      // Fetch user profile data
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      const profileData: UserProfile = await profileResponse.json();

      // Fetch user repositories
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repoData: Repository[] = await repoResponse.json();

      // Combine profile and repository data
      setProfileData({ profile: profileData, repositories: repoData });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  useEffect(() => {
    // Additional initialization or side-effects can go here
  }, []); // The empty dependency array ensures this runs only once on component mount

  return (
    <Container>
      <h1>GitHub Profile Searcher</h1>
      <Input 
        type="text" 
        placeholder="Enter GitHub username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <Button onClick={handleSearch}>Search</Button>

      {profileData.profile && (
        <ProfileInfo>
          <h2>{profileData.profile.login}'s Profile</h2>
          <p>Name: {profileData.profile.name}</p>
          <p>Public Repositories: {profileData.profile.public_repos}</p>

          <h3>Repositories:</h3>
          <ul>
            {profileData.repositories.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </ProfileInfo>
      )}
    </Container>
  );
};

export default App;
