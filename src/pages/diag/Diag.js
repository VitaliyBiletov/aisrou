import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StateFunc from "../../components/sections/stateFunc/StateFunc";
import Sensmotor from "../../components/sections/sensmotor/Sensmotor";


class Diag extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>Состояние функций</Tab>
                    <Tab>Сенсо-моторный уровень</Tab>
                </TabList>

                <TabPanel>
                    <h2>Состояние функций</h2>
                    <StateFunc/>
                </TabPanel>
                <TabPanel>
                    <Sensmotor />
                </TabPanel>
            </Tabs>
        )
    }
}
export { Diag }