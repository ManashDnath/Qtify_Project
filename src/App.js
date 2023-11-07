
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import trash from '../trash.png'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';



function App() {

    const [state, setState] = useState([]);
    const [perpage,setPerpage]=useState(10);
    const [currentpage,setCurrentpage]=useState(1);

    useEffect(()=>{
      axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(res=>setState(res.data))
      .catch((e)=>{console.log('error',e)})  
    })

    const numberofTotalPages= Math.ceil(state.length/perpage);
    const pages = [...Array(numberofTotalPages + 1).keys()].slice(1);
    const pageEndingContent=currentpage*perpage;
    const pageStartingContent=pageEndingContent-perpage;

    const visibleContent=state.slice(pageStartingContent,pageEndingContent);

    const prevPage=()=>{
      if(currentpage !== 1){
        setCurrentpage(currentpage-1)
      }
    }
    const nextPage=()=>{
      if(currentpage !== numberofTotalPages){
        setCurrentpage(currentpage + 1)
      }
    }

    return( 
      <>
        <table>
                <tr>
                  <th>{<input type="checkbox"/>}</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              
        {visibleContent.map((data) => {
            return ( 
                <tr key={data.id}>
                  <td>{<input type="checkbox"/>}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                <td><span><BorderColorIcon/></span><span><DeleteIcon/></span></td>
                </tr>  
          )      
        })} 
        </table>
        <button onClick={prevPage}>prev</button>
        
        {pages.map(res=>(<span key={res}
         onClick={()=> setCurrentpage(res)}>{res}</span>))}
        
        <button onClick={nextPage}>next</button>
      </>    
    )
    
    
      
  }
  
    


export default App;
