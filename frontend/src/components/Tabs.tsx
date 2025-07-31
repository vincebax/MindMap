
// DONT USE THIS COMPONENT
// import { useState } from 'react'
// import {v4 as uuid4v} from 'uuid'

// //Currently it rerenders every single time so the data is lost but it should be fine if the data is saved in a database


// interface TabProps{

// }

// export default function Tabs({children}){
//     const [tabState, settabState] = useState("MarkdownEditor") //Renders the chosen component


//     const handleChangeTabs = (e, currentTab) => {
//         e.preventDefault();
//         settabState(currentTab);
//     }


//     return (
//         <div>
//         <ul>
//             {children.map((tabs) =>{
//                 return(
//                     <li className={tabs.props.className}><a onClick ={(e) => handleChangeTabs(e, tabs.props.className)}href ="#">{tabs.props.className}</a></li> //Creates the tab interface so you can click and choose a tab
//                 )
//             })}
//         </ul>
        

//         {/* Checks if the component if equal to the name of the component stored in state, if yes render */}
//         <div>{children.map((tabContent) => {
//             if(tabContent.props.className === tabState){
//                 return (
//                     <div key = {tabContent.props.className}>{tabContent}</div>
//                 )
//             } else{
//                 return(
//                     <></>
//                 )
//             }
//         })}</div>
//         </div>
//     );
// }