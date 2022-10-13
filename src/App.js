import { useEffect, useState } from 'react';
import './App.css';
import {getAnimeData} from './anime.js'
import ReactPaginate from 'react-paginate';
import {ScaleLoader} from 'react-spinners';
import bgimg from './bgimg.jpg'


function App() {

  const [currentPage , setPage] = useState(1)
  const [finalData , setData] = useState([])
  const [loading ,setLoading] = useState(true)
  const [error, setError] = useState(false)
 
  const getData = async () => {
    try{
        setLoading(true)
        setError(false)
        const data = await getAnimeData(currentPage);
        setData(data.data)
        setLoading(false)
        
    }catch(error) {
      setData([])
      setError(true)
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getData()
  },[])


  const handlePageClick = (data) =>{
    let pgNum = data.selected + 1
    setPage(pgNum)
    getData()
  }
 
  
  
  return (
   <>
    <div>
      <div className = ' App h-[100vh] w-[vw] flex items-center justify-center bg-no-repeat bg-bottom-right bg-cover pb-10' style = {{backgroundImage : `url(${bgimg})`}}>
        <div className='bg-white/40 backdrop-blur-lg h-[99%] w-[98%] rounded-xl shadow-2xl mt-10 font-light  flex items-center justify-center' >
          <div className=''>
                                  {loading ? (<>
                                    <div className="loader-container flex items-center justify-center ">
                                          <ScaleLoader
                                            size={100}
                                            color= {"black"}
                                            loading= {loading}
                                            />
                                          </div>
                                    </>) : (<>
                                    {console.log(finalData)}
                                     <tr className='font-[700] head'>
                                      <th>TITTLE</th>
                                      <th>RANK</th>
                                      <th>SOURCE</th>
                                      <th>RATING</th>
                                      <th>POPULARITY</th>
                                      <th>YEAR</th>
                                      </tr>
                                    {finalData.map((items) => (
                                      <>
                                      <tr>
                                        <td>{items.title_english}</td>
                                        <td>{items.rank}</td>
                                        <td>{items.source}</td>
                                        <td>{items.rating}</td>
                                        <td>{items.popularity}</td>
                                        <td>{items.year}</td>
                                      </tr>
                                      </>
                                    ))}
                                    {error ? (<><p className='flex justify-center items-center'>Got an error</p></>) : null}
                                  </>)}
          </div>
          
          <div className=' text-mg flex items-center  fixed bottom-2 mt-10'>
            <ReactPaginate
            previousLabel = {'<<'}
            nextLabel = {'>>'}
            breakLabel ={'...'}
            pageCount = {1024}
            marginPagesDisplayed = {3}
            onPageChange = {handlePageClick}
            disabled ={loading}
            pageClassName ={ "m-3 bg-black rounded-full text-white w-[30px] h-[30px] text-center"}
            previousClassName ={ "m-3 bg-black rounded-full text-white w-[30px] h-[30px] text-center"}
            activeClassName ={ "m-3 bg-blue rounded-full text-white w-[30px] h-[30px] text-center"}
            nextClassName ={ "m-3 bg-black rounded-full text-white w-[30px] h-[30px] text-center"}
            className={"flex text-center items-center justify-center "}
            >
            </ReactPaginate>
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default App;
