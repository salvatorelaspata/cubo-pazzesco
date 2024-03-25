import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const MAIN_CUBE = 10
const MAIN_CUBE_HALF = MAIN_CUBE / 2
const CUBE_SIZE = 1

const composeScene = (scene: THREE.Scene) => {
    const group = new THREE.Group()
    // create main cube
    const geometryMain = new THREE.BoxGeometry(MAIN_CUBE,MAIN_CUBE,MAIN_CUBE)
    const materialMain = new THREE.MeshBasicMaterial({color: 0xff0000, 
        blendColor: 0x00ff00, transparent: true, opacity: 0.5})
    const mainCube = new THREE.Mesh(geometryMain, materialMain)
    group.add(mainCube)
    // create cubes around the main cube
    const geometry = new THREE.BoxGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE)
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, 
        blendColor: 0x00ff00, transparent: true, opacity: 0.5})
    // posiziona i cubi lungo i bordi del cubo principale
    // lato destro
    let latoDestro:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = MAIN_CUBE_HALF + Math.random() * 3
            cube.position.y = i - MAIN_CUBE_HALF
            cube.position.z = j - MAIN_CUBE_HALF
            latoDestro.push(cube)
            group.add(cube)
        }
    }
    // lato sinistro
    let latoSinistro:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = -MAIN_CUBE_HALF - Math.random() * 3
            cube.position.y = i - MAIN_CUBE_HALF
            cube.position.z = j - MAIN_CUBE_HALF
            latoSinistro.push(cube)
            group.add(cube)
        }
    }
    // lato superiore
    const latoSuperiore:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = i - MAIN_CUBE_HALF
            cube.position.y = MAIN_CUBE_HALF + Math.random() * 3
            cube.position.z = j - MAIN_CUBE_HALF
            latoSuperiore.push(cube)
            group.add(cube)
        }
    }
    // lato inferiore
    const latoInferiore:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = i - MAIN_CUBE_HALF
            cube.position.y = -MAIN_CUBE_HALF - Math.random() * 3
            cube.position.z = j - MAIN_CUBE_HALF
            latoInferiore.push(cube)
            group.add(cube)
        }
    }
    // lato frontale
    const latoFrontale:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = i - MAIN_CUBE_HALF
            cube.position.y = j - MAIN_CUBE_HALF
            cube.position.z = MAIN_CUBE_HALF + Math.random() * 3
            latoFrontale.push(cube)
            group.add(cube)
        }
    }
    // lato posteriore
    const latoPosteriore:THREE.Mesh[] = []
    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = i - MAIN_CUBE_HALF
            cube.position.y = j - MAIN_CUBE_HALF
            cube.position.z = -MAIN_CUBE_HALF - Math.random() * 3
            latoPosteriore.push(cube)
            group.add(cube)
        }
    }

    scene.add(group)

    const _animatePosition = (cube: THREE.Mesh, prop: 'x' | 'y' | 'z', negative: boolean = false) => {
        // setTimeout(() => {
        const targetPosition = cube.position.clone();
        if (negative) {
            targetPosition[prop] = -MAIN_CUBE_HALF * 3 - 1.5
        } else {
            targetPosition[prop] = MAIN_CUBE_HALF * 3 - 1.5
        }
        cube.position.lerp(targetPosition, 0.1)
        // }, Math.random() * 1000)
    }
    
    const animateCubes = () => {
        latoDestro.forEach((cube) => {
            _animatePosition(cube, 'x')
        })
        latoSinistro.forEach((cube) => {
            _animatePosition(cube, 'x', true)
        })
        latoSuperiore.forEach((cube) => {
            _animatePosition(cube, 'y')
        })
        latoInferiore.forEach((cube) => {
            _animatePosition(cube, 'y', true)
        })
        latoFrontale.forEach((cube) => {
            _animatePosition(cube, 'z')
        })
        latoPosteriore.forEach((cube) => {
            _animatePosition(cube, 'z', true)
        })
    }

    return {group, animateCubes}
}

export const getScrollbarWidth = () => {
    const didCompute = useRef(false);
    const widthRef = useRef(0);
  
    if (didCompute.current) return widthRef.current;
  
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.overflow = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
  
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
    // Removing temporary elements from the DOM
    outer.parentNode && outer.parentNode.removeChild(outer);
  
    didCompute.current = true;
    widthRef.current = scrollbarWidth;
  
    return scrollbarWidth;
};

export const Scene = () => {
    const scrollbarWidth = getScrollbarWidth()

    const WIDTH = window.innerWidth - scrollbarWidth // || window.innerWidth
    const HEIGHT = window.innerHeight - scrollbarWidth // || window.innerHeight

    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        console.log('Scene - useEffect')
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            WIDTH / HEIGHT,
            0.1,
            1000
        )
        
        camera.position.z = 30

        const renderer = new THREE.WebGLRenderer({canvas: ref.current as HTMLCanvasElement})
        renderer.setSize(WIDTH, HEIGHT)

        new OrbitControls(camera, renderer.domElement)

        const {group} = 
            composeScene(scene)
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(1, 1, 1).normalize()
        scene.add(light)
        
        window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
            console.log('onWindowResize')
            
            camera.aspect = window.innerWidth / window.innerHeight 
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth - scrollbarWidth, window.innerHeight - scrollbarWidth)
            render()
        }
        let i = 0
        function animate() {
            requestAnimationFrame(animate)
        
            group.rotation.x += 0.01
            group.rotation.y += 0.01
            // smooth x position of the lato destro cubes
            // animateCubes()
            render()
            i++
            // console.log(i)
        }

        function render() {
            renderer.render(scene, camera)
        }
        
        animate()
    }, [])

    return(
        <>
            <canvas ref={ref}/>
        </>
    )
}
