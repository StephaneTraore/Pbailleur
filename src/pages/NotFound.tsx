
import { Link } from "react-router-dom";


export default function NotFound(){
    return(
        <>

    <div className="h-screen w-screen bg-gray-100 flex items-center">
	<div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
   		<div className="max-w-md">
      		<div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Désolé, cette page est introuvable. </p>
          <p className="mb-8">Mais ne vous inquiétez pas, vous trouverez bien d'autres choses sur notre page d'accueil..</p>
          
          <Link to='/' className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-[#F08130] active:bg-blue-600 hover:bg-blue-700">Sites</Link>
    </div>
      <div className="max-w-lg">
        <img src="../assets/images/illustration.png" alt="Logo" width={100} height={100} />
    </div>
    
  </div>
</div>
        </>
    )
}