import 'vtk.js/Sources/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import 'vtk.js/Sources/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkCamera from 'vtk.js/Sources/Rendering/Core/Camera';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkPlane from 'vtk.js/Sources/Common/DataModel/Plane';
import vtkClipClosedSurface from 'vtk.js/Sources/Filters/General/ClipClosedSurface';
// import vtkSphereSource from 'vtk.js/Sources/Filters/Sources/SphereSource';
// import vtkSTLReader from 'vtk.js/Sources/IO/Geometry/STLReader';
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const NAMED_COLORS = {
  BANANA: [227 / 255, 207 / 255, 87 / 255],
  TOMATO: [255 / 255, 99 / 255, 71 / 255],
  SANDY_BROWN: [244 / 255, 164 / 255, 96 / 255],
};

const actor = vtkActor.newInstance();
renderer.addActor(actor);

const mapper = vtkMapper.newInstance({ interpolateScalarBeforeMapping: true });
actor.setMapper(mapper);

const cam = vtkCamera.newInstance();
renderer.setActiveCamera(cam);
cam.setFocalPoint(0, 0, 0);
cam.setPosition(0, 0, 10);
cam.setClippingRange(0.1, 50.0);

// Build pipeline
// const source = vtkSphereSource.newInstance({
//   thetaResolution: 20,
//   phiResolution: 11,
// });

// const bounds = source.getOutputData().getBounds();
// const center = [
//   (bounds[1] + bounds[0]) / 2,
//   (bounds[3] + bounds[2]) / 2,
//   (bounds[5] + bounds[4]) / 2,
// ];
// const planes = [];
// const plane1 = vtkPlane.newInstance({
//   origin: center,
//   normal: [1.0, 0.0, 0.0],
// });
// planes.push(plane1);
// const plane2 = vtkPlane.newInstance({
//   origin: center,
//   normal: [0.0, 1.0, 0.0],
// });
// planes.push(plane2);
// const plane3 = vtkPlane.newInstance({
//   origin: center,
//   normal: [0.0, 0.0, 1.0],
// });
// planes.push(plane3);
const planes = [];
const plane1 = vtkPlane.newInstance({
  origin: [70.17235662874292, 11.82385193639344, -363.6235551457101],
  normal: [0.07643856104746827, -0.005788522725215297, 0.997057490513788],
});
planes.push(plane1);
// const plane2 = vtkPlane.newInstance({
//   origin: [69.91117370004254, -9.658953141545462, -353.92941931722913],
//   normal: [0.07692580284009085, 0.8838848485683667, 0.46133501420191697],
// });
// planes.push(plane2);
// const plane3 = vtkPlane.newInstance({
//   origin: [69.91117370004254, -9.658953141545462, -353.92941931722913],
//   normal: [0.012514208525830644, 0.9179061151095466, -0.39660025016314826],
// });
// planes.push(plane3);
// const plane4 = vtkPlane.newInstance({
//   origin: [71.19630880054876, 25.028792194165522, -358.3598991217545],
//   normal: [0.05765567434663872, -0.3213691230602294, 0.9451971804650781],
// });
// planes.push(plane4);
// const plane5 = vtkPlane.newInstance({
//   origin: [71.19630880054876, 25.028792194165522, -358.3598991217545],
//   normal: [-0.0078469453868405, -0.8960256144165654, 0.4439330171968656],
// });
// planes.push(plane5);
// const reader = vtkSTLReader.newInstance();
const reader = vtkXMLPolyDataReader.newInstance();
reader.setUrl(`${__BASE_PATH__}/data/bone.vtp`, { binary: true }).then(() => {
  renderer.resetCamera();
  renderWindow.render();
  global.sourceData = reader.getOutputData();
});

const filter = vtkClipClosedSurface.newInstance({
  clippingPlanes: planes,
  activePlaneId: 2,
  clipColor: NAMED_COLORS.BANANA,
  baseColor: NAMED_COLORS.TOMATO,
  activePlaneColor: NAMED_COLORS.SANDY_BROWN,
  passPointData: false,
});
filter.setInputConnection(reader.getOutputPort());
filter.setScalarModeToColors();

mapper.setInputConnection(filter.getOutputPort());

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.source = reader;
global.filter = filter;
global.mapper = mapper;
global.actor = actor;
