import "./Home.css";

import { Button } from "react-bootstrap";
import { MainTab, AddMainTab } from "components";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";


export default function Home() {

    const { maintabs, user, authenticated, setMaintabs } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const welcome = "Welcome " + user?.firstName + "!";
  
    //fetches maintabs
    useEffect(() => {
        const fetchMaintabs = async () => {
            setIsFetching(true);
      
            const { data, error } = await apiClient.listMaintabs();
            if(data) setMaintabs(data?.maintabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }
    
        if(authenticated) fetchMaintabs();

    }, [setMaintabs, user, authenticated]);


    //method to show modal for adding maintab...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Home">
            <div className="parallax">
                <div className="caption">
                    <h3>{welcome}</h3>
                    <h4>What's your focus today?</h4>
                </div>
            </div>

            <div className="home-area">
                <div className="title">
                    <h3>{user?.firstName + `'s MainTabs`}</h3>
                    <Button className="addBtn" onClick={() => setModalShow(true)}>
                        Add MainTab
                    </Button>

                    <AddMainTab
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>

                <div className="maintabs">
                    {maintabs.map((maintab) => (
                        <MainTab key={maintab.id} maintab={maintab} />
                    ))}
                </div>
            </div>
        </div>
    );
}