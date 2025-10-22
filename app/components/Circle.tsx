"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Empêcher les initialisations multiples
    if (isInitializedRef.current || !containerRef.current) return;
    isInitializedRef.current = true;

    const container = containerRef.current;

    // Nettoyer tout canvas existant dans le container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Initialisation scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Sphère
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xF48B7C, 
      transparent: true, 
      opacity: 0.8 
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    // Suivi souris
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      sphere.position.x += (mouseX - sphere.position.x) * 0.1;
      sphere.position.y += (mouseY - sphere.position.y) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      isInitializedRef.current = false;

      // Arrêter l'animation
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      // Retirer l'event listener
      document.removeEventListener("mousemove", handleMouseMove);

      // Nettoyer le container
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Libérer les ressources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();

      rendererRef.current = null;
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 5,
        pointerEvents: "none",
        filter: "blur(50px)",
      }}
    />
  );
}