import React, { useState, useEffect } from 'react';
import Jumbotron from './Jumbotron';
import {Link} from 'react-router-dom';
import productCard from '../ProductCard/productCard';



const Home = (props) => {



   return (
            <div> 
                 <Jumbotron/>
                 <Banner/>

               <div>
                    {
                     product?.map(p =>{
                       return (
                         <div>
                           <Link to= {'/detail/'+p.id} >
                             <productCard
                               name={p.nombre}
                               images={p.img? p.img: <img src= "Logo.png" alt= "inmagen no disponible"/>} 
                               key={p.id}
                              />
                           </Link>
                         </div>
                       )
                     })
                    }
          </div>


                {/* <div>
                   <h3>Los Mas Bendidos</h3>
                 <div>
                    {topFive.length >1 && topFive.map((product) => 
                      <productCard  key={product.product_id} data={product} className={styles.card}/>
                     )
                    }
                </div>
                </div> */}

            </div>





   )
}
    
export default Home