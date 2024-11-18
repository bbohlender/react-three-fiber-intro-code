import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import { createXRStore, XR } from "@react-three/xr";

const store = createXRStore({ emulate: { inject: true } });

export default function App() {
return (<>
  <button style={{ position: "absolute", zIndex: "1" }} onClick={() => store.enterVR()}>
      Enter VR
  </button>
  <Canvas style={{ position: "absolute", inset: "0", touchAction: "none" }}>
    <XR store={store}>
      <Environment preset="warehouse" />
      <MyComponent />
      <MyModel />
    </XR>
  </Canvas>
  </>
)
}

function MyModel() {
  const { scene } = useGLTF("https://www.immersive-react.com/shoe.glb")
  return <primitive object={scene} />
}

function MyComponent() {
  const [red, setRed] = useState(true)
  const ref = useRef<Mesh>(null)
  useFrame(() => ref.current?.rotateY(0.01)) 
  return <mesh ref={ref} onClick={() => setRed(!red)} position={[ 0, 0, 0 ]}>
      <boxGeometry/>
      <meshBasicMaterial color={red ? "red" : "blue"} />
  </mesh>
}

