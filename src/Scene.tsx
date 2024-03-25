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
    const materialMain = new THREE.MeshPhysicalMaterial({
        transparent: true,
        color: new THREE.Color(0x00ff00),
    })
    const mainCube = new THREE.Mesh(geometryMain, materialMain)
    group.add(mainCube)
    // create cubes around the main cube
    const geometry = new THREE.BoxGeometry(CUBE_SIZE,CUBE_SIZE,CUBE_SIZE)
    const material = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        opacity: 1,
        metalness: 0.2,
        roughness: 0,
        ior: 1.5,
        thickness: 0.01,
        specularIntensity: 1,
        color: new THREE.Color(0x00ff00),
        specularColor: new THREE.Color(0xffffff),
        envMapIntensity: 1,
    })

    // posiziona i cubi lungo i bordi del cubo principale

    const latoDestro:THREE.Mesh[]       = []
    const latoSinistro:THREE.Mesh[]     = []
    const latoSuperiore:THREE.Mesh[]    = []
    const latoInferiore:THREE.Mesh[]    = []
    const latoFrontale:THREE.Mesh[]     = []
    const latoPosteriore:THREE.Mesh[]   = []

    for(let i = 0; i <= MAIN_CUBE; i++) {
        for(let j = 0; j <= MAIN_CUBE; j++) {
            // lato destro
            const cubeDestro = new THREE.Mesh(geometry, material)
            cubeDestro.position.x = MAIN_CUBE_HALF + Math.random() * 3
            cubeDestro.position.y = i - MAIN_CUBE_HALF
            cubeDestro.position.z = j - MAIN_CUBE_HALF
            latoDestro.push(cubeDestro)
            group.add(cubeDestro)

            // lato sinistro
            const cubeSinistro = new THREE.Mesh(geometry, material)
            cubeSinistro.position.x = -MAIN_CUBE_HALF - Math.random() * 3
            cubeSinistro.position.y = i - MAIN_CUBE_HALF
            cubeSinistro.position.z = j - MAIN_CUBE_HALF
            latoSinistro.push(cubeSinistro)
            group.add(cubeSinistro)

            // lato superiore
            const cubeSuperiore = new THREE.Mesh(geometry, material)
            cubeSuperiore.position.x = i - MAIN_CUBE_HALF
            cubeSuperiore.position.y = MAIN_CUBE_HALF + Math.random() * 3
            cubeSuperiore.position.z = j - MAIN_CUBE_HALF
            latoSuperiore.push(cubeSuperiore)
            group.add(cubeSuperiore)

            // lato inferiore
            const cubeInferiore = new THREE.Mesh(geometry, material)
            cubeInferiore.position.x = i - MAIN_CUBE_HALF
            cubeInferiore.position.y = -MAIN_CUBE_HALF - Math.random() * 3
            cubeInferiore.position.z = j - MAIN_CUBE_HALF
            latoInferiore.push(cubeInferiore)
            group.add(cubeInferiore)

            // lato frontale
            const cubeFrontale = new THREE.Mesh(geometry, material)
            cubeFrontale.position.x = i - MAIN_CUBE_HALF
            cubeFrontale.position.y = j - MAIN_CUBE_HALF
            cubeFrontale.position.z = MAIN_CUBE_HALF + Math.random() * 3
            latoFrontale.push(cubeFrontale)
            group.add(cubeFrontale)

            // lato posteriore
            const cubePosteriore = new THREE.Mesh(geometry, material)
            cubePosteriore.position.x = i - MAIN_CUBE_HALF
            cubePosteriore.position.y = j - MAIN_CUBE_HALF
            cubePosteriore.position.z = -MAIN_CUBE_HALF - Math.random() * 3
            latoPosteriore.push(cubePosteriore)
            group.add(cubePosteriore)
        }
    }

    const initialPositionLatoDestro = latoDestro.map((cube) => cube.position.clone())
    const initialPositionLatoSinistro = latoSinistro.map((cube) => cube.position.clone())
    const initialPositionLatoSuperiore = latoSuperiore.map((cube) => cube.position.clone())
    const initialPositionLatoInferiore = latoInferiore.map((cube) => cube.position.clone())
    const initialPositionLatoFrontale = latoFrontale.map((cube) => cube.position.clone())
    const initialPositionLatoPosteriore = latoPosteriore.map((cube) => cube.position.clone())
    
    setTimeout(() => {
        latoDestro.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoDestro[i], 0.1)
        })
        latoSinistro.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoSinistro[i], 0.1)
        })
        latoSuperiore.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoSuperiore[i], 0.1)
        })
        latoInferiore.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoInferiore[i], 0.1)
        })
        latoFrontale.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoFrontale[i], 0.1)
        })
        latoPosteriore.forEach((cube, i) => {
            cube.position.lerp(initialPositionLatoPosteriore[i], 0.1)
        })
    })

    const light = new THREE.PointLight(0xff0000, 1_000_000, 0, 0.01)
    light.position.set(0, 0, 0).normalize()
    group.add(light)

    scene.add(group)

    // const _animatePosition = (cube: THREE.Mesh, prop: 'x' | 'y' | 'z', negative: boolean = false) => {
    //     const targetPosition = cube.position.clone();
    //     if (negative) {
    //         targetPosition[prop] = -MAIN_CUBE_HALF * 3 - 1.5
    //     } else {
    //         targetPosition[prop] = MAIN_CUBE_HALF * 3 - 1.5
    //     }
    //     cube.position.lerp(targetPosition, 0.1)
    // }
    
    const animateCubes = () => {

        // latoDestro.forEach((cube) => {
        //     _animatePosition(cube, 'x')
        // })
        // latoSinistro.forEach((cube) => {
        //     _animatePosition(cube, 'x', true)
        // })
        // latoSuperiore.forEach((cube) => {
        //     _animatePosition(cube, 'y')
        // })
        // latoInferiore.forEach((cube) => {
        //     _animatePosition(cube, 'y', true)
        // })
        // latoFrontale.forEach((cube) => {
        //     _animatePosition(cube, 'z')
        // })
        // latoPosteriore.forEach((cube) => {
        //     _animatePosition(cube, 'z', true)
        // })


        // setTimeout(() => {
        //     latoDestro.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoDestro[i], 0.1)
        //     })
        //     latoSinistro.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoSinistro[i], 0.1)
        //     })
        //     latoSuperiore.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoSuperiore[i], 0.1)
        //     })
        //     latoInferiore.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoInferiore[i], 0.1)
        //     })
        //     latoFrontale.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoFrontale[i], 0.1)
        //     })
        //     latoPosteriore.forEach((cube, i) => {
        //         cube.position.lerp(initialPositionLatoPosteriore[i], 0.1)
        //     })
        // }, 2000)
        
    }

    return {mainCube, group, animateCubes}
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
        
        camera.position.z = 4
        camera.position.x = 0

        const renderer = new THREE.WebGLRenderer({canvas: ref.current as HTMLCanvasElement})
        renderer.setSize(WIDTH, HEIGHT)

        new OrbitControls(camera, renderer.domElement)

        const {group, animateCubes} = 
            composeScene(scene)
    
        window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
            console.log('onWindowResize')
            
            camera.aspect = window.innerWidth / window.innerHeight 
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth - scrollbarWidth, window.innerHeight - scrollbarWidth)
            render()
        }
        function animate() {
            requestAnimationFrame(animate)
        
            group.rotation.x += 0.005
            group.rotation.y += 0.005

            render()
            // animateCubes()
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
