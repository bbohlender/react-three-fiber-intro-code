import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { useState, useRef } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import { createXRStore, XR } from "@react-three/xr";
import { Mesh } from "three";

const store = createXRStore({ emulate: { inject: true } });

export default function App() {
  return (
    <>
      <button
        style={{ position: "absolute", zIndex: "1" }}
        onClick={() => store.enterVR()}
      >
        Enter VR
      </button>
      <Canvas style={{ position: "absolute", inset: "0", touchAction: "none" }}>
        <XR store={store}></XR>
      </Canvas>
    </>
  );
}

export function Scene() {
  return (
    <>
      <pointLight color="red" position={[-1, 0, 0]} />
      <pointLight color="green" position={[1, 0, 0]} />
      <pointLight color="blue" position={[0, 0, 1]} />
      <MyComponent />
      <MyModel />
    </>
  );
}

function MyModel({ position }: { position?: Vector3 }) {
  const { scene } = useGLTF("https://www.immersive-react.com/shoe.glb");
  return <primitive position={position} object={scene} />;
}

function MyComponent({ position }: { position?: Vector3 }) {
  const [red, setRed] = useState(true);
  const ref = useRef<Mesh>(null);
  useFrame(() => ref.current?.rotateY(0.01));
  return (
    <mesh position={position} ref={ref} onClick={() => setRed(!red)}>
      <boxGeometry />
      <meshStandardMaterial color={red ? 0xffffff : 0x999999} />
    </mesh>
  );
}
