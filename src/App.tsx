// App.tsx
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "./index.css";
import NightMode from "./NightMode.tsx";

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
  location: string;
  buildingPlace: string;
  bio: string;
  blog: string;
  twitter: string;
}

const defaultUserProfile: UserProfile = {
  login: "octocat",
  name: "The Octocat",
  public_repos: 8,
  created_at: "2011-01-25",
  joinDate: "",
  pseudoName: "octocat",
  socials: [],
  followers: 3938,
  following: 9,
  avatar_url: "https://github.com/octocat.png",  // Octocat avatar URL
  location: "San Francisco",
  buildingPlace: "@github",
  bio: "This profile has no bio",
  blog: "https://github.blog",
  twitter: "Not Available",
};


const GlobalStyle = createGlobalStyle<{ nightMode: boolean }>`
  body {
    height: 100vh;
    background: ${(props) => (props.nightMode ? "#141D2F" : "#f6f8ff")};
    color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
  }
`;

const Container = styled.div<{ nightMode: boolean }>`
  background: ${(props) => (props.nightMode ? "#141D2F" : "#f6f8ff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const InputCont = styled.div`
  margin-top: 32px;

  & svg {
    position: absolute;
    margin-left: 32px;
    margin-top: 22px;
  }
`;

const Input = styled.input<{ nightMode: boolean }>`
  outline: none;
  border: none;
  height: 70px;
  border-radius: 15px;
  margin-bottom: 10px;
  width: 730px;
  padding-left: 82px;
  padding-right: 48px;
  color: ${(props) => (props.nightMode ? "#fff" : "#4b6a9b")};
  font-family: "Space Mono";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  border-radius: 15px;
  background: ${(props) => (props.nightMode ? "#1E2A47" : "#FEFEFE")};
  box-shadow: ${(props) => (props.nightMode ? "0px 0px 0px 0px rgba(70, 96, 187, 0.2)" : "0px 16px 30px -10px rgba(70, 96, 187, 0.2)")};
  
  &::placeholder {
    color: ${(props) => (props.nightMode ? "#fff" : "#4b6a9b")};
  }

  @media screen and (max-width: 768px) {
    width: 573px;
  }

`;


const Button = styled.button`
  position: absolute;
  width: 106px;
  height: 50px;
  margin-left: -118px;
  margin-top: 10px;
  color: #fff;
  font-family: "Space Mono";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 10px;
  border: none;
  background-color: #2d9cdb;
  cursor: pointer;
  &:hover {
    background-color: #60abff;
  }
`;

const ProfileInfo = styled.div<{ nightMode: boolean }>`
  width: 730px;
  height: auto;
  padding: 44px 48px 48px 48px;
  margin-top: 20px;
  border-radius: 15px;
  background: ${(props) => (props.nightMode ? "#1E2A47" : "#FEFEFE")};
  box-shadow: ${(props) => (props.nightMode ? "0px 0px 0px 0px rgba(70, 96, 187, 0.2)" : "0px 16px 30px -10px rgba(70, 96, 187, 0.2)")};

  @media screen and (max-width: 768px) {
    width: 573px;
  }
`;

const StyledSVG = styled.svg<{ nightMode: boolean }>`
  fill: ${(props) => (props.nightMode ? '#fff' : '#4b6a9b')};
