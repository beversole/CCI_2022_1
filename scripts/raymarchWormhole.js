// Author: Nathan Schager

const COHORT_SIZE = 22;
const CAMERA_INCR = 0.1;
const IMAGE_SIZE = 2048;

// Helpers
let imageDivider;
let cameraControls;
let screenShaderHelper;
let uvAdjustment;
let synthPlayer = new SynthPlayer();

// Assets
let cohortTexture;

// Have to divide the image in two since webgl does not accept textures larger than 4048
class ImageDivider {
    constructor() {
        this._buffers = [];
    }

    // Cut the image into n parts and save them to buffers
    divide(wholeImage, numParts) {
        if (wholeImage == null) throw 'Image == null!';
        this._numBuffers = numParts;
        const sWidth = wholeImage.width;
        const sHeight = wholeImage.height / numParts; // change later if horizontal cuts are necessary
        const dWidth = IMAGE_SIZE;
        const dHeight = IMAGE_SIZE;
        for (let i = 0; i < numParts; i++) {
            const verticalOffset = sHeight * i;
            let buffer = this._buffers[i] = createGraphics(dWidth, dHeight);
            let ctx = buffer.canvas.getContext('2d'); // context
            ctx.drawImage(
                wholeImage.canvas,
                0,
                verticalOffset,
                sWidth,
                sHeight,
                0,
                0,
                dWidth,
                dHeight
            );
        }
    }

    // Get one of the new images
    getImage(index) {
        if (this._buffers == null) return;
        if (index < 0 || index >= this._numBuffers) throw 'Index out of range';
        return this._buffers[index];
    }
}

// Wrapper class for making an screen space shader
class ScreenShaderHelper {
    constructor(vert, frag) {
        this._shader = loadShader(vert, frag);
    }

    // Helper function for setting a uniform
    setUniform(name, value) {
        if (this._shader == null) throw 'Shader is null';
        this._shader.setUniform(name, value);
    }

    // Set uniforms, then draw the shader onto a rect
    draw() {
        shader(this._shader);
        rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
    }
}

// Class to help with registering keypresses
class CameraControlHelper {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
    }

    // Check keys for x/y/z offsets
    update() {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this._x -= CAMERA_INCR;
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this._x += CAMERA_INCR;
        }
        if (keyIsDown(81)) {
            this._y -= CAMERA_INCR;
        }
        if (keyIsDown(69)) {
            this._y += CAMERA_INCR;
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this._z += CAMERA_INCR;
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this._z -= CAMERA_INCR;
        }
    }

    get position() {
        return [this._x, this._y, this._z];
    }
}

// For dat.GUI params
class UVAdjustment {
    constructor() {
        this.scaleX = 1;
        this.scaleY = 1;
    }
}

function initDatGui() {
    uvAdjustment = new UVAdjustment();
    let datGui = new dat.GUI();
    datGui.add(uvAdjustment, 'scaleX', 0, 10);
    datGui.add(uvAdjustment, 'scaleY', 0, 10);
    dat.GUI.toggleHide();
}

function preload() {
    imageDivider = new ImageDivider();
    raymarchHelper = new ScreenShaderHelper('../shaders/raymarch.vert', '../shaders/raymarch.frag');
    cameraControls = new CameraControlHelper();
    cohortTexture = loadImage('../fullCohort.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textureWrap(REPEAT);
    imageDivider.divide(cohortTexture, 2); // cut this texture in half since webgl can't use it otherwise
    initDatGui();
}

// update camera controls, set uniforms, and draw shader
function draw() {
    cameraControls.update();
    raymarchHelper.setUniform('u_CohortSize', COHORT_SIZE);
    raymarchHelper.setUniform('u_Resolution', [windowWidth, windowHeight]);
    raymarchHelper.setUniform('u_UVScale', [uvAdjustment.scaleX, uvAdjustment.scaleY]);
    raymarchHelper.setUniform('u_CameraPosition', cameraControls.position);
    raymarchHelper.setUniform('u_CohortImage0', imageDivider.getImage(0));
    raymarchHelper.setUniform('u_CohortImage1', imageDivider.getImage(1));
    raymarchHelper.setUniform('u_Mouse', [mouseX / windowWidth, mouseY / windowHeight]);
    raymarchHelper.setUniform('u_Time', frameCount * 0.01);
    raymarchHelper.setUniform('u_FadeOffset', 0.45);
    raymarchHelper.draw();
    synthPlayer.update(deltaTime, cameraControls.position);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    raymarchHelper.setUniform('u_Resolution', [windowWidth, windowHeight]);
}

function keyPressed() {
    if (keyCode === 67) {
        dat.GUI.toggleHide();
    }
}