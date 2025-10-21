"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialisation scène
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Fond transparent
    containerRef.current.appendChild(renderer.domElement);

    // Sphère
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xF48B7C, transparent: true, opacity: 0.8 }); // Couleur et transparence
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
      requestAnimationFrame(animate);
      sphere.position.x += (mouseX - sphere.position.x) * 0.1;
      sphere.position.y += (mouseY - sphere.position.y) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    // Nettoyage
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", // en dehors du flux
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0, // derrière le texte
        pointerEvents: "none",
        filter: "blur(50px)",
      }}
    />
  );
}