`;

const ContainerForFollow = styled.div<{ nightMode: boolean }>`
  width: 480px;
  height: 85px;
  margin-top: 32px;
  padding-left: 32px;
  padding-right: 83px;
  background: ${(props) => (props.nightMode ? "#141D2F" : "#F6F8FF")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & p {
    display: grid;
    flex-direction: column;
    color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
    font-family: "Space Mono";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    & span {
      color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
      font-family: "Space Mono";
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
`;

const Name = styled.p<{ nightMode: boolean }>`
  margin: 0;
  margin-bottom: 2px;
  color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
  font-family: "Space Mono";
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 200px;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bio = styled.p<{ nightMode: boolean }>`
  margin: 0;
  margin-top: 20px;
  color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
  font-family: "Space Mono";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 300px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  color: #4b6a9b;
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
    color: #0079ff;
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

const Socials = styled.div<{ nightMode: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  justify-content: flex-end;
  flex-direction: column;
  justify-items: space-between;
  margin-top: 37px;
  gap: 30px;
  & p {
    color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
    font-family: "Space Mono";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 20px;
  }
`;

const UserWebsite = styled.div`
  &.opacity-50 {
    opacity: 0.5;
  }
`;

const UserLink = styled.a`
  text-decoration: none;
  color: #0079ff;
  font-family: "Space Mono";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ToggleName = styled.div <{ nightMode: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 730px;

  & h1 {
    font-family: "Space Mono";
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
  }

  @media screen and (max-width: 768px) {
    width: 573px;
  }
`;

const Join = styled.p<{ nightMode: boolean }>`
  margin: 0;
  margin-top: 10px;
  color: ${(props) => (props.nightMode ? "#fff" : "#2b3442")};
  font-family: "Space Mono";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`;

// ... (previous imports and styled components)

const App: React.FC = () => {
  const [nightMode, setNightMode] = useState(false);
  const toggleNightMode = () => {
    setNightMode((prevNightMode) => !prevNightMode);
  };

  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState<{
    profile: UserProfile | null;
  }>({
    profile: null,
  });
  const [websiteInfo, setWebsiteInfo] = useState<string | null>("");

  useEffect(() => {
    setProfileData({ profile: enrichProfileData(defaultUserProfile) });

  }, []);

  useEffect(() => {
    if (profileData.profile) {
      if (!profileData.profile.blog || profileData.profile.blog.length < 1) {
        setWebsiteInfo("Not Available");
      } else {
        const blogInfo = profileData.profile.blog
          ? `${profileData.profile.blog}`
          : "Not Available";
        setWebsiteInfo(`${blogInfo}`);
      }
    }
  }, [profileData]);


  const handleSearch = async () => {
    try {
      if (!username) {
        alert("Please enter a GitHub username");
        return;
      }

      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!profileResponse.ok) {
        alert("GitHub user not found");
        return;
      }

      const profileData: UserProfile = await profileResponse.json();

      setProfileData({ profile: enrichProfileData(profileData) });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const enrichProfileData = (profileData: UserProfile): UserProfile => {
    return {
      ...profileData,
      joinDate: new Date(profileData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),

      pseudoName: profileData.login,
      bio: profileData.bio || "This profile has no bio",
      twitter: profileData.twitter || "Not available",
      location: profileData.location || "Not available",
      blog: profileData.blog || "Not available",
      buildingPlace: profileData.buildingPlace || "Not available",
    };
  };
  return (
    <Container nightMode={nightMode}>
      <GlobalStyle nightMode={nightMode} />
      <ToggleName nightMode={nightMode}>
        <h1>devfinder</h1>
        <NightMode nightMode={nightMode} toggleNightMode={toggleNightMode} />
      </ToggleName>
      <InputCont>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6087 0C4.7591 0 0 4.74609 0 10.5797C0 16.4133 4.75915 21.1594 10.6087 21.1594C13.2162 21.1594 15.6071 20.2163 17.4563 18.6542L22.575 23.747C22.7449 23.9157 22.9664 24 23.1884 24C23.4118 24 23.635 23.9145 23.8049 23.7438C24.1435 23.4032 24.142 22.8527 23.8017 22.5139L18.6893 17.4274C20.2652 15.5807 21.2174 13.189 21.2174 10.5797C21.2174 4.74609 16.4582 0 10.6087 0ZM16.9346 16.7705C18.5071 15.1744 19.4782 12.9879 19.4782 10.5797C19.4782 5.70488 15.4994 1.73908 10.6087 1.73908C5.71794 1.73908 1.73913 5.70488 1.73913 10.5797C1.73913 15.4542 5.71794 19.4203 10.6087 19.4203C13.0163 19.4203 15.2029 18.4591 16.8027 16.9016C16.8211 16.879 16.8407 16.8571 16.8617 16.836C16.885 16.8125 16.9094 16.7907 16.9346 16.7705Z"
            fill="#0079FF"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          nightMode={nightMode}
        />
        <Button onClick={handleSearch}>Search</Button>
      </InputCont>

      {profileData.profile && (
        <ProfileInfo nightMode={nightMode}>
          <Head>
            {profileData.profile.avatar_url && (
              <img
                src={profileData.profile.avatar_url}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "117px",
                  height: "117px",
                  marginBottom: "10px",
                }}
              />
            )}
            <Left>
            <Names>
              <Name nightMode={nightMode}>{profileData.profile.name}</Name>
              <UserLink
                href={`https://github.com/${profileData.profile.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{profileData.profile.pseudoName}
              </UserLink>
              <Bio nightMode={nightMode}>{profileData.profile.bio}</Bio>
            </Names>
            <Join nightMode={nightMode}>Joined {profileData.profile.joinDate}</Join>
            </Left>
          </Head>
          <LeftForFollow>
            <ContainerForFollow nightMode={nightMode}>
              <p>
                Repos <span>{profileData.profile.public_repos}</span>
              </p>
              <p>
                Followers <span>{profileData.profile.followers}</span>
              </p>
              <p>
                Following <span>{profileData.profile.following}</span>
              </p>
            </ContainerForFollow>
            <SocialLinks>
              {profileData.profile.socials?.map((social, index) => (
                <a
                  href={social}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social}
                </a>
              ))}
            </SocialLinks>
            {/* New fields */}
            <Socials nightMode={nightMode}>
              <p>
                <StyledSVG
                  nightMode={nightMode}
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.03013 0.00158203C9.42758 0.0504882 11.5835 1.33021 12.7973 3.4249C14.038 5.56599 14.072 8.13786 12.8882 10.3047L7.92872 19.3823L7.92196 19.3943C7.7038 19.7736 7.3129 20 6.87634 20C6.43974 20 6.04884 19.7736 5.83064 19.3943L5.82388 19.3823L0.86439 10.3047C-0.319437 8.13786 -0.285492 5.56599 0.95521 3.4249C2.16904 1.33021 4.32497 0.0504882 6.72239 0.00158203C6.82477 -0.000527343 6.92778 -0.000527343 7.03013 0.00158203ZM4.06376 6.25001C4.06376 7.80083 5.32544 9.06251 6.87626 9.06251C8.42712 9.06251 9.68876 7.80083 9.68876 6.25001C9.68876 4.69919 8.42708 3.43752 6.87626 3.43752C5.32544 3.43752 4.06376 4.69919 4.06376 6.25001Z"
                  />
                </StyledSVG>
                {profileData.profile.location}
              </p>
              <p>
                <StyledSVG
                  nightMode={nightMode}
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 2.79875C19.2562 3.125 18.4637 3.34125 17.6375 3.44625C18.4875 2.93875 19.1362 2.14125 19.4412 1.18C18.6487 1.6525 17.7737 1.98625 16.8412 2.1725C16.0887 1.37125 15.0162 0.875 13.8462 0.875C11.5762 0.875 9.74874 2.7175 9.74874 4.97625C9.74874 5.30125 9.77624 5.61375 9.84374 5.91124C6.43499 5.745 3.41875 4.11125 1.3925 1.6225C1.03875 2.23625 0.831249 2.93875 0.831249 3.695C0.831249 5.115 1.5625 6.37374 2.6525 7.10249C1.99375 7.08999 1.3475 6.89874 0.799999 6.59749C0.799999 6.60999 0.799999 6.62624 0.799999 6.64249C0.799999 8.63499 2.22125 10.29 4.085 10.6712C3.75125 10.7625 3.3875 10.8062 3.01 10.8062C2.7475 10.8062 2.4825 10.7912 2.23375 10.7362C2.765 12.36 4.2725 13.5537 6.06499 13.5925C4.67 14.6837 2.89875 15.3412 0.981249 15.3412C0.644999 15.3412 0.3225 15.3262 0 15.285C1.81625 16.4562 3.96875 17.125 6.28999 17.125C13.835 17.125 17.96 10.875 17.96 5.4575C17.96 5.27625 17.9537 5.10125 17.945 4.9275C18.7587 4.35 19.4425 3.62875 20 2.79875Z"
                  />
                </StyledSVG>
                {profileData.profile.twitter}
              </p>
              <UserWebsite >
                <p className={websiteInfo ? "Not available" : "opacity-50"}>
                  <StyledSVG
                    nightMode={nightMode}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.40416 5.01207C5.04862 7.44921 5.56264 11.4937 8.26088 13.2854C8.34979 13.3445 8.46807 13.3328 8.54444 13.2582C9.11248 12.7031 9.59303 12.1655 10.0138 11.4817C10.0782 11.3771 10.0381 11.2414 9.93014 11.1829C9.51858 10.9599 9.10905 10.5418 8.8785 10.1002L8.87823 10.1003C8.60205 9.55042 8.50803 8.93398 8.65424 8.29734C8.6544 8.29738 8.65455 8.29742 8.65471 8.29742C8.82295 7.48234 9.69799 6.72414 10.3663 6.02293C10.3649 6.02246 10.3635 6.02195 10.3621 6.02148L12.8662 3.46578C13.864 2.44731 15.5054 2.43891 16.5137 3.44715C17.5321 4.445 17.549 6.09468 16.5511 7.11312L15.0344 8.67281C14.9642 8.74499 14.9414 8.85031 14.9743 8.9455C15.3235 9.9582 15.4094 11.3861 15.1754 12.465C15.1688 12.4951 15.2061 12.5149 15.2277 12.4928L18.4557 9.19816C20.5179 7.09347 20.5004 3.66676 18.4168 1.58324C16.2906 -0.543044 12.829 -0.525348 10.7246 1.6225L7.41709 4.99824C7.41272 5.00285 7.40858 5.00754 7.40416 5.01207Z"
                    />
                    <path
                      d="M13.439 13.7495C13.4389 13.7496 13.4388 13.7497 13.4388 13.7499C13.4409 13.749 13.4428 13.7482 13.4449 13.7473C14.1036 12.5426 14.2333 11.161 13.9246 9.81419L13.9232 9.81564L13.9217 9.81498C13.6285 8.61541 12.8241 7.42424 11.7316 6.69084C11.6376 6.62775 11.4875 6.63506 11.3995 6.70623C10.8461 7.15369 10.3044 7.72748 9.94697 8.4597C9.89083 8.57466 9.93287 8.71275 10.0435 8.77697C10.4583 9.01779 10.8329 9.37037 11.0837 9.83845L11.0841 9.83818C11.2796 10.1688 11.4722 10.7963 11.3474 11.4704C11.3474 11.4704 11.3472 11.4704 11.3472 11.4704C11.2308 12.3642 10.3282 13.184 9.61068 13.9228L9.61103 13.9231C9.06486 14.4817 7.67646 15.897 7.12052 16.465C6.12267 17.4834 4.47299 17.5003 3.45455 16.5024C2.43612 15.5046 2.41928 13.8549 3.41713 12.8365L4.93834 11.2721C5.00728 11.2012 5.03072 11.0981 5.00006 11.0041C4.66228 9.96775 4.56975 8.57201 4.78295 7.49439C4.78889 7.46435 4.75193 7.44517 4.73049 7.46705L1.551 10.7122C-0.53228 12.8384 -0.514624 16.3003 1.5903 18.4052C3.71647 20.4884 7.16049 20.4532 9.24369 18.327C9.9674 17.5175 13.0654 14.6492 13.439 13.7495Z"
                    />
                  </StyledSVG>
                  {websiteInfo ? websiteInfo : "Not available"}
                </p>
              </UserWebsite>
              <p>
                <StyledSVG
                  nightMode={nightMode}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.8583 1.55832L1.7 0.16665C1.275 0.0999838 0.841666 0.21665 0.516666 0.49165C0.191666 0.774983 0 1.18332 0 1.60832V19.1666C0 19.625 0.375 20 0.833333 20H3.54166V15.625C3.54166 14.8166 4.19166 14.1666 5 14.1666H7.08333C7.89166 14.1666 8.54166 14.8166 8.54166 15.625V20H12.0833V2.99998C12.0833 2.28331 11.5667 1.67498 10.8583 1.55832ZM4.58333 12.2916H3.33333C2.98833 12.2916 2.70833 12.0116 2.70833 11.6666C2.70833 11.3216 2.98833 11.0416 3.33333 11.0416H4.58333C4.92833 11.0416 5.20833 11.3216 5.20833 11.6666C5.20833 12.0116 4.92833 12.2916 4.58333 12.2916ZM3.33333 9.79164H4.58333C4.92833 9.79164 5.20833 9.51164 5.20833 9.16664C5.20833 8.82164 4.92833 8.54164 4.58333 8.54164H3.33333C2.98833 8.54164 2.70833 8.82164 2.70833 9.16664C2.70833 9.51164 2.98833 9.79164 3.33333 9.79164ZM4.58333 7.29164H3.33333C2.98833 7.29164 2.70833 7.01164 2.70833 6.66664C2.70833 6.32164 2.98833 6.04164 3.33333 6.04164H4.58333C4.92833 6.04164 5.20833 6.32164 5.20833 6.66664C5.20833 7.01164 4.92833 7.29164 4.58333 7.29164ZM3.33333 4.79165H4.58333C4.92833 4.79165 5.20833 4.51165 5.20833 4.16665C5.20833 3.82165 4.92833 3.54165 4.58333 3.54165H3.33333C2.98833 3.54165 2.70833 3.82165 2.70833 4.16665C2.70833 4.51165 2.98833 4.79165 3.33333 4.79165ZM8.74999 12.2916H7.49999C7.15499 12.2916 6.87499 12.0116 6.87499 11.6666C6.87499 11.3216 7.15499 11.0416 7.49999 11.0416H8.74999C9.09499 11.0416 9.37499 11.3216 9.37499 11.6666C9.37499 12.0116 9.09499 12.2916 8.74999 12.2916ZM7.49999 9.79164H8.74999C9.09499 9.79164 9.37499 9.51164 9.37499 9.16664C9.37499 8.82164 9.09499 8.54164 8.74999 8.54164H7.49999C7.15499 8.54164 6.87499 8.82164 6.87499 9.16664C6.87499 9.51164 7.15499 9.79164 7.49999 9.79164ZM8.74999 7.29164H7.49999C7.15499 7.29164 6.87499 7.01164 6.87499 6.66664C6.87499 6.32164 7.15499 6.04164 7.49999 6.04164H8.74999C9.09499 6.04164 9.37499 6.32164 9.37499 6.66664C9.37499 7.01164 9.09499 7.29164 8.74999 7.29164ZM7.49999 4.79165H8.74999C9.09499 4.79165 9.37499 4.51165 9.37499 4.16665C9.37499 3.82165 9.09499 3.54165 8.74999 3.54165H7.49999C7.15499 3.54165 6.87499 3.82165 6.87499 4.16665C6.87499 4.51165 7.15499 4.79165 7.49999 4.79165Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9166 7.79248L18.85 9.03498C19.5308 9.18581 20 9.77165 20 10.46V18.5416C20 19.3458 19.3458 20 18.5416 20H12.9166V7.79248ZM15.625 17.5H16.875C17.22 17.5 17.5 17.22 17.5 16.875C17.5 16.53 17.22 16.25 16.875 16.25H15.625C15.28 16.25 15 16.53 15 16.875C15 17.22 15.28 17.5 15.625 17.5ZM16.875 15H15.625C15.28 15 15 14.72 15 14.375C15 14.03 15.28 13.75 15.625 13.75H16.875C17.22 13.75 17.5 14.03 17.5 14.375C17.5 14.72 17.22 15 16.875 15ZM15.625 12.5H16.875C17.22 12.5 17.5 12.22 17.5 11.875C17.5 11.53 17.22 11.25 16.875 11.25H15.625C15.28 11.25 15 11.53 15 11.875C15 12.22 15.28 12.5 15.625 12.5Z"
                  />
                </StyledSVG>
                {profileData.profile.buildingPlace}
              </p>
            </Socials>
          </LeftForFollow>
        </ProfileInfo>
      )}
    </Container>
  );
};


export default App;