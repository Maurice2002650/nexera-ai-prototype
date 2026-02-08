import { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// AI Asset Mapping System
const assetDatabase = {
  'hard hat': {
    model: 'hardhat',
    color: '#FFD700',
    summary: 'Hard hats are Class E electrical hazard rated PPE. They must be ANSI/ISEA Z89.1 certified and replaced after any significant impact.',
    scale: 1.2
  },
  'fire extinguisher': {
    model: 'extinguisher', 
    color: '#DC2626',
    summary: 'ABC dry chemical extinguisher rated for ordinary combustibles, flammable liquids, and electrical fires. Follow PASS protocol.',
    scale: 1.0
  },
  'safety vest': {
    model: 'vest',
    color: '#F59E0B',
    summary: 'High-visibility ANSI Class 2 vest for daytime use. Required within 10 feet of moving vehicles.',
    scale: 1.0
  }
};

// 3D Models
function HardHat() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFD700" metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 32]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function FireExtinguisher() {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
    </group>
  );
}

function SafetyVest() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshStandardMaterial color="#F59E0B" />
    </mesh>
  );
}

export default function AssetGenerator() {
  const [input, setInput] = useState('');
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate AI Processing Pipeline
  const generateAsset = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerInput = input.toLowerCase();
    let matchedAsset = null;
    
    // AI Search Logic
    for (const [key, data] of Object.entries(assetDatabase)) {
      if (lowerInput.includes(key)) {
        matchedAsset = { ...data, name: key };
        break;
      }
    }
    
    if (!matchedAsset) {
      // AI would generate new asset
      matchedAsset = {
        model: 'custom',
        color: '#3B82F6',
        summary: `AI would generate a 3D model for "${input}". In production, this would use Stable Diffusion 3D or retrieve from Sketchfab API.`,
        scale: 1.0,
        name: 'custom'
      };
    }
    
    // Simulate GLB processing pipeline
    console.log('Processing pipeline:');
    console.log('1. Text → OpenAI GPT-4 (object identification)');
    console.log('2. Asset search in vector database');
    console.log('3. GLB retrieval/conversion');
    console.log('4. Auto-scale and center');
    console.log('5. Material application');
    console.log('6. WebGL rendering');
    
    setAsset(matchedAsset);
    setLoading(false);
  };

  const renderModel = () => {
    if (!asset) return null;
    
    switch(asset.model) {
      case 'hardhat': return <HardHat />;
      case 'extinguisher': return <FireExtinguisher />;
      case 'vest': return <SafetyVest />;
      default: return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={asset.color} wireframe />
        </mesh>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h1 style={styles.title}>AI 3D Asset Pipeline</h1>
        <p style={styles.subtitle}>Text → 3D Model for Training</p>
        
        <div style={styles.inputSection}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe training object..."
            style={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && generateAsset()}
          />
          <button 
            onClick={generateAsset} 
            style={styles.button}
            disabled={loading}
          >
            {loading ? '🔄 AI Processing...' : 'Generate 3D Model'}
          </button>
          
          <div style={styles.examples}>
            <p>Try: "hard hat", "fire extinguisher", "safety vest"</p>
          </div>
        </div>
        
        {asset && (
          <div style={styles.result}>
            <h3>🎓 AI Educational Summary</h3>
            <p>{asset.summary}</p>
            
            <div style={styles.pipeline}>
              <h4>AI Pipeline Steps:</h4>
              <ol style={styles.steps}>
                <li>Text analysis with GPT-4</li>
                <li>3D asset retrieval</li>
                <li>GLB processing</li>
                <li>Auto-scale & center</li>
                <li>Material application</li>
              </ol>
            </div>
          </div>
        )}
        
        <div style={styles.techNotes}>
          <h4>Technical Architecture:</h4>
          <p>• Frontend: React + Three.js</p>
          <p>• AI: OpenAI GPT-4 for interpretation</p>
          <p>• 3D: GLB format, auto-scaling</p>
          <p>• Backend: Node.js + Express</p>
        </div>
      </div>
      
      <div style={styles.viewer}>
        <div style={styles.viewerHeader}>
          <h3>Interactive 3D Viewer</h3>
          <p>Rotate: Drag • Zoom: Scroll • Pan: Right-click</p>
        </div>
        
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <gridHelper args={[10, 10]} />
          
          {asset && (
            <group scale={asset.scale}>
              {renderModel()}
            </group>
          )}
          
          <OrbitControls />
        </Canvas>
        
        <div style={styles.viewerInfo}>
          <p>Format: GLB | Scale: {asset?.scale || 'Auto'} | Lighting: Dynamic</p>
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
    color: '#F8FAFC'
  },
  sidebar: {
    width: '400px',
    padding: '30px',
    borderRight: '1px solid #334155'
  },
  title: {
    color: '#60A5FA',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#94A3B8',
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
    color: 'white'
  },
  button: {
    width: '100%',
    padding: '15px',
    background: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  examples: {
    marginTop: '15px',
    color: '#94A3B8',
    fontSize: '14px'
  },
  result: {
    background: '#1E293B',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  pipeline: {
    marginTop: '20px'
  },
  steps: {
    marginLeft: '20px',
    color: '#CBD5E1'
  },
  techNotes: {
    background: '#1E293B',
    padding: '20px',
    borderRadius: '10px',
    fontSize: '14px'
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
  viewerInfo: {
    padding: '15px',
    borderTop: '1px solid #334155',
    textAlign: 'center',
    color: '#94A3B8'
  }
};