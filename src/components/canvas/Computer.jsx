import {Suspense, useEffect,useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Preload, useGLTF} from '@react-three/drei';
import CanvasLoader from '../Loader';


const Computer = ({isMobile}) => {
    const computer = useGLTF('./desktop_pc/scene.gltf')
    return (
    <mesh>
        <hemisphereLight intensity={3.15} groundColor="black"/>
        <pointLight intensity={120}/>
        <spotLight position={[-120, 150, 100]}
            angle={1.50}
            penumbra={2}
            intensity={120}
            castShadow
            shadow-mapSize={1024}
        />
        <primitive object={computer.scene} scale={isMobile ? 0.5 : 2.55} position={isMobile ? [12, -3, 2] :[-3, -12.75, -4.75]} rotation={[-0.01, -0.2,-0.1]}/>
    </mesh>
  )
}

const ComputerCanvas = () =>{
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() =>{
        const mediaQuery = window.matchMedia(
            '(max-width:500px)');
        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event)=>{
        setIsMobile(event.matches);
        }
      mediaQuery.addEventListener('change',handleMediaQueryChange);
      return() =>{
        mediaQuery.removeEventListener('change',handleMediaQueryChange);
      }; 
    },[]);
    return (
        <Canvas frameloop='demand' shadows camera={{position:[20, 3, 5], fav:25}} gl={{preserveDrawingBuffer:true}}>
        <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls enableZoom={false} 
        maxPolarAngle={Math.PI/2} 
        minPolarAngle={Math.PI/2}

        />
        <Computer isMobile={isMobile}/>
        </Suspense>
        <Preload all/>
        </Canvas>
    )
}

export default ComputerCanvas;