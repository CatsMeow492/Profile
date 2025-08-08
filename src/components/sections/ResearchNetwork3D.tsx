'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, GradientTexture, QuadraticBezierLine, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { research } from '@/content';
import type { Research } from '@/types/content';
import { Badge } from '@/components/ui';

// Node component (kept simple, uses same visuals as before)
const ResearchNetworkNode = ({ 
  paper, 
  position, 
  isSelected, 
  onSelect,
  connectionLines = [],
  connectionStrength = 0
}: {
  paper: Research;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
  connectionLines?: Array<[number, number, number]>;
  connectionStrength?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state: any) => {
    if (meshRef.current) {
      const rotationSpeed = 0.005 + (connectionStrength * 0.003);
      meshRef.current.rotation.y += rotationSpeed;
      if (isSelected) {
        meshRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1.3);
      } else if (hovered) {
        meshRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 4) * 0.05 + 1.1);
      } else {
        const breathingIntensity = 0.02 + (connectionStrength * 0.01);
        meshRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 1.5) * breathingIntensity + 1.0);
      }
    }
  });

  const getNodeColor = (status: Research['status']) => {
    switch (status) {
      case 'published': return '#10b981';
      case 'preprint': return '#f59e0b';
      case 'in-review': return '#3b82f6';
      case 'draft': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getNodeSize = () => {
    const baseSize = 0.4;
    const connectionBonus = Math.min(connectionStrength * 0.1, 0.3);
    const yearBonus = (paper.year >= 2023) ? 0.1 : 0;
    const statusBonus = paper.status === 'published' ? 0.1 : 0;
    let finalSize = baseSize + connectionBonus + yearBonus + statusBonus;
    if (isSelected) finalSize *= 1.6;
    else if (hovered) finalSize *= 1.3;
    return finalSize;
  };

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[getNodeSize(), 32, 32]}
          onClick={onSelect}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={getNodeColor(paper.status)} 
            emissive={isSelected ? getNodeColor(paper.status) : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : 0}
            transparent
            opacity={hovered ? 0.9 : 0.75}
          >
            <GradientTexture
              stops={[0, 0.6, 1]}
              colors={["#1f2937", getNodeColor(paper.status), "#ffffff"]}
              size={64}
            />
          </meshStandardMaterial>
        </Sphere>

        {(isSelected || hovered) && (
          <mesh scale={[getNodeSize() * 1.5, getNodeSize() * 1.5, getNodeSize() * 1.5]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color={getNodeColor(paper.status)}
              transparent
              opacity={isSelected ? 0.25 : 0.15}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {connectionLines.map((endPos, index) => (
          <Line
            key={index}
            points={[[0, 0, 0], endPos]}
            color="#ffffff"
            lineWidth={isSelected ? 3 : 1}
            transparent
            opacity={0.25}
          />
        ))}

        {(hovered || isSelected) && (
          <Html distanceFactor={10}>
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs pointer-events-none">
              <h4 className="font-medium text-sm text-foreground mb-1">{paper.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{paper.venue} ({paper.year})</p>
              <div className="flex flex-wrap gap-1">
                {paper.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} variant="outline" size="sm" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

// Animated curved connection
const AnimatedBezier = ({
  start,
  mid,
  end,
  color,
  width,
  dashed
}: {
  start: [number, number, number];
  mid: [number, number, number];
  end: [number, number, number];
  color: string;
  width: number;
  dashed?: boolean;
}) => {
  const lineRef = useRef<any>(null);
  useFrame((state) => {
    if (dashed && lineRef.current && lineRef.current.material) {
      const mat = lineRef.current.material;
      mat.dashOffset = (mat.dashOffset || 0) - state.clock.getDelta() * 0.5;
    }
  });
  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={start}
      end={end}
      mid={mid}
      color={color}
      lineWidth={width}
      dashed={!!dashed}
      dashScale={1}
      dashSize={0.2}
      gapSize={0.2}
      transparent
      opacity={0.9}
    />
  );
};

export const ResearchNetwork3D = ({ 
  selectedPaper, 
  onPaperSelect 
}: { 
  selectedPaper: string | null; 
  onPaperSelect: (id: string) => void; 
}) => {
  const { positions, connections } = useMemo(() => {
    const categories = Array.from(new Set(research.map(p => p.category)));
    const categoryGroups = categories.reduce((acc, category) => {
      acc[category] = research.filter(p => p.category === category);
      return acc;
    }, {} as Record<string, typeof research>);

    const positions: Array<[number, number, number]> = [];
    const connections: Array<{ from: number; to: number; strength: number; type: string }> = [];

    categories.forEach((category, categoryIndex) => {
      const categoryAngle = (categoryIndex / categories.length) * Math.PI * 2;
      const categoryRadius = 8;
      const categoryCenter = [
        Math.cos(categoryAngle) * categoryRadius,
        0,
        Math.sin(categoryAngle) * categoryRadius
      ];
      const papersInCategory = categoryGroups[category];
      papersInCategory.forEach((paper, paperIndex) => {
        const paperCount = papersInCategory.length;
        const yearOffset = (paper.year - 2020) * 1.5;
        const localAngle = paperCount > 1 ? (paperIndex / paperCount) * Math.PI * 2 : 0;
        const localRadius = Math.min(2.5, paperCount * 0.4);
        const localX = Math.cos(localAngle) * localRadius;
        const localZ = Math.sin(localAngle) * localRadius;
        const jitter = 0.3;
        const position: [number, number, number] = [
          categoryCenter[0] + localX + (Math.random() - 0.5) * jitter,
          yearOffset + (Math.random() - 0.5) * jitter,
          categoryCenter[2] + localZ + (Math.random() - 0.5) * jitter
        ];
        positions.push(position);
      });
    });

    research.forEach((paper, paperIndex) => {
      research.forEach((otherPaper, otherIndex) => {
        if (paperIndex >= otherIndex) return;
        const relationships = { author: 0, semantic: 0, evolution: 0, category: 0, temporal: 0 };
        const yearDiff = Math.abs(paper.year - otherPaper.year);
        const sharedKeywords = paper.keywords.filter(keyword => otherPaper.keywords.includes(keyword)).length;
        if (yearDiff === 1 && sharedKeywords > 1) relationships.evolution = 5;
        if (sharedKeywords > 0) relationships.semantic = sharedKeywords * 2.5;
        if (paper.category === otherPaper.category) relationships.category = 2;
        if (yearDiff <= 1) relationships.temporal = 1.5;
        const sharedAuthors = paper.authors.filter(author => otherPaper.authors.includes(author)).length;
        if (sharedAuthors > 0) relationships.author = sharedAuthors * 1;
        const maxRelationship = Math.max(...Object.values(relationships));
        const strongestType = Object.entries(relationships).find(([_, s]) => s === maxRelationship)?.[0] || '';
        const totalStrength = Object.values(relationships).reduce((sum, val) => sum + val, 0);
        if (totalStrength > 1.0 && strongestType) {
          connections.push({ from: paperIndex, to: otherIndex, strength: Math.min(totalStrength, 6), type: strongestType });
        }
      });
    });

    return { positions, connections };
  }, []);

  const getConnectionColor = (type: string, strength: number) => {
    const opacity = Math.min(strength / 6, 0.8);
    switch (type) {
      case 'author': return `rgba(34, 197, 94, ${opacity})`;
      case 'semantic': return `rgba(59, 130, 246, ${opacity})`;
      case 'evolution': return `rgba(168, 85, 247, ${opacity})`;
      case 'category': return `rgba(245, 158, 11, ${opacity})`;
      case 'temporal': return `rgba(156, 163, 175, ${opacity})`;
      default: return `rgba(255, 255, 255, ${opacity})`;
    }
  };

  const controlsRef = useRef<any>(null);
  const CameraRig = () => {
    const { camera } = useThree();
    useFrame(() => {
      const defaultPosition = new THREE.Vector3(0, 0, 15);
      let targetPosition = defaultPosition.clone();
      let orbitTarget = new THREE.Vector3(0, 0, 0);
      if (selectedPaper) {
        const selIndex = research.findIndex(r => r.id === selectedPaper);
        const pos = positions[selIndex];
        if (pos) {
          const focus = new THREE.Vector3(pos[0], pos[1], pos[2]);
          orbitTarget.lerp(focus, 0.1);
          targetPosition = new THREE.Vector3(pos[0], pos[1] + 1.2, pos[2] + 6);
        }
      }
      camera.position.lerp(targetPosition, 0.05);
      if (controlsRef.current) {
        const currentTarget = controlsRef.current.target as THREE.Vector3;
        currentTarget.lerp(orbitTarget, 0.05);
        controlsRef.current.update();
      }
    });
    return null;
  };

  const StarField = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const starPositions = useMemo(() => {
      const count = 1200;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 80 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      return positions;
    }, []);
    useFrame((state) => {
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.0006;
        pointsRef.current.rotation.x += 0.0002;
      }
    });
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.4} sizeAttenuation color="#cbd5e1" depthWrite={false} transparent opacity={0.9} />
      </points>
    );
  };

  return (
    <>
      <color attach="background" args={["#0b1220"]} />
      <fog attach="fog" args={["#0b1220", 25, 70]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[15, 15, 15]} intensity={0.8} />
      <pointLight position={[-15, 10, -15]} intensity={0.4} />
      <spotLight position={[0, 25, 0]} intensity={0.6} />
      <StarField />
      <CameraRig />
      {connections.map((connection, index) => {
        const fromPos = positions[connection.from];
        const toPos = positions[connection.to];
        if (!fromPos || !toPos) return null;
        const isHighlighted = !!selectedPaper && (
          research[connection.from]?.id === selectedPaper ||
          research[connection.to]?.id === selectedPaper
        );
        const mid = [
          (fromPos[0] + toPos[0]) / 2,
          (fromPos[1] + toPos[1]) / 2 + Math.min(3, 0.3 * connection.strength),
          (fromPos[2] + toPos[2]) / 2
        ] as [number, number, number];
        return (
          <AnimatedBezier
            key={`connection-${index}`}
            start={fromPos}
            mid={mid}
            end={toPos}
            color={getConnectionColor(connection.type, connection.strength)}
            width={isHighlighted ? Math.max(1.2, connection.strength * 0.18) : Math.max(0.6, connection.strength * 0.12)}
            dashed={isHighlighted}
          />
        );
      })}
      {research.map((paper, index) => {
        const paperConnectionData = connections.filter(conn => conn.from === index || conn.to === index);
        const paperConnections = paperConnectionData
          .map(conn => {
            const otherIndex = conn.from === index ? conn.to : conn.from;
            const otherPos = positions[otherIndex];
            const currentPos = positions[index];
            return [
              otherPos[0] - currentPos[0],
              otherPos[1] - currentPos[1],
              otherPos[2] - currentPos[2]
            ] as [number, number, number];
          })
          .slice(0, 5);
        const totalConnectionStrength = paperConnectionData.reduce((sum, conn) => sum + conn.strength, 0) / Math.max(paperConnectionData.length, 1);
        return (
          <ResearchNetworkNode
            key={paper.id}
            paper={paper}
            position={positions[index]}
            isSelected={selectedPaper === paper.id}
            onSelect={() => onPaperSelect(paper.id)}
            connectionLines={paperConnections}
            connectionStrength={totalConnectionStrength}
          />
        );
      })}
      {Array.from(new Set(research.map(p => p.category))).map((category, index) => {
        const categoryAngle = (index / Array.from(new Set(research.map(p => p.category))).length) * Math.PI * 2;
        const categoryRadius = 12;
        const labelPosition: [number, number, number] = [
          Math.cos(categoryAngle) * categoryRadius,
          -3,
          Math.sin(categoryAngle) * categoryRadius
        ];
        return (
          <Text
            key={`label-${category}`}
            position={labelPosition}
            fontSize={0.8}
            color="#888888"
            anchorX="center"
            anchorY="middle"
          >
            {category.replace('-', ' ').toUpperCase()}
          </Text>
        );
      })}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        autoRotate={!selectedPaper}
        autoRotateSpeed={0.3}
        maxDistance={30}
        minDistance={5}
      />
    </>
  );
};

export default ResearchNetwork3D;


