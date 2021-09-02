import React from 'react'
import {useContext} from 'react';
import Layout from '../components/layout/Layout';
import { UserContext } from "../UserContext";

export default function mypage() {
  const {userName} = useContext(UserContext);

  return (
    <>
    <Layout>
    mypage
    {userName}
    </Layout>
    </>
  )
}
