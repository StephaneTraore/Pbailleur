
import { Link } from "react-router-dom";
//ts-ignore
import illustration from '../assets/images/illustration.png'

export default function NotFound(){
    return(
        <>

    <div className="h-screen w-screen bg-gray-100 flex items-center ">
	<div className="container flex flex-row items-center justify-between m-[20%] px-5 text-gray-700 ">
   		<div className=" ">
      		<div className="text-9xl font-dark font-bold">404</div>
            <p
              className="text-5xl mb-[8px] font-light leading-normal"
            >Désolé, cette page est introuvable. </p>
          <p className="mb-15 text-2xl ">Mais ne vous inquiétez pas, vous trouverez bien d'autres choses sur notre page site..</p>
          
          <Link to='/' className="px-6 inline py-4 text-[16px]  font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-[#F08130] active:bg-blue-600 hover:bg-black">Retour à la page Site</Link>
    </div>
      <div className="max-w-lg">
        <img src={illustration} alt="Logo" width={100} height={100} className=" w-[300px] h-[300px]" />
    </div>
    
  </div>
</div>
        </>
    )
}