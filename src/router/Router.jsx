import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AuthForm from "../pages/AuthForm";
import Chat from "../pages/Chat";
import Setting from "../pages/Setting";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout"; 
import MainLayout from "../components/MainLayout";
import Transcription from "../pages/Transcription";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/AuthForm"
          element={
            <MainLayout>
              <AuthForm />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Layout>
                <Chat />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Layout>
                <Setting />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Transcription"
          element={
            <PrivateRoute>
              <Layout>
                <Transcription />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
