import { useState, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Animated Avatar Component
function AnimatedAvatar({ action }) {
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const bodyRef = useRef();
  const timeRef = useRef(0);
  
  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
    
    if (!leftArmRef.current || !rightArmRef.current || !bodyRef.current) return;
    
    // Reset rotations
    leftArmRef.current.rotation.x = 0;
    leftArmRef.current.rotation.y = 0;
    leftArmRef.current.rotation.z = 0.3;
    
    rightArmRef.current.rotation.x = 0;
    rightArmRef.current.rotation.y = 0;
    rightArmRef.current.rotation.z = -0.3;
    
    // Apply animations based on action
    if (action === 'walk') {
      // Walking animation - arms swing
      leftArmRef.current.rotation.z = 0.3 + Math.sin(timeRef.current * 5) * 0.3;
      rightArmRef.current.rotation.z = -0.3 + Math.sin(timeRef.current * 5 + Math.PI) * 0.3;
      // Body moves forward
      bodyRef.current.position.x = Math.sin(timeRef.current) * 0.5;
    } else if (action === 'wave') {
      // Waving animation - right arm waves
      rightArmRef.current.rotation.z = -0.3 + Math.sin(timeRef.current * 3) * 0.5;
    } else if (action === 'point') {
      // Pointing animation - arm extends
      rightArmRef.current.rotation.z = -0.8;
      rightArmRef.current.rotation.y = 0.3;
    } else if (action === 'safety') {
      // Safety posture - arms up
      leftArmRef.current.rotation.x = -0.5;
      rightArmRef.current.rotation.x = -0.5;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.8, 1.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      <mesh ref={rightArmRef} position={[0.8, 1.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

export default function AiAvatar() {
  const [command, setCommand] = useState('');
  const [action, setAction] = useState('idle');
  const [explanation, setExplanation] = useState('');
  const [processing, setProcessing] = useState(false);

  const executeCommand = () => {
    if (!command.trim()) return;
    
    setProcessing(true);
    
    const text = command.toLowerCase();
    let newAction = 'idle';
    let newExplanation = '';
    
    // AI Command Processing
    if (text.includes('walk')) {
      newAction = 'walk';
      newExplanation = '🤖 AI: Avatar walks to destination. Pathfinding calculated, walking animation activated.';
    } else if (text.includes('wave') || text.includes('hello')) {
      newAction = 'wave';
      newExplanation = '🤖 AI: Avatar waves in greeting. Social intent detected, waving animation triggered.';
    } else if (text.includes('point')) {
      newAction = 'point';
      newExplanation = '🤖 AI: Avatar points at target. Direction determined, pointing animation played.';
    } else if (text.includes('safety')) {
      newAction = 'safety';
      newExplanation = '🤖 AI: Avatar demonstrates safety posture. Training-appropriate animation selected.';
    } else {
      newExplanation = '🤖 AI: Command understood. Avatar in ready position.';
    }
    
    // Simulate AI processing delay
    setTimeout(() => {
      setAction(newAction);
      setExplanation(newExplanation);
      setProcessing(false);
      
      // Log to console
      console.log(`Command: "${command}" → Action: ${newAction}`);
      console.log('AI Pipeline: Text → Intent → Animation → 3D Playback');
    }, 500);
  };

  const runExample = (example, actionType) => {
    setCommand(example);
    setProcessing(true);
    
    setTimeout(() => {
      setAction(actionType);
      if (actionType === 'walk') {
        setExplanation('🤖 AI: Avatar walks to destination. Pathfinding calculated, walking animation activated.');
      } else if (actionType === 'wave') {
        setExplanation('🤖 AI: Avatar waves in greeting. Social intent detected, waving animation triggered.');
      } else if (actionType === 'point') {
        setExplanation('🤖 AI: Avatar points at target. Direction determined, pointing animation played.');
      }
      setProcessing(false);
    }, 300);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1 style={styles.title}>AI Avatar Animation</h1>
        <p style={styles.subtitle}>Natural Language → Avatar Behavior</p>
        
        <div style={styles.inputSection}>
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type: 'walk to door' or 'wave hello'"
            style={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && executeCommand()}
          />
          <button 
            onClick={executeCommand} 
            style={styles.button}
            disabled={processing}
          >
            {processing ? '🔄 AI Processing...' : 'Execute Command'}
          </button>
        </div>
        
        <div style={styles.examples}>
          <p>Quick commands:</p>
          <div style={styles.exampleButtons}>
            <button 
              onClick={() => runExample('walk to table', 'walk')} 
              style={styles.exampleBtn}
              disabled={processing}
            >
              🚶 Walk to table
            </button>
            <button 
              onClick={() => runExample('wave hello', 'wave')} 
              style={styles.exampleBtn}
              disabled={processing}
            >
              👋 Wave hello
            </button>
            <button 
              onClick={() => runExample('point at screen', 'point')} 
              style={styles.exampleBtn}
              disabled={processing}
            >
              👉 Point at screen
            </button>
          </div>
        </div>
        
        {explanation && (
          <div style={styles.explanation}>
            <h3>AI Explanation:</h3>
            <p>{explanation}</p>
            <p style={styles.currentAction}>
              Current Action: <strong>{action.toUpperCase()}</strong>
            </p>
          </div>
        )}
        
        <div style={styles.howItWorks}>
          <h4>AI Pipeline:</h4>
          <div style={styles.pipeline}>
            <div style={styles.step}>1. Command Input</div>
            <div style={styles.step}>2. AI Intent Parsing</div>
            <div style={styles.step}>3. Animation Selection</div>
            <div style={styles.step}>4. 3D Playback</div>
          </div>
        </div>
      </div>
      
      <div style={styles.viewer}>
        <div style={styles.viewerHeader}>
          <h3>Training Environment</h3>
          <p>Drag to rotate • Scroll to zoom • Right-click to pan</p>
        </div>
        
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          {/* Room floor */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[10, 0.1, 10]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* Training objects */}
          <mesh position={[3, 0, 0]}>
            <boxGeometry args={[2, 0.5, 1]} />
            <meshStandardMaterial color="#8b5a2b" />
          </mesh>
          
          <mesh position={[-2, 0.5, 2]}>
            <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          
          {/* Animated Avatar */}
          <AnimatedAvatar action={action} />
          
          <OrbitControls />
        </Canvas>
        
        <div style={styles.viewerFooter}>
          <p>Status: {processing ? 'AI Processing...' : 'Ready'}</p>
          <p>Animation: {action}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: '#0F172A',
    color: '#F8FAFC',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: '400px',
    padding: '30px',
    borderRight: '1px solid #334155',
    overflowY: 'auto'
  },
  title: {
    color: '#8b5cf6',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: '30px'
  },
  inputSection: {
    marginBottom: '30px'
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    background: '#1E293B',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '15px',
    background: '#8b5cf6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  examples: {
    background: '#1E293B',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  exampleButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px'
  },
  exampleBtn: {
    padding: '12px',
    background: '#4c1d95',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'left'
  },
  explanation: {
    background: '#1E293B',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    borderLeft: '4px solid #8b5cf6'
  },
  currentAction: {
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #475569',
    color: '#8b5cf6',
    fontWeight: 'bold'
  },
  howItWorks: {
    background: '#1E293B',
    padding: '20px',
    borderRadius: '10px'
  },
  pipeline: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    fontSize: '12px',
    color: '#94a3b8'
  },
  step: {
    textAlign: 'center',
    flex: 1
  },
  viewer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  viewerHeader: {
    padding: '20px',
    borderBottom: '1px solid #334155',
    textAlign: 'center'
  },
  viewerFooter: {
    padding: '15px',
    borderTop: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#94a3b8'
  }
};