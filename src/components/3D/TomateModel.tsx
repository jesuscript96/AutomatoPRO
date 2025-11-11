'use client';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

function Tomate() {
  const { scene } = useGLTF('/tomatoe.glb');
  
  // Clonar la escena y calcular escala y posición del modelo
  const { clonedScene, scale, position } = useMemo(() => {
    // Clonar la escena para evitar modificar el original
    const cloned = scene.clone();
    
    // Calcular el bounding box del modelo
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Calcular la escala necesaria para que el modelo quepa en el espacio
    // Queremos que ocupe aproximadamente el 80% del espacio disponible, luego aumentamos un 50%
    const maxDimension = Math.max(size.x, size.y, size.z);
    const calculatedScale = (0.8 * 1.5) / maxDimension;
    
    // Aplicar la escala directamente a la escena clonada
    cloned.scale.set(calculatedScale, calculatedScale, calculatedScale);
    
    // Calcular la posición para centrar el modelo
    const calculatedPosition = new THREE.Vector3(
      -center.x * calculatedScale,
      -center.y * calculatedScale,
      -center.z * calculatedScale
    );
    
    cloned.position.copy(calculatedPosition);
    
    // Inclinar el modelo 20 grados hacia adelante (en radianes)
    cloned.rotation.x = -20 * (Math.PI / 180);
    
    return {
      clonedScene: cloned,
      scale: calculatedScale,
      position: calculatedPosition,
    };
  }, [scene]);

  return (
    <>
      <primitive object={clonedScene} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} />
    </>
  );
}

// Precargar el modelo
useGLTF.preload('/tomatoe.glb');

export default function TomateModel() {
  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Tomate />
    </Canvas>
  );
}

