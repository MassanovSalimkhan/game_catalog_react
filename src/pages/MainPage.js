import React from "react";
import Layout from "../components/Layout";

function MainPage(){
    return(
        <Layout>
            <div style={{textAlign: 'center', padding: '40px 20px'}}>
                <h1 style={{color: '#66c0f4', marginBottom: '20px'}}>Добро пожаловать в каталог игр</h1>
                <p style={{color: '#c7d5e0', fontSize: '1.2rem'}}>Выберите раздел для просмотра</p>
                
                <div style={{marginTop: '40px'}}>
                    <a href="/games" style={{
                        display: 'inline-block',
                        padding: '15px 30px',
                        background: 'linear-gradient(135deg, #66c0f4, #4c8bf5)',
                        color: '#1b2838',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                    }}>
                        Перейти к списку игр
                    </a>
                </div>
            </div>
        </Layout>
    );
}

export default MainPage;