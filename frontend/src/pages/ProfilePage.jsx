import React, { useEffect } from 'react'
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


const ProfileContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: '4px solid #ffffff',
}));




function ProfilePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(userDetails())
    }, [])

    const data = useSelector((state) => state.userInfo)
    const { getUserInfo } = data;

    const toEdit = () => {
        navigate("/profile/edit");
    };

    return (
        <>
            <Navbar />
            <ProfileContainer  >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={4} md={3} textAlign="center">
                        <ProfileAvatar src={getUserInfo?.profileImage.url} alt="Profile" />
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Typography variant="h4" gutterBottom>
                            {getUserInfo?.firstName + "" + getUserInfo?.lastName}
                        </Typography>
                        <Typography variant="subtitle1">Phone No: {getUserInfo?.mobileno}</Typography>
                        <ul>
                            <li>{getUserInfo?.email}</li>
                            <li>Location: {getUserInfo?.cityl}</li>
                            <li>state:{getUserInfo?.state}</li>
                        </ul>
                    </Grid>
                </Grid>
                <Button
                    onClick={toEdit}
                    sx={{ p: 5 }}
                >
                    Edit Details
                </Button>
            </ProfileContainer>
        </>
    )
}

export default ProfilePage
